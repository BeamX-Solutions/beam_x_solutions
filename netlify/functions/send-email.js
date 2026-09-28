const { Resend } = require('resend');
const { verifyTurnstile, clientIp, rejection } = require('../lib/turnstile.cjs');

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));

// Some bots get past Turnstile (e.g. via paid solving services) and fill the
// form with random letters, like the message "emCwMEYevilBGDMjEfV". Real
// messages have spaces; a long single token with several lower-to-upper case
// flips mid-word is a strong spam signal. URLs and emails are left alone.
const looksLikeGibberish = (text) => {
  const value = String(text ?? '').trim();
  if (value.length < 12 || /\s/.test(value) || /[@./:]/.test(value)) return false;
  const caseFlips = (value.match(/[a-z][A-Z]/g) || []).length;
  return caseFlips >= 3;
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, company, message, botField, turnstileToken } = body;

    // Check for bot field
    if (botField) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Bot detected' }),
      };
    }

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and message are required' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' }),
      };
    }

    // Answer as if it worked so the bot has no signal to adapt to.
    if (looksLikeGibberish(message)) {
      console.warn('Dropped likely spam contact submission (gibberish message).');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully' }),
      };
    }

    const verification = await verifyTurnstile(turnstileToken, clientIp(event));
    if (!verification.ok) {
      return rejection(verification.reason);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'admin@beamxsolutions.com',
      to: ['info@beamxsolutions.com', 'obinna.nweke@beamxsolutions.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${String(name).replace(/[\r\n]/g, ' ').slice(0, 200)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
        <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to send email' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('send-email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
