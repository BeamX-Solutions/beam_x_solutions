import { describe, it, expect, beforeEach } from 'vitest';
import { installFetchStub, sentEmails } from './fetch-stub.js';

process.env.SUPABASE_URL = 'https://stub.supabase.co';
process.env.SUPABASE_KEY = 'stub-key';
process.env.RESEND_API_KEY = 'stub-key';

const { handler } = await import('../../netlify/functions/join-waitlist.js');

const postEvent = (body) => ({
  httpMethod: 'POST',
  body: JSON.stringify(body),
});

describe('join-waitlist function', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = installFetchStub();
  });

  it('rejects non-POST requests', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });

  it('rejects invalid JSON bodies', async () => {
    const res = await handler({ httpMethod: 'POST', body: '{bad' });
    expect(res.statusCode).toBe(400);
  });

  it('rejects missing fields', async () => {
    const res = await handler(postEvent({ email: 'a@b.com' }));
    expect(res.statusCode).toBe(400);
  });

  it('rejects invalid email addresses', async () => {
    const res = await handler(
      postEvent({ firstName: 'A', lastName: 'B', email: 'bad-email' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('saves the signup and escapes HTML in the confirmation email', async () => {
    const res = await handler(
      postEvent({ firstName: '<i>Eve</i>', lastName: 'Smith', email: 'eve@b.com' })
    );
    expect(res.statusCode).toBe(200);
    const dbInsert = fetchStub.mock.calls.find(([url]) =>
      String(url).includes('/rest/v1/marketing_waitlist')
    );
    expect(dbInsert).toBeDefined();
    const [email] = sentEmails(fetchStub);
    expect(email.html).not.toContain('<i>Eve</i>');
    expect(email.html).toContain('&lt;i&gt;Eve&lt;/i&gt;');
  });
});
