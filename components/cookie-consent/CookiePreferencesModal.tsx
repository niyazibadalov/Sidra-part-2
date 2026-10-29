"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, CloseIcon, LeafIcon } from "../Icons";
import { CONSENT_CATEGORIES } from "./cookieConsentData";
import { ALL_ACCEPTED, ONLY_ESSENTIAL, type ConsentChoices } from "./cookieConsentStore";
import { ToggleSwitch } from "./ToggleSwitch";

type CookiePreferencesModalProps = {
  /** values the toggles start with (previous choice, or everything off) */
  initial: ConsentChoices;
  onClose: () => void;
  onSave: (choices: ConsentChoices) => void;
};

/** Mount it only while it is open, so the toggles reset from `initial` every time. */
export function CookiePreferencesModal({ initial, onClose, onSave }: CookiePreferencesModalProps) {
  const [choices, setChoices] = useState<ConsentChoices>(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // focus the dialog, close on Escape and lock page scroll while open
  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-3 sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        tabIndex={-1}
        className="relative max-h-[94vh] w-full overflow-y-auto rounded-2xl bg-cream-50 p-4 shadow-2xl outline-none sm:p-6 lg:max-w-[820px] lg:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-cream-200 sm:top-4 sm:right-4"
        >
          <CloseIcon width={16} height={16} />
        </button>

        <header className="flex items-start gap-3.5 pr-8">
          <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-cream-200 text-rose-gold-dark sm:grid">
            <LeafIcon width={20} height={20} />
          </span>
          <div>
            <h2 id="cookie-prefs-title" className="font-serif text-[22px] leading-tight text-ink sm:text-[24px]">
              Cookie Preferences
            </h2>
            <p className="mt-1 text-[12px] text-ink-soft sm:text-[13px]">
              Manage your cookie preferences.<span className="hidden sm:inline"> You can change these choices at any time.</span>
            </p>
          </div>
        </header>

        <ul className="mt-4 divide-y divide-line border-y border-line sm:mt-5">
          {CONSENT_CATEGORIES.map((c) => {
            const Icon = c.icon;
            const open = expanded === c.id;
            return (
              <li key={c.id} className="py-3.5 sm:py-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Icon width={20} height={20} className="mt-0.5 shrink-0 text-ink" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13.5px] font-medium text-ink">{c.title}</h3>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted sm:text-[12.5px]">{c.description}</p>
                    {open && <p className="mt-2 rounded-lg bg-cream-200 px-3 py-2 text-[11.5px] text-ink-soft">{c.examples}</p>}
                  </div>

                  {c.alwaysActive ? (
                    <span className="mt-0.5 hidden shrink-0 text-[12px] text-ink-soft sm:block">Always active</span>
                  ) : (
                    <div className="flex shrink-0 items-center gap-2.5 pt-0.5">
                      <ToggleSwitch
                        checked={choices[c.id as keyof ConsentChoices]}
                        onChange={(v) => setChoices((s) => ({ ...s, [c.id]: v }))}
                        label={c.title}
                      />
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : c.id)}
                        aria-expanded={open}
                        aria-label={`${open ? "Hide" : "Show"} details for ${c.title}`}
                        className="grid size-6 cursor-pointer place-items-center text-ink-soft"
                      >
                        <ChevronRightIcon width={14} height={14} className={`transition-transform ${open ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                  )}
                </div>
                {c.alwaysActive && (
                  <p className="mt-1.5 pl-8 text-[11.5px] text-ink-soft sm:hidden">Always active</p>
                )}
              </li>
            );
          })}
        </ul>

        <footer className="mt-4 sm:mt-5">
          <p className="flex items-center gap-2.5 text-[12px] text-ink">
            <Link href="/cookies" onClick={onClose} className="underline underline-offset-2">
              Cookie Policy
            </Link>
            <span aria-hidden className="text-muted">|</span>
            <Link href="/privacy" onClick={onClose} className="underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <p className="mt-2 text-[11.5px] text-muted">
            You can change these choices at any time from Cookie Preferences in the footer.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={() => onSave(ALL_ACCEPTED)}
              className="order-1 h-11 cursor-pointer rounded-md bg-ink px-6 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft sm:order-3 sm:flex-1"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={() => onSave(ONLY_ESSENTIAL)}
              className="order-2 h-11 cursor-pointer rounded-md border border-ink/60 bg-white px-6 text-[13px] text-ink transition-colors hover:bg-cream-200 sm:order-1 sm:flex-1"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={() => onSave(choices)}
              className="order-3 h-11 cursor-pointer rounded-md border border-line bg-cream-200/60 px-6 text-[13px] text-ink transition-colors hover:bg-cream-200 sm:order-2 sm:flex-1"
            >
              Save Preferences
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
