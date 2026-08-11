import { describe, it, expect, beforeEach } from 'vitest';
import { installFetchStub, sentEmails, turnstileRejects } from './fetch-stub.js';

process.env.RESEND_API_KEY = 'stub-key';
process.env.RESEND_AUDIENCE_ID = 'stub-audience';
process.env.TURNSTILE_SECRET_KEY = 'stub-turnstile-secret';

const { handler } = await import('../../netlify/functions/whitepaper-gate.js');

const postEvent = (body) => ({
  httpMethod: 'POST',
  body: JSON.stringify({ turnstileToken: 'valid-token', ...body }),
});

describe('whitepaper-gate function', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = installFetchStub();
  });

  it('rejects non-POST requests', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });

  it('rejects missing required fields', async () => {
    const res = await handler(postEvent({ lastName: 'Only' }));
    expect(res.statusCode).toBe(400);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it('rejects a submission with no Turnstile token', async () => {
    const res = await handler({
      httpMethod: 'POST',
      body: JSON.stringify({ firstName: 'A', email: 'a@b.com' }),
    });
    expect(res.statusCode).toBe(400);
    expect(sentEmails(fetchStub)).toHaveLength(0);
  });

  it('rejects a submission Cloudflare says is a bot', async () => {
    fetchStub = turnstileRejects();
    const res = await handler(postEvent({ firstName: 'A', email: 'a@b.com' }));
    expect(res.statusCode).toBe(403);
    expect(sentEmails(fetchStub)).toHaveLength(0);
  });

  it('sends the whitepaper email with HTML-escaped first name', async () => {
    const res = await handler(
      postEvent({ firstName: '<script>x</script>', lastName: 'B', email: 'a@b.com' })
    );
    expect(res.statusCode).toBe(200);
    const [payload] = sentEmails(fetchStub);
    expect(payload.html).not.toContain('<script>x</script>');
    expect(payload.html).toContain('&lt;script&gt;x&lt;/script&gt;');
  });
});
