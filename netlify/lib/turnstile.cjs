// Shared Cloudflare Turnstile verification for the public Netlify functions.
//
// Lives outside netlify/functions so Netlify does not deploy it as its own
// endpoint; esbuild bundles it into each function that requires it.
//
// Required env var: TURNSTILE_SECRET_KEY (Netlify > Site configuration >
// Environment variables). The matching public site key is exposed to the
// browser as VITE_TURNSTILE_SITE_KEY.

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// Tokens are single-use and expire ~5 minutes after issue.
const verifyTurnstile = async (token, remoteIp) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Deployed without the secret configured: allow the request through so the
  // forms keep working, but make the gap loud in the function logs. Set the
  // env var in Netlify to activate enforcement.
  if (!secret) {
    console.warn(
      'TURNSTILE_SECRET_KEY is not set - bot verification is DISABLED for this request.'
    );
    return { ok: true, skipped: true };
  }

  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'missing-token' };
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
    });

    const data = await res.json();

    if (!data.success) {
      console.warn('Turnstile rejected a submission:', data['error-codes']);
      return { ok: false, reason: 'failed-verification' };
    }

    return { ok: true };
  } catch (error) {
    // Cloudflare unreachable. Fail closed: a spam bot getting through is worse
    // than a visitor retrying.
    console.error('Turnstile verification error:', error);
    return { ok: false, reason: 'verification-unavailable' };
  }
};

// Netlify puts the caller's IP in x-nf-client-connection-ip.
const clientIp = (event) =>
  event?.headers?.['x-nf-client-connection-ip'] ||
  (event?.headers?.['x-forwarded-for'] || '').split(',')[0].trim() ||
  undefined;

const rejection = (reason) => ({
  statusCode: reason === 'missing-token' ? 400 : 403,
  body: JSON.stringify({
    message:
      reason === 'verification-unavailable'
        ? 'Could not verify your submission right now. Please try again in a moment.'
        : 'Bot verification failed. Please refresh the page and try again.',
  }),
});

module.exports = { verifyTurnstile, clientIp, rejection };
