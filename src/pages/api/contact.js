import nodemailer from 'nodemailer';

// Simple in-memory rate limiter (per-IP) for basic abuse protection
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window
const requestLog = new Map(); // ip -> { count, resetAt }

function isRateLimited(ip) {
  const now = Date.now();
  const entry = requestLog.get(ip);
  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function sanitizeText(input = '') {
  const str = String(input).slice(0, 5000);
  return str.replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

function escapeHtml(input = '') {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const safeName = sanitizeText(name).slice(0, 200);
  const safeEmail = sanitizeText(email).slice(0, 320);
  const safeMessage = sanitizeText(message).slice(0, 5000);

  try {
    const host = process.env.CONTACT_SMTP_HOST;
    const port = Number(process.env.CONTACT_SMTP_PORT || '587');
    const user = process.env.CONTACT_SMTP_USER;
    const pass = process.env.CONTACT_SMTP_PASS;
    const to = process.env.CONTACT_TO || 'mogah.vincent@hotmail.com';

    if (!host || !user || !pass) {
      return res.status(500).json({ error: 'Email not configured' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`,
      to,
      replyTo: safeEmail,
      subject: `New message from ${safeName}`,
      text: safeMessage,
      html: `<p><strong>Name:</strong> ${escapeHtml(safeName)}</p>
             <p><strong>Email:</strong> ${escapeHtml(safeEmail)}</p>
             <p><strong>Message:</strong></p>
             <p>${escapeHtml(safeMessage).replace(/\n/g, '<br/>')}</p>`,
    });

    // Track successful contact form submission
    try {
      await fetch(`${req.headers.origin || process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric_type: 'contact_submission',
          metadata: { method: 'email', timestamp: Date.now() }
        })
      });
    } catch (analyticsError) {
      // Don't fail the contact form if analytics fails
      console.warn('Failed to track contact submission:', analyticsError);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send' });
  }
}


