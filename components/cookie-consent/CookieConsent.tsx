"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";
import {
  ALL_ACCEPTED,
  ONLY_ESSENTIAL,
  OPEN_PREFERENCES_EVENT,
  getConsentRaw,
  parseConsent,
  saveConsent,
  subscribeConsent,
  type ConsentChoices,
} from "./cookieConsentStore";

/**
 * Mount once in app/layout.tsx. Shows the banner until the visitor makes a choice
 * and opens the preferences modal on request (see openCookiePreferences()).
 */
export function CookieConsent() {
  // `undefined` on the server / during hydration, then `string | null` on the client
  const raw = useSyncExternalStore(subscribeConsent, getConsentRaw, () => undefined);
  const stored = useMemo(() => parseConsent(raw), [raw]);

  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const open = () => setModalOpen(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const save = (choices: ConsentChoices) => {
    saveConsent(choices);
    setModalOpen(false);
  };

  const showBanner = raw === null && !dismissed && !modalOpen;

  return (
    <>
      {showBanner && (
        <CookieBanner
          onAcceptAll={() => save(ALL_ACCEPTED)}
          onRejectNonEssential={() => save(ONLY_ESSENTIAL)}
          onManage={() => setModalOpen(true)}
          onDismiss={() => setDismissed(true)}
        />
      )}
      {modalOpen && (
        <CookiePreferencesModal
          initial={stored ?? ONLY_ESSENTIAL}
          onClose={closeModal}
          onSave={save}
        />
      )}
    </>
  );
}
