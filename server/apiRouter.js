import { handleAssistantChat } from './geminiService.js';
import { saveLead, getLeads, updateLeadStatus } from './leadStore.js';
import { calculateSolarEstimate, companyProfile } from './knowledgeBase.js';

// Simple in-memory rate limiter (per IP, resets every 60s)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_MINUTE = 35;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { startTime: now, count: 1 });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  record.count += 1;
  return true;
}

// Cleanup rate limiter map every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of rateLimitMap.entries()) {
    if (now - rec.startTime > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Parse JSON body helper for Connect / Vite middlewares
 */
async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1024 * 64) {
        // 64KB limit
        reject(new Error('Request payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Universal request handler matching /api/assistant/* routes
 */
export async function handleAssistantApiRequest(req, res) {
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Rate limit check
  if (!checkRateLimit(clientIp)) {
    return sendJson(res, 429, {
      success: false,
      error: 'Too many requests. Please wait a moment before sending another message.',
    });
  }

  // 1. Health check
  if (pathname === '/api/assistant/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'healthy',
      assistant: 'Ahmed Assistant',
      company: companyProfile.name,
      owner: companyProfile.owner,
      timestamp: new Date().toISOString(),
    });
  }

  // 2. Chat endpoint
  if (pathname === '/api/assistant/chat' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { message, history, metadata } = body || {};

      if (!message || typeof message !== 'string') {
        return sendJson(res, 400, {
          success: false,
          error: 'Field "message" is required and must be a string.',
        });
      }

      if (message.length > 2000) {
        return sendJson(res, 400, {
          success: false,
          error: 'Message length exceeds maximum limit of 2000 characters.',
        });
      }

      const result = await handleAssistantChat(history || [], message, metadata || {});
      return sendJson(res, 200, result);
    } catch (err) {
      console.error('Chat endpoint error:', err);
      return sendJson(res, 500, {
        success: false,
        error: err.message || 'Internal server error while processing chat.',
      });
    }
  }

  // 3. Lead submission endpoint
  if (pathname === '/api/assistant/lead' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const result = await saveLead(body);
      return sendJson(res, result.success ? 200 : 400, result);
    } catch (err) {
      console.error('Lead endpoint error:', err);
      return sendJson(res, 500, {
        success: false,
        error: err.message || 'Failed to submit lead.',
      });
    }
  }

  // 4. Admin leads list endpoint
  if (pathname === '/api/assistant/leads' && req.method === 'GET') {
    try {
      const leads = await getLeads();
      return sendJson(res, 200, { success: true, count: leads.length, leads });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 5. Update lead status endpoint
  if (pathname === '/api/assistant/lead/status' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const result = await updateLeadStatus(body.id, body.status);
      return sendJson(res, result.success ? 200 : 400, result);
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // 6. Direct estimate calculator endpoint
  if (pathname === '/api/assistant/estimate' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const estimate = calculateSolarEstimate(body.monthlyBill, body.propertyType);
      return sendJson(res, 200, { success: true, estimate });
    } catch (err) {
      return sendJson(res, 500, { success: false, error: err.message });
    }
  }

  // Not found
  return sendJson(res, 404, { success: false, error: `Route ${pathname} not found.` });
}
