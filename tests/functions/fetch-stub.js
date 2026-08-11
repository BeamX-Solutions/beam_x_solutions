import { vi } from 'vitest';

// The Netlify functions are CommonJS, so vi.mock cannot intercept their
// require('resend') / require('@supabase/supabase-js') calls. Both libraries
// talk to their APIs through global fetch, so tests stub the network layer
// instead and assert on the outgoing requests.
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const installFetchStub = (overrides = {}) => {
  const stub = vi.fn(async (url, options = {}) => {
    const u = String(url);
    for (const [needle, respond] of Object.entries(overrides)) {
      if (u.includes(needle)) return respond(u, options);
    }
    if (u.includes('challenges.cloudflare.com')) return json({ success: true });
    if (u.includes('api.resend.com/emails')) return json({ id: 'email-id' });
    if (u.includes('api.resend.com/audiences')) return json({ data: [] });
    if (u.includes('/rest/v1/')) return new Response('', { status: 201 });
    return json({});
  });
  vi.stubGlobal('fetch', stub);
  return stub;
};

export const sentEmails = (stub) =>
  stub.mock.calls
    .filter(([url]) => String(url).includes('api.resend.com/emails'))
    .map(([, options]) => JSON.parse(options.body));

// Turnstile rejects every token.
export const turnstileRejects = () =>
  installFetchStub({
    'challenges.cloudflare.com': () =>
      installFetchStub.json({ success: false, 'error-codes': ['invalid-input-response'] }),
  });

installFetchStub.json = json;
