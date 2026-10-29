export const CONSENT_KEY = "sidra_cookie_consent";
const CHANGE_EVENT = "sidra:cookie-consent-change";
export const OPEN_PREFERENCES_EVENT = "sidra:open-cookie-preferences";

export type ConsentChoices = {
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = ConsentChoices & {
  necessary: true;
  version: 1;
  savedAt: string;
};

export const ALL_ACCEPTED: ConsentChoices = { preferences: true, analytics: true, marketing: true };
export const ONLY_ESSENTIAL: ConsentChoices = { preferences: false, analytics: false, marketing: false };

/* ---- external store helpers (used with useSyncExternalStore) ---- */

export function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/** Raw string from localStorage, or null when nothing was saved (or storage is blocked). */
export function getConsentRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function parseConsent(raw: string | null | undefined): StoredConsent | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<StoredConsent>;
    return {
      necessary: true,
      version: 1,
      savedAt: v.savedAt ?? "",
      preferences: !!v.preferences,
      analytics: !!v.analytics,
      marketing: !!v.marketing,
    };
  } catch {
    return null;
  }
}

export function saveConsent(choices: ConsentChoices) {
  const value: StoredConsent = {
    necessary: true,
    version: 1,
    savedAt: new Date().toISOString(),
    ...choices,
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — the choice only lasts for this page view */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Call from anywhere (Footer link, Cookie Policy buttons…) to open the preferences modal. */
export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
