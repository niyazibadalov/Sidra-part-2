"use client";

import Image from "next/image";
import { openCookiePreferences } from "../cookie-consent/cookieConsentStore";
import bannerImage from "@/app/images/bagFullHero.png";

export function InControlBanner() {
  return (
    <section
      aria-labelledby="in-control"
      className="relative isolate overflow-hidden rounded-xl border border-line bg-sand-200"
    >
      <Image
        src={bannerImage}
        alt=""
        fill
        sizes="(min-width: 1440px) 1100px, 100vw"
        className="-z-20 object-cover object-right"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-sand-200 via-sand-200/85 to-transparent lg:via-sand-200/60" />

      <div className="flex flex-col gap-4 px-5 py-5 sm:px-7 lg:min-h-[92px] lg:flex-row lg:items-center lg:gap-8 lg:py-4">
        <div className="lg:flex-1">
          <h2 id="in-control" className="font-serif text-[22px] text-ink">
            You&apos;re in Control
          </h2>
          <p className="mt-0.5 text-[12px] text-ink-soft">
            You can manage your cookie preferences or withdraw your consent at any time.
          </p>
        </div>
        <button
          type="button"
          onClick={openCookiePreferences}
          className="h-11 w-full cursor-pointer rounded-md bg-ink px-8 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft sm:w-fit lg:shrink-0"
        >
          Manage Cookie Preferences
        </button>
        <p aria-hidden className="hidden w-[130px] font-serif text-[15px] leading-snug text-ink xl:block">
          Your experience.
          <br />
          Your choice.
        </p>
      </div>
    </section>
  );
}
