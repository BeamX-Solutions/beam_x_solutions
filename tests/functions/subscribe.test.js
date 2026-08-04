import { describe, it, expect, beforeEach } from 'vitest';
import { installFetchStub, sentEmails } from './fetch-stub.js';

process.env.SUPABASE_URL = 'https://stub.supabase.co';
process.env.SUPABASE_KEY = 'stub-key';
process.env.RESEND_API_KEY = 'stub-key';
process.env.RESEND_AUDIENCE_ID = 'stub-audience';
process.env.URL = 'https://beamxsolutions.com';

const { handler } = await import('../../netlify/functions/subscribe.js');

const postEvent = (body) => ({
  httpMethod: 'POST',
  headers: { host: 'evil.example.com' },
  body: JSON.stringify(body),
});

describe('subscribe function', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = installFetchStub();
  });

  it('rejects non-POST requests', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });

  it('rejects invalid JSON bodies', async () => {
    const res = await handler({ httpMethod: 'POST', body: 'not json' });
    expect(res.statusCode).toBe(400);
  });

  it('rejects invalid email addresses', async () => {
    const res = await handler(
      postEvent({ firstName: 'A', lastName: 'B', email: 'bad' })
    );
    expect(res.statusCode).toBe(400);
  });

  it('rejects missing names', async () => {
    const res = await handler(postEvent({ email: 'a@b.com' }));
    expect(res.statusCode).toBe(400);
  });

  it('stores a pending subscription and emails a confirmation link on the canonical domain', async () => {
    const res = await handler(
      postEvent({ firstName: 'Ada', lastName: 'Obi', email: 'ada@b.com' })
    );
    expect(res.statusCode).toBe(200);
    const dbInsert = fetchStub.mock.calls.find(([url]) =>
      String(url).includes('/rest/v1/pending_subscriptions')
    );
    expect(dbInsert).toBeDefined();
    const [email] = sentEmails(fetchStub);
    expect(email.html).toContain(
      'https://beamxsolutions.com/.netlify/functions/confirm-subscription?token='
    );
    expect(email.html).not.toContain('evil.example.com');
  });

  it('escapes HTML in names in the confirmation email', async () => {
    const res = await handler(
      postEvent({ firstName: '<b>X</b>', lastName: 'Y', email: 'x@y.com' })
    );
    expect(res.statusCode).toBe(200);
    const [email] = sentEmails(fetchStub);
    expect(email.html).not.toContain('<b>X</b>');
    expect(email.html).toContain('&lt;b&gt;X&lt;/b&gt;');
  });

  it('returns a generic error message when the database insert fails', async () => {
    fetchStub = installFetchStub({
      '/rest/v1/': () =>
        installFetchStub.json({ message: 'secret internal detail' }, 400),
    });
    const res = await handler(
      postEvent({ firstName: 'Ada', lastName: 'Obi', email: 'ada@b.com' })
    );
    expect(res.statusCode).toBe(500);
    expect(res.body).not.toContain('secret internal detail');
  });
});
