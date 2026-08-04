import { describe, it, expect, vi, beforeEach } from 'vitest';

const { handler } = await import('../../netlify/functions/whitepaper-gate.js');

const postEvent = (body) => ({
  httpMethod: 'POST',
  body: JSON.stringify(body),
});

describe('whitepaper-gate function', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: async () => '' })
    );
  });

  it('rejects non-POST requests', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });

  it('rejects missing required fields', async () => {
    const res = await handler(postEvent({ lastName: 'Only' }));
    expect(res.statusCode).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('sends the whitepaper email with HTML-escaped first name', async () => {
    const res = await handler(
      postEvent({ firstName: '<script>x</script>', lastName: 'B', email: 'a@b.com' })
    );
    expect(res.statusCode).toBe(200);
    const emailCall = fetch.mock.calls.find(([url]) =>
      String(url).includes('/emails')
    );
    const payload = JSON.parse(emailCall[1].body);
    expect(payload.html).not.toContain('<script>x</script>');
    expect(payload.html).toContain('&lt;script&gt;x&lt;/script&gt;');
  });
});
