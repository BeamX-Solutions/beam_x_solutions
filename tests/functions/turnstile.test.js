import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const loadVerifier = async () => {
  vi.resetModules();
  return import('../../netlify/lib/turnstile.cjs');
};

const okResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

describe('verifyTurnstile', () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;

  beforeEach(() => {
    process.env.TURNSTILE_SECRET_KEY = 'test-secret';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(okResponse({ success: true })));
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = originalSecret;
  });

  it('accepts a token Cloudflare marks successful', async () => {
    const { verifyTurnstile } = await loadVerifier();
    const result = await verifyTurnstile('good-token', '1.2.3.4');
    expect(result.ok).toBe(true);

    const [url, options] = fetch.mock.calls[0];
    expect(String(url)).toContain('challenges.cloudflare.com');
    const payload = JSON.parse(options.body);
    expect(payload.secret).toBe('test-secret');
    expect(payload.response).toBe('good-token');
    expect(payload.remoteip).toBe('1.2.3.4');
  });

  it('rejects a token Cloudflare marks unsuccessful', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        okResponse({ success: false, 'error-codes': ['invalid-input-response'] })
      )
    );
    const { verifyTurnstile } = await loadVerifier();
    const result = await verifyTurnstile('bad-token');
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('failed-verification');
  });

  it('rejects a request with no token without calling Cloudflare', async () => {
    const { verifyTurnstile } = await loadVerifier();
    const result = await verifyTurnstile(undefined);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('missing-token');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('fails closed when Cloudflare is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    const { verifyTurnstile } = await loadVerifier();
    const result = await verifyTurnstile('any-token');
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('verification-unavailable');
  });

  it('skips verification (and warns) when no secret is configured', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { verifyTurnstile } = await loadVerifier();
    const result = await verifyTurnstile(undefined);
    expect(result).toEqual({ ok: true, skipped: true });
    expect(warn).toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe('clientIp', () => {
  it('prefers the Netlify client IP header', async () => {
    const { clientIp } = await loadVerifier();
    expect(
      clientIp({
        headers: {
          'x-nf-client-connection-ip': '9.9.9.9',
          'x-forwarded-for': '1.1.1.1, 2.2.2.2',
        },
      })
    ).toBe('9.9.9.9');
  });

  it('falls back to the first x-forwarded-for entry', async () => {
    const { clientIp } = await loadVerifier();
    expect(clientIp({ headers: { 'x-forwarded-for': '1.1.1.1, 2.2.2.2' } })).toBe(
      '1.1.1.1'
    );
  });

  it('returns undefined when no IP header is present', async () => {
    const { clientIp } = await loadVerifier();
    expect(clientIp({ headers: {} })).toBeUndefined();
  });
});

describe('rejection', () => {
  it('uses 400 for a missing token and 403 for a failed check', async () => {
    const { rejection } = await loadVerifier();
    expect(rejection('missing-token').statusCode).toBe(400);
    expect(rejection('failed-verification').statusCode).toBe(403);
  });

  it('tells the visitor to retry when Cloudflare is unreachable', async () => {
    const { rejection } = await loadVerifier();
    expect(rejection('verification-unavailable').body).toContain('try again');
  });
});
