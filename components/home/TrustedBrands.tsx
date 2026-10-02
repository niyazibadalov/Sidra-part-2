"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

type Brand = {
  name: string;
  renderLogo: () => React.ReactNode;
};

const BRANDS: Brand[] = [
  {
    name: "Cartier",
    renderLogo: () => (
      <span className="font-serif italic text-2xl tracking-wider text-ink/80 transition-colors hover:text-ink sm:text-[26px]">
        Cartier
      </span>
    ),
  },
  {
    name: "TIFFANY & CO.",
    renderLogo: () => (
      <span className="font-serif text-[15px] font-medium tracking-[0.28em] text-ink/80 transition-colors hover:text-ink sm:text-[17px]">
        TIFFANY &amp; CO.
      </span>
    ),
  },
  {
    name: "BVLGARI",
    renderLogo: () => (
      <span className="font-serif text-[17px] font-bold tracking-[0.24em] text-ink/80 transition-colors hover:text-ink sm:text-[19px]">
        BVLGARI
      </span>
    ),
  },
  {
    name: "Chopard",
    renderLogo: () => (
      <span className="font-script text-2xl font-bold tracking-wide text-ink/80 transition-colors hover:text-ink sm:text-[28px]">
        Chopard
      </span>
    ),
  },
  {
    name: "MIKIMOTO",
    renderLogo: () => (
      <span className="font-serif text-[15px] font-medium tracking-[0.26em] text-ink/80 transition-colors hover:text-ink sm:text-[17px]">
        MIKIMOTO
      </span>
    ),
  },
  {
    name: "MESSIKA",
    renderLogo: () => (
      <span className="font-sans text-[15px] font-medium tracking-[0.24em] text-ink/80 transition-colors hover:text-ink sm:text-[17px]">
        MESSIKA
      </span>
    ),
  },
  {
    name: "PANDÖRA",
    renderLogo: () => (
      <span className="font-sans text-[16px] font-semibold tracking-[0.22em] text-ink/80 transition-colors hover:text-ink sm:text-[18px]">
        PANDÖRA
      </span>
    ),
  },
  {
    name: "VAN CLEEF & ARPELS",
    renderLogo: () => (
      <span className="font-serif text-[13px] font-medium tracking-[0.25em] text-ink/80 transition-colors hover:text-ink sm:text-[15px]">
        VAN CLEEF &amp; ARPELS
      </span>
    ),
  },
  {
    name: "HARRY WINSTON",
    renderLogo: () => (
      <span className="font-serif text-[14px] font-medium tracking-[0.25em] text-ink/80 transition-colors hover:text-ink sm:text-[16px]">
        HARRY WINSTON
      </span>
    ),
  },
  {
    name: "GRAFF",
    renderLogo: () => (
      <span className="font-serif text-[17px] font-bold tracking-[0.3em] text-ink/80 transition-colors hover:text-ink sm:text-[19px]">
        GRAFF
      </span>
    ),
  },
];

export function TrustedBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 260;
    if (el.scrollLeft <= 10) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 260;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Autoplay effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      scrollNext();
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section aria-label="Trusted brands" className="border-t border-line/60 bg-cream-50 py-3 sm:py-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-10">
        {/* Title: exactly 2 lines */}
        <div className="shrink-0 min-w-max">
          <h3 className="font-serif text-lg leading-tight text-ink sm:text-[21px] text-center mt-5 whitespace-nowrap">
            Trusted Brands,
            <br />
            Extraordinary Jewellery
          </h3>
        </div>

        {/* Carousel container */}
        <div
          className="relative flex flex-1 items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Navigation Button (visible on mobile/tablet < 1024px, hidden on desktop >= 1024px) */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous brands"
            className="mr-2 grid size-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink lg:hidden"
          >
            <ChevronLeftIcon width={20} height={20} />
          </button>

          {/* Scrollable brands track */}
          <div
            ref={scrollRef}
            className="scrollbar-none flex w-full items-center gap-10 overflow-x-auto scroll-smooth py-2 sm:gap-14"
          >
            {/* Render brands list */}
            {BRANDS.concat(BRANDS).map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="shrink-0 select-none opacity-85 transition-opacity hover:opacity-100"
              >
                {brand.renderLogo()}
              </div>
            ))}
          </div>

          {/* Right Arrow Navigation Button */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next brands"
            className="ml-2 grid size-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream-200 hover:text-ink lg:ml-6"
          >
            <ChevronRightIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
