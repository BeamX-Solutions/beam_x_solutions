import { describe, it, expect, beforeEach } from 'vitest';
import { installFetchStub } from './fetch-stub.js';

process.env.RESEND_API_KEY = 'stub-key';
process.env.RESEND_AUDIENCE_ID = 'server-audience-id';

const { handler } = await import('../../netlify/functions/check-subscription.js');

const contacts = [
  { email: 'subscribed@b.com', unsubscribed: false },
  { email: 'gone@b.com', unsubscribed: true },
];

describe('check-subscription function', () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = installFetchStub({
      'api.resend.com/audiences': () => installFetchStub.json({ data: contacts }),
    });
  });

  it('rejects requests without an email', async () => {
    const res = await handler({ queryStringParameters: null });
    expect(res.statusCode).toBe(400);
    expect(fetchStub).not.toHaveBeenCalled();
  });

  it('rejects invalid email addresses', async () => {
    const res = await handler({ queryStringParameters: { email: 'nope' } });
    expect(res.statusCode).toBe(400);
  });

  it('always uses the server-side audience id, ignoring client input', async () => {
    await handler({
      queryStringParameters: { email: 'subscribed@b.com', audienceId: 'attacker-audience' },
    });
    const [url] = fetchStub.mock.calls[0];
    expect(String(url)).toContain('server-audience-id');
    expect(String(url)).not.toContain('attacker-audience');
  });

  it('reports subscribed contacts', async () => {
    const res = await handler({ queryStringParameters: { email: 'subscribed@b.com' } });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).isSubscribed).toBe(true);
  });

  it('reports unsubscribed contacts as not subscribed', async () => {
    const res = await handler({ queryStringParameters: { email: 'gone@b.com' } });
    expect(JSON.parse(res.body).isSubscribed).toBe(false);
  });

  it('returns a generic error message on failure', async () => {
    fetchStub = installFetchStub({
      'api.resend.com/audiences': () =>
        installFetchStub.json({ message: 'internal api key problem' }, 500),
    });
    const res = await handler({ queryStringParameters: { email: 'a@b.com' } });
    expect(res.statusCode).toBe(500);
    expect(res.body).not.toContain('internal api key problem');
  });
});
