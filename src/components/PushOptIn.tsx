import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import TurnstileWidget, { TurnstileHandle } from './TurnstileWidget';
import { initOneSignal, requestPushWithEmail } from '../lib/onesignal';

// Email + push opt-in. The email goes through the normal newsletter flow
// (subscribe function, double opt-in); the same click asks the browser for
// push permission via OneSignal and links the email to that push subscriber.
// Where push isn't available (in-app browsers, iOS Safari) the email is still
// captured.

const STORAGE_KEY = 'bx_optin';
const SHOW_AFTER_MS = 20_000;
const SHOW_AFTER_SCROLL = 0.4;
const DISMISS_DAYS = 14;

const readState = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeState = (value: string): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked; the prompt may show again next visit, which is fine.
  }
};

const shouldPrompt = (): boolean => {
  const state = readState();
  if (!state) return true;
  if (state === 'subscribed') return false;
  const dismissedAt = Number(state);
  return !dismissedAt || Date.now() - dismissedAt > DISMISS_DAYS * 24 * 60 * 60 * 1000;
};

const PushOptIn: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  useEffect(() => {
    // Arriving from the confirmation link means they already subscribed.
    if (new URLSearchParams(location.search).get('confirmed') === 'true') {
      writeState('subscribed');
    }
    // Only evaluated once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!shouldPrompt()) return;

    let shown = false;
    const show = () => {
      if (shown || !shouldPrompt()) return;
      shown = true;
      // Load OneSignal now so it is ready by the time they click Subscribe.
      initOneSignal();
      setIsOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SHOW_AFTER_SCROLL) show();
    };

    const timer = window.setTimeout(show, SHOW_AFTER_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
    return cleanup;
  }, []);

  const close = () => {
    if (!isDone) writeState(String(Date.now()));
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage('');

    if (!turnstileToken) {
      setMessage('Please complete the bot check below.');
      return;
    }

    // Must run before any await so the browser treats it as a user gesture.
    requestPushWithEmail(email, firstName);

    setIsLoading(true);
    try {
      await axios.post('/.netlify/functions/subscribe', {
        firstName,
        email,
        turnstileToken,
      });
      writeState('subscribed');
      setIsDone(true);
      setMessage('Almost done! Check your inbox to confirm your subscription.');
      window.setTimeout(() => setIsOpen(false), 6000);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
        'Something went wrong. Please try again.';
      setMessage(errorMessage);
    } finally {
      turnstileRef.current?.reset();
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-labelledby="push-optin-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:w-96 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-5"
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-start gap-3 pr-6">
            <Bell className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h2 id="push-optin-title" className="text-lg md:text-lg font-semibold text-gray-900">
                Stay in the loop with BeamX
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Get new insights on data and AI, product launches, and offers, by email and
                browser notification.
              </p>
            </div>
          </div>

          {isDone ? (
            <p className="mt-4 text-sm text-green-700">{message}</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                maxLength={100}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
              <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} />
              <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
              <button
                type="button"
                onClick={close}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                No thanks
              </button>
              {message && <p className="text-sm text-red-600">{message}</p>}
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PushOptIn;
