import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

// Stand in for the real widget, which needs Cloudflare's script.
vi.mock('../../src/components/TurnstileWidget', () => ({
  default: React.forwardRef(
    ({ onVerify }: { onVerify: (t: string) => void }, ref: React.Ref<unknown>) => {
      React.useImperativeHandle(ref, () => ({ reset: () => onVerify('') }), [onVerify]);
      React.useEffect(() => onVerify('test-token'), [onVerify]);
      return <div data-testid="turnstile-widget" />;
    }
  ),
}));

vi.mock('../../src/lib/onesignal', () => ({
  initOneSignal: vi.fn(),
  requestPushWithEmail: vi.fn(),
}));

import PushOptIn from '../../src/components/PushOptIn';
import { initOneSignal, requestPushWithEmail } from '../../src/lib/onesignal';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

const renderOptIn = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <PushOptIn />
    </MemoryRouter>
  );

const waitForPrompt = () => act(() => vi.advanceTimersByTime(4_000));

describe('PushOptIn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    window.localStorage.clear();
    mockedAxios.post.mockResolvedValue({ data: { message: 'ok' } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays hidden until the delay passes, then loads OneSignal', () => {
    renderOptIn();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    waitForPrompt();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(initOneSignal).toHaveBeenCalled();
  });

  it('opens early on exit intent', () => {
    renderOptIn();
    act(() => {
      document.dispatchEvent(new MouseEvent('mouseout', { clientY: 0, relatedTarget: null }));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not show for someone who already subscribed', () => {
    window.localStorage.setItem('bx_optin', 'subscribed');
    renderOptIn();
    waitForPrompt();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not show again soon after being dismissed', () => {
    window.localStorage.setItem('bx_optin', String(Date.now()));
    renderOptIn();
    waitForPrompt();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('marks visitors arriving from the confirmation link as subscribed', () => {
    renderOptIn('/?confirmed=true');
    waitForPrompt();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('requests push and subscribes the email in one submit', async () => {
    renderOptIn();
    waitForPrompt();
    vi.useRealTimers();

    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), {
      target: { value: 'ada@b.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Get Updates' }));

    expect(requestPushWithEmail).toHaveBeenCalledWith('ada@b.com');
    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith('/.netlify/functions/subscribe', {
        email: 'ada@b.com',
        turnstileToken: 'test-token',
      })
    );
    expect(await screen.findByText(/check your inbox/i)).toBeInTheDocument();
    expect(window.localStorage.getItem('bx_optin')).toBe('subscribed');
  });

  it('closes on Escape and remembers the dismissal', () => {
    renderOptIn();
    waitForPrompt();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(Number(window.localStorage.getItem('bx_optin'))).toBeGreaterThan(0);
  });

  it('remembers a "No thanks" dismissal', () => {
    renderOptIn();
    waitForPrompt();
    fireEvent.click(screen.getByText(/No thanks/));
    expect(Number(window.localStorage.getItem('bx_optin'))).toBeGreaterThan(0);
  });
});
