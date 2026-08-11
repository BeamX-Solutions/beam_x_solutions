import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

// Cloudflare Turnstile. The site key is public by design and is injected at
// build time from VITE_TURNSTILE_SITE_KEY (set in Netlify). The matching
// secret key stays server-side in TURNSTILE_SECRET_KEY.
//
// Cloudflare's "always passes" test key keeps local dev working without a
// real key configured.
const TEST_SITE_KEY = '1x00000000000000000000AA';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

const SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
      theme?: 'light' | 'dark' | 'auto';
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;

const loadTurnstileScript = (): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('load failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(script);
  });

  return scriptPromise;
};

export interface TurnstileHandle {
  /** Clears the current token and asks Cloudflare for a fresh one. */
  reset: () => void;
}

interface TurnstileWidgetProps {
  /** Fires with a token when the check passes, and with '' when it lapses. */
  onVerify: (token: string) => void;
  className?: string;
}

const TurnstileWidget = React.forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  ({ onVerify, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onVerifyRef = useRef(onVerify);
    const [failedToLoad, setFailedToLoad] = useState(false);

    // Keep the latest callback without re-rendering the widget.
    useEffect(() => {
      onVerifyRef.current = onVerify;
    }, [onVerify]);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          if (window.turnstile && widgetIdRef.current) {
            window.turnstile.reset(widgetIdRef.current);
            onVerifyRef.current('');
          }
        },
      }),
      []
    );

    const render = useCallback(() => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onVerifyRef.current(token),
        'expired-callback': () => onVerifyRef.current(''),
        'error-callback': () => onVerifyRef.current(''),
        theme: 'light',
      });
    }, []);

    useEffect(() => {
      let cancelled = false;

      loadTurnstileScript()
        .then(() => {
          if (!cancelled) render();
        })
        .catch(() => {
          if (!cancelled) setFailedToLoad(true);
        });

      return () => {
        cancelled = true;
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [render]);

    if (failedToLoad) {
      return (
        <p className="text-sm text-error">
          Could not load the bot check. Please disable any ad blocker for this
          site and refresh.
        </p>
      );
    }

    return <div ref={containerRef} className={className} data-testid="turnstile-widget" />;
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';

export default TurnstileWidget;
