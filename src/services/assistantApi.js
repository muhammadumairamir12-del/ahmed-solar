/**
 * Frontend client service for Ahmed Assistant.
 * Securely communicates with the backend API routes (/api/assistant/*).
 * Zero API keys or secrets are stored or exposed on the client side.
 */

const API_BASE = '/api/assistant';

/**
 * Send a chat message with session history to Ahmed Assistant
 */
export async function sendChatMessage(message, history = []) {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        metadata: {
          timestamp: new Date().toISOString(),
          url: window.location.pathname,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Server returned status ${response.status}`);
    }

    return {
      success: true,
      reply: data.reply || 'Thank you for reaching out to AT Solar.',
      modelUsed: data.modelUsed,
      toolExecuted: data.toolExecuted,
    };
  } catch (error) {
    console.error('Ahmed Assistant Chat API error:', error);
    return {
      success: false,
      error: error.message,
      reply: 'I am experiencing a momentary connection issue. You can also contact AT Solar directly on WhatsApp at +92 330 0002629 or phone 0330 0002629 for instant assistance.',
    };
  }
}

/**
 * Submit a customer lead / survey request
 */
export async function submitCustomerLead(leadData) {
  try {
    const response = await fetch(`${API_BASE}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit inquiry.');
    }

    return data;
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch solar system estimate
 */
export async function getSolarEstimate(monthlyBill, propertyType = 'residential') {
  try {
    const response = await fetch(`${API_BASE}/estimate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ monthlyBill, propertyType }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Estimate error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch recorded leads (Admin view)
 */
export async function fetchAdminLeads() {
  try {
    const response = await fetch(`${API_BASE}/leads`);
    const data = await response.json();
    return data?.leads || [];
  } catch (error) {
    console.error('Fetch leads error:', error);
    return [];
  }
}

/**
 * Update lead status (Admin view)
 */
export async function updateLeadStatus(id, status) {
  try {
    const response = await fetch(`${API_BASE}/lead/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
}
