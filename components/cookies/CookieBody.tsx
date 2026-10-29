"use client";

import { useState } from "react";
import { CookieSidebar } from "./CookieSidebar";
import { CookieGlance } from "./CookieGlance";
import { CookieDetailsTable } from "./CookieDetailsTable";
import { CookieAccordion, rowDomId } from "./CookieAccordion";
import { InControlBanner } from "./InControlBanner";
import { COOKIE_SECTIONS, GLANCE_ID } from "./cookieData";

const DETAILS_ID = "cookie-details";

/** Holds the shared state between the sidebar, the accordion and the buttons. */
export function CookieBody() {
  const [activeId, setActiveId] = useState(GLANCE_ID);
  const [openId, setOpenId] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    requestAnimationFrame(() => {
      // pick whichever element with this id is actually visible at the current breakpoint
      const target = [id, rowDomId(id)]
        .map((domId) => document.getElementById(domId))
        .find((el): el is HTMLElement => !!el && el.offsetParent !== null);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const select = (id: string) => {
    setActiveId(id);
    if (COOKIE_SECTIONS.some((s) => s.id === id)) setOpenId(id);
    scrollTo(id);
  };

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
    setActiveId(id);
  };

  return (
    <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8 lg:px-10 lg:py-8">
      <CookieSidebar activeId={activeId} onSelect={select} />

      <div className="min-w-0 space-y-5 lg:space-y-7">
        <CookieGlance onLearnMore={() => select("what-cookies-are")} />

        {/* desktop: the cookie table is shown in full */}
        <section id={DETAILS_ID} aria-labelledby="cookie-details-title" className="hidden scroll-mt-28 lg:block">
          <h2 id="cookie-details-title" className="font-serif text-[24px] text-ink">
            Cookie Details
          </h2>
          <p className="mt-1 mb-3 text-[12.5px] text-ink-soft">
            Below are some of the cookies we use on SIDRA. This list may be updated from time to time.
          </p>
          <CookieDetailsTable />
        </section>

        <CookieAccordion openId={openId} onToggle={toggle} />

        <InControlBanner />
      </div>
    </div>
  );
}
