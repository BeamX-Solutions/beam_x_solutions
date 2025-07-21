import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button'; // Adjust path to your Button component

interface SubscribeResponse {
  message: string;
  [key: string]: any;
}

const SubscribeButton: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  // Check subscription status on email change
  useEffect(() => {
    const checkSubscription = async () => {
      if (!email) {
        setIsSubscribed(null);
        return;
      }
      try {
        const response = await axios.get<{ isSubscribed: boolean }>('/.netlify/functions/check-subscription', {
          params: { email, audienceId: process.env.REACT_APP_RESEND_AUDIENCE_ID },
        });
        setIsSubscribed(response.data.isSubscribed);
      } catch (error: unknown) {
        console.error('Error checking subscription:', error);
        setIsSubscribed(false); // Assume not subscribed if error
      }
    };
    checkSubscription();
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post<SubscribeResponse>('/.netlify/functions/subscribe', {
        firstName,
        lastName,
        email,
        action: isSubscribed ? 'unsubscribe' : undefined, // Send action only for unsubscribe
      });
      setMessage(response.data.message);
      if (!isSubscribed) {
        // Clear form only for subscribe (not unsubscribe)
        setEmail('');
        setFirstName('');
        setLastName('');
      }
      setIsSubscribed(!isSubscribed); // Toggle subscription state
    } catch (error: unknown) {
      const errorMessage = (error as any).response?.data?.message || 'An error occurred';
      if (errorMessage.includes('rate_limit_exceeded')) {
        setMessage('Too many requests. Please try again in a few seconds.');
      } else {
        setMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 max-w-md mx-auto px-4 sm:px-0">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        <Button type="submit" variant="primary" disabled={isLoading || isSubscribed === null}>
          {isLoading ? 'Submitting...' : isSubscribed === null ? 'Loading...' : isSubscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default SubscribeButton;