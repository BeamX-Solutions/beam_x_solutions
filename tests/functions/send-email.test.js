import { describe, it, expect, beforeEach } from 'vitest';
import { installFetchStub, sentEmails, turnstileRejects } from './fetch-stub.js';

process.env.RESEND_API_KEY = 'stub-key';
process.env.TURNSTILE_SECRET_KEY = 'stub-turnstile-secret';

const { handler } = await import('../../netlify/functions/send-email.js');

const postEvent = (body) => ({
  httpMethod: 'POST',
  body: JSON.stringify({ turnstileToken: 'valid-token', ...body }),
});

describe('send-email function', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = installFetchStub();
  });

  it('rejects non-POST requests', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });

  it('rejects submissions with the bot honeypot field set', async () => {
    const res = await handler(
      postEvent({ name: 'A', email: 'a@b.com', message: 'hi', botField: 'spam' })
    );
    expect(res.statusCode).toBe(400);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it('rejects missing required fields', async () => {
    const res = await handler(postEvent({ name: 'A', email: 'a@b.com' }));
    expect(res.statusCode).toBe(400);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it('rejects invalid email addresses', async () => {
    const res = await handler(
      postEvent({ name: 'A', email: 'not-an-email', message: 'hi' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('rejects invalid JSON bodies without crashing', async () => {
    const res = await handler({ httpMethod: 'POST', body: '{not json' });
    expect(res.statusCode).toBe(500);
  });

  it('rejects a submission with no Turnstile token', async () => {
    const res = await handler({
      httpMethod: 'POST',
      body: JSON.stringify({ name: 'A', email: 'a@b.com', message: 'hi' }),
    });
    expect(res.statusCode).toBe(400);
    expect(sentEmails(fetchStub)).toHaveLength(0);
  });

  it('rejects a submission Cloudflare says is a bot', async () => {
    fetchStub = turnstileRejects();
    const res = await handler(
      postEvent({ name: 'A', email: 'a@b.com', message: 'hi' })
    );
    expect(res.statusCode).toBe(403);
    expect(sentEmails(fetchStub)).toHaveLength(0);
  });

  it('sends the email and escapes HTML in user input', async () => {
    const res = await handler(
      postEvent({
        name: '<script>alert(1)</script>',
        email: 'a@b.com',
        phone: '123',
        company: 'Acme & Co',
        message: '<img src=x onerror=alert(1)>',
      })
    );
    expect(res.statusCode).toBe(200);
    const [email] = sentEmails(fetchStub);
    expect(email.html).not.toContain('<script>');
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(email.html).toContain('Acme &amp; Co');
  });
});
