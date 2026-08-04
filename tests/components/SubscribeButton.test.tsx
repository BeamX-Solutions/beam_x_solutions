import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
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
});
