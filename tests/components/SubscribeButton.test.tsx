import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

// Stand in for the real widget, which needs Cloudflare's script. It hands back
// a token as soon as it mounts, mirroring a visitor passing the check.
vi.mock('../../src/components/TurnstileWidget', () => ({
  default: React.forwardRef(
    ({ onVerify }: { onVerify: (t: string) => void }, ref: React.Ref<unknown>) => {
      React.useImperativeHandle(ref, () => ({ reset: () => onVerify('') }), [onVerify]);
      React.useEffect(() => onVerify('test-token'), [onVerify]);
      return <div data-testid="turnstile-widget" />;
    }
  ),
}));

import SubscribeButton from '../../src/components/SubscribeButton';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('SubscribeButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: { isSubscribed: false } });
    mockedAxios.post.mockResolvedValue({
      data: { message: 'Confirmation email sent! Please check your email.' },
    });
  });

  it('renders the name and email fields', () => {
    render(<SubscribeButton />);
    expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
  });

  it('checks subscription status with only the email parameter', async () => {
    render(<SubscribeButton />);
    await userEvent.type(screen.getByPlaceholderText('Your email'), 'a@b.com');
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
    const [, config] = mockedAxios.get.mock.lastCall!;
    expect(config!.params).toEqual({ email: 'a@b.com' });
  });

  it('submits the form and shows the response message', async () => {
    render(<SubscribeButton />);
    await userEvent.type(screen.getByPlaceholderText('First name'), 'Ada');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Obi');
    await userEvent.type(screen.getByPlaceholderText('Your email'), 'ada@b.com');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Subscribe' })).toBeEnabled()
    );
    await userEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(
      await screen.findByText('Confirmation email sent! Please check your email.')
    ).toBeInTheDocument();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/.netlify/functions/subscribe',
      expect.objectContaining({ email: 'ada@b.com', firstName: 'Ada', lastName: 'Obi' })
    );
  });

  it('sends the Turnstile token with the subscription request', async () => {
    render(<SubscribeButton />);
    await userEvent.type(screen.getByPlaceholderText('First name'), 'Ada');
    await userEvent.type(screen.getByPlaceholderText('Last name'), 'Obi');
    await userEvent.type(screen.getByPlaceholderText('Your email'), 'ada@b.com');
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Subscribe' })).toBeEnabled()
    );
    await userEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled());
    const [, payload] = mockedAxios.post.mock.lastCall!;
    expect((payload as { turnstileToken: string }).turnstileToken).toBe('test-token');
  });
});
