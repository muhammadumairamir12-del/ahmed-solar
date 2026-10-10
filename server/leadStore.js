import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory and file exist
function initStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing lead store:', err.message);
  }
}

initStore();

/**
 * Sanitize plain string input to prevent injection
 */
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, 500);
}

/**
 * Validate customer phone number (Pakistan standard or international)
 */
function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
}

/**
 * Save a new customer lead securely with consent verification
 */
export async function saveLead(leadInput) {
  initStore();

  const {
    name,
    phone,
    city = 'Islamabad',
    propertyType = 'residential',
    monthlyBill = '',
    systemSize = '',
    preferredContact = 'WhatsApp',
    notes = '',
    consentGiven = false,
  } = leadInput || {};

  // 1. Consent verification
  if (!consentGiven) {
    return {
      success: false,
      error: 'Customer consent is required before saving or submitting personal contact details.',
    };
  }

  // 2. Name validation
  const cleanName = sanitize(name);
  if (!cleanName || cleanName.length < 2) {
    return {
      success: false,
      error: 'Please provide a valid customer name (minimum 2 characters).',
    };
  }

  // 3. Phone validation
  const cleanPhone = sanitize(phone);
  if (!isValidPhone(cleanPhone)) {
    return {
      success: false,
      error: 'Please provide a valid contact phone number (e.g. 0330 0002629).',
    };
  }

  const newLead = {
    id: `lead_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
    createdAt: new Date().toISOString(),
    name: cleanName,
    phone: cleanPhone,
    city: sanitize(city) || 'Islamabad',
    propertyType: sanitize(propertyType) || 'residential',
    monthlyBill: sanitize(String(monthlyBill)),
    systemSize: sanitize(systemSize),
    preferredContact: sanitize(preferredContact) || 'WhatsApp',
    notes: sanitize(notes),
    status: 'new', // new, contacted, site_survey_booked, quotation_sent, closed
    consentGiven: true,
    consentTimestamp: new Date().toISOString(),
  };

  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(raw || '[]');
    leads.unshift(newLead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');

    return {
      success: true,
      leadId: newLead.id,
      message: 'Your inquiry has been successfully received by AT Solar Power Solutions. Our team will contact you shortly.',
      leadSummary: {
        name: newLead.name,
        city: newLead.city,
        systemSize: newLead.systemSize,
      },
    };
  } catch (err) {
    console.error('Failed to write lead to store:', err);
    return {
      success: false,
      error: 'Failed to record lead on the server. Please try reaching out directly on WhatsApp or phone.',
    };
  }
}

/**
 * Retrieve leads (admin use only)
 */
export async function getLeads() {
  initStore();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to read leads:', err);
    return [];
  }
}

/**
 * Update lead status (admin use only)
 */
export async function updateLeadStatus(id, newStatus) {
  initStore();
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const leads = JSON.parse(raw || '[]');
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return { success: false, error: 'Lead not found' };
    
    leads[idx].status = sanitize(newStatus);
    leads[idx].updatedAt = new Date().toISOString();
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
