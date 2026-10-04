import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import TurnstileWidget, { TurnstileHandle } from './TurnstileWidget';
import { initOneSignal, requestPushWithEmail } from '../lib/onesignal';

// Newsletter popup: email + web push. The email goes through the normal
// newsletter flow (subscribe function, double opt-in); the same click asks the
// browser for push permission via OneSignal and links the email to that push
// subscriber. Where push isn't available (in-app browsers, iOS Safari) the
// email is still captured.
//
// Opens after a short delay, or earlier on exit intent (the pointer leaving
// through the top of the window, towards the tabs or address bar).

const STORAGE_KEY = 'bx_optin';
const SHOW_AFTER_MS = 4_000;
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
    // Storage blocked; the popup may show again next visit, which is fine.
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const nameRef = useRef<HTMLInputElement>(null);

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
      // Load OneSignal now so it is ready by the time they click the button.
      initOneSignal();
      setIsOpen(true);
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };

    const timer = window.setTimeout(show, SHOW_AFTER_MS);
    document.addEventListener('mouseout', onMouseOut);
    const cleanup = () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseout', onMouseOut);
    };
    return cleanup;
  }, []);

  const close = () => {
    if (!isDone) writeState(String(Date.now()));
    setIsOpen(false);
  };

  // While open: Escape closes, the page behind doesn't scroll, and the email
  // field has focus.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    nameRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
    // close only reads isDone, which can't change while the listener matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage('');

    if (!name.trim()) {
      setMessage('Please enter your name.');
      return;
    }

    if (!turnstileToken) {
      setMessage('Just a moment, verifying you are human. Please try again.');
      return;
    }

    // One "name" field, stored as first + last like the other signup forms.
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(' ');

    // Must run before any await so the browser treats it as a user gesture.
    requestPushWithEmail(email, firstName);

    setIsLoading(true);
    try {
      await axios.post('/.netlify/functions/subscribe', {
        firstName,
        lastName,
        email,
        turnstileToken,
      });
      writeState('subscribed');
      setIsDone(true);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/75 p-4"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[750px] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl sm:grid sm:grid-cols-[2fr_3fr]"
          >
            <button
              onClick={close}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow hover:text-gray-800"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src="/newsletter-popup.webp"
              alt=""
              width={600}
              height={575}
              className="h-40 w-full object-cover sm:h-full"
            />

            <div className="p-6 sm:p-8">
              {isDone ? (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                  <p className="mt-4 text-lg font-semibold text-gray-900">You're almost in!</p>
                  <p className="mt-2 text-gray-600">
                    Check your inbox and click the link to confirm your subscription.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Data &amp; AI insights
                  </p>
                  <h2
                    id="newsletter-popup-title"
                    className="mt-2 text-2xl md:text-2xl font-bold text-gray-900"
                  >
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="mt-3 text-gray-600">
                    Practical analytics and AI tips, early access to new BeamX products, and
                    updates worth reading. Delivered by email and browser notification.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                    <label htmlFor="newsletter-popup-name" className="sr-only">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      id="newsletter-popup-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                    <label htmlFor="newsletter-popup-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="newsletter-popup-email"
                      autoComplete="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                    <TurnstileWidget
                      ref={turnstileRef}
                      onVerify={setTurnstileToken}
                      appearance="interaction-only"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {isLoading ? 'Subscribing...' : 'Get Updates'}
                    </button>
                    {message && <p className="text-sm text-red-600">{message}</p>}
                    <p className="text-xs text-gray-500">
                      We'll also ask to send browser notifications. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {!isDone && (
            <button
              type="button"
              onClick={close}
              className="mt-4 text-sm text-gray-200 hover:text-white"
            >
              No thanks, I'm not interested!
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PushOptIn;
