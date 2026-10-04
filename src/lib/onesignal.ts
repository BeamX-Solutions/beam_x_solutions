// OneSignal web push. The App ID is public by design; VITE_ONESIGNAL_APP_ID
// overrides it (e.g. for a staging OneSignal app). The dashboard app must use
// the "Custom Code" integration so OneSignal never shows its own prompts;
// PushOptIn is the only thing that asks for permission.
//
// The service worker lives at /OneSignalSDKWorker.js (public/).
const APP_ID =
  import.meta.env.VITE_ONESIGNAL_APP_ID || '69c86286-8af3-4579-91f2-f06ad56cec37';

const SCRIPT_SRC = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';

interface OneSignalApi {
  init: (options: Record<string, unknown>) => Promise<void>;
  Notifications: {
    isPushSupported: () => boolean;
    permission: boolean;
    requestPermission: () => Promise<void>;
  };
  User: {
    addEmail: (email: string) => void;
    addTag: (key: string, value: string) => void;
  };
}

type Deferred = (os: OneSignalApi) => void | Promise<void>;

declare global {
  interface Window {
    OneSignalDeferred?: Deferred[];
  }
}

// The OneSignal app only accepts its configured Site URL and throws on any
// other origin (localhost, deploy previews), so the SDK is only loaded there.
// The popup still works elsewhere; it just skips the push part.
const PUSH_HOSTNAME = 'beamxsolutions.com';
const isPushHost = (): boolean =>
  typeof window !== 'undefined' && window.location.hostname === PUSH_HOSTNAME;

let initialized = false;

/** Loads the SDK and initializes it once. Safe to call repeatedly. */
export const initOneSignal = (): void => {
  if (!isPushHost() || initialized) return;
  initialized = true;

  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal) => {
    await OneSignal.init({ appId: APP_ID });
  });

  const script = document.createElement('script');
  script.src = SCRIPT_SRC;
  script.defer = true;
  document.head.appendChild(script);
};

const withOneSignal = (fn: Deferred): void => {
  if (!isPushHost()) return;
  initOneSignal();
  window.OneSignalDeferred!.push(fn);
};

/**
 * True when this browser can receive web push. False in most in-app browsers
 * (Instagram, LinkedIn, Facebook) and on iOS unless the site is installed.
 */
export const isPushSupported = (): boolean =>
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator &&
  'PushManager' in window &&
  'Notification' in window;

/**
 * Asks for push permission and attaches the email to the same OneSignal user,
 * so the push subscription and the email belong to one contact.
 *
 * Call this synchronously from the click handler: Safari and Firefox only show
 * the permission dialog in response to a user gesture.
 */
export const requestPushWithEmail = (email: string, firstName?: string): void => {
  withOneSignal(async (OneSignal) => {
    OneSignal.User.addEmail(email);
    if (firstName) OneSignal.User.addTag('first_name', firstName);
    OneSignal.User.addTag('source', 'site_optin');
    if (isPushSupported() && !OneSignal.Notifications.permission) {
      await OneSignal.Notifications.requestPermission();
    }
  });
};
