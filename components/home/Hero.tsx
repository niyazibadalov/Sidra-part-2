"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import heroSecImg from "@/app/images/heroSecImg.jpeg";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleIcon,
} from "../Icons";

type Slide = {
  eyebrow: string[];
  title: [string, string];
  subtitle: [string, string];
  script: string[];
  tone: string;
  image: typeof heroSecImg;
};

const SLIDES: Slide[] = [
  {
    eyebrow: ["People", "Craft", "Impact"],
    title: ["Jewellery", "Brings Us Closer"],
    subtitle: ["Meaningful pieces. Extraordinary", "craftsmanship. A more brilliant tomorrow."],
    script: ["More", "Stories", "Brighter", "Lives"],
    tone: "warm",
    image: heroSecImg,
  },
  {
    eyebrow: ["New", "Collections", "2026"],
    title: ["Timeless Pieces,", "Brighter Tomorrows"],
    subtitle: ["Discover new designs from the world's", "most loved jewellery houses."],
    script: ["Timeless", "Pieces"],
    tone: "sand",
    image: heroSecImg,
  },
  {
    eyebrow: ["Gifts", "Moments", "Memories"],
    title: ["More Than", "A Purchase"],
    subtitle: ["Thoughtful gifts for life's most", "special moments, beautifully wrapped."],
    script: ["Every", "Order Tells", "a New Story"],
    tone: "blush",
    image: heroSecImg,
  },
  {
    eyebrow: ["Brands", "Artisans", "Community"],
    title: ["A Global Community", "of Beauty"],
    subtitle: ["People, culture and craftsmanship.", "Together, we make jewellery live further."],
    script: ["Brighter", "Together"],
    tone: "dusk",
    image: heroSecImg,
  },
];

const STATS = [
  { value: "10K+", label: "Brands" },
  { value: "1M+", label: "Pieces" },
  { value: "100+", label: "Countries" },
];

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[index];

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden bg-cream-200"
    >
      {/* Visual: full background image across all device sizes */}
      <div className="absolute inset-0 h-full w-full">
        <div key={index} className="animate-fade-in absolute inset-0">
          <Image
            src={slide.image}
            alt={slide.title.join(" ")}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-[74%_center] sm:object-[68%_center] md:object-[66%_center] lg:object-[54%_center]"
          />
        </div>
        {/* Soft gradient from left to ensure perfect text readability on mobile and tablet */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-200/95 via-cream-200/70 to-transparent sm:from-cream-200/90 sm:via-cream-200/50 md:from-cream-200/80 md:via-cream-200/30 md:to-transparent lg:hidden" />

        {/* Top-right script text: hidden on mobile (< 768px) per user request */}
        <p
          key={`script-${index}`}
          className="animate-fade-up pointer-events-none absolute top-8 right-6 z-10 hidden font-script text-2xl leading-[1.15] text-white drop-shadow-sm sm:top-10 sm:right-8 md:top-8 md:right-8 md:block md:text-[24px] lg:top-12 lg:right-12 xl:right-16 lg:text-[32px]"
          aria-hidden
        >
          {slide.script.map((line, i) => (
            <span key={line} className="block" style={{ paddingLeft: `${i * 0.6}rem` }}>
              {line}
            </span>
          ))}
          <svg viewBox="0 0 90 20" className="mt-1 ml-6 w-20" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M2 16C25 14 55 10 86 3M86 3l-9 1M86 3l-4 8" strokeLinecap="round" />
          </svg>
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div
          key={`text-${index}`}
          className="flex min-h-[530px] max-w-[280px] flex-col justify-center py-10 sm:min-h-[560px] sm:max-w-[340px] md:min-h-[500px] md:max-w-[390px] md:py-10 lg:min-h-[560px] lg:max-w-[520px] lg:py-16 xl:min-h-[600px]"
        >
          <p className="animate-fade-up flex gap-3 text-[10px] font-medium tracking-[0.22em] text-ink-soft uppercase sm:gap-4 md:text-[10px] lg:text-[10.5px]">
            {slide.eyebrow.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </p>

          <h1
            className="animate-fade-up mt-3 font-serif text-[32px] leading-[1.04] text-ink sm:text-[38px] md:mt-3.5 md:text-[38px] md:leading-[1.04] lg:mt-4 lg:text-[58px] lg:leading-[1.02] xl:text-[70px]"
            style={{ animationDelay: "80ms" }}
          >
            {slide.title[0]}
            <br />
            {slide.title[1]}
          </h1>

          <p
            className="animate-fade-up mt-3 max-w-[260px] text-[13px] leading-relaxed text-ink-soft sm:max-w-[320px] sm:text-[13.5px] md:mt-3.5 md:max-w-[360px] md:text-[13.5px] lg:mt-5 lg:max-w-sm lg:text-[15px]"
            style={{ animationDelay: "160ms" }}
          >
            {slide.subtitle[0]} <br className="hidden sm:block md:hidden lg:block" />
            {slide.subtitle[1]}
          </p>

          <div
            className="animate-fade-up mt-5 flex flex-wrap gap-2 sm:gap-2.5 md:mt-5 md:gap-3 lg:mt-7"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/jewellery"
              className="group inline-flex h-9.5 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-4 text-[11.5px] font-medium text-white transition-colors hover:bg-ink-soft sm:h-10 sm:px-4.5 sm:text-[12px] md:h-10 md:px-5 md:text-[12.5px] lg:h-12 lg:px-6 lg:text-[13px]"
            >
              Shop Jewellery
              <ArrowRightIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/stories"
              className="inline-flex h-9.5 cursor-pointer items-center gap-1.5 rounded-full border border-ink/70 px-4 text-[11.5px] font-medium text-ink transition-colors hover:bg-ink hover:text-white sm:h-10 sm:px-4.5 sm:text-[12px] md:h-10 md:px-5 md:text-[12.5px] lg:h-12 lg:px-6 lg:text-[13px]"
            >
              Watch Our Story
              <PlayCircleIcon width={16} height={16} />
            </Link>
          </div>

          <dl
            className="animate-fade-up mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7 md:mt-7 md:gap-x-6 lg:mt-10 lg:gap-x-8 lg:gap-y-4"
            style={{ animationDelay: "320ms" }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 text-[10.5px] text-muted md:text-[10px] lg:text-[11px]">{s.label}</dt>
                <dd className="order-1 text-base font-semibold text-ink md:text-base lg:text-lg">{s.value}</dd>
              </div>
            ))}
            <div className="hidden h-8 w-px bg-sand-400 sm:block md:h-7 lg:h-9" aria-hidden />
            <div className="hidden text-[10.5px] leading-snug text-muted sm:block md:text-[10px] lg:text-[11px]">
              A More
              <br />
              Beautiful Tomorrow
            </div>
          </dl>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-1 rounded-full bg-ink/25 px-1.5 py-1 text-white backdrop-blur-md sm:right-6 sm:bottom-6 md:right-8 lg:right-10 lg:bottom-8">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="grid size-7 cursor-pointer place-items-center rounded-full hover:bg-white/20"
        >
          <ChevronLeftIcon width={16} height={16} />
        </button>
        <span className="min-w-8 text-center text-xs tabular-nums" aria-live="polite">
          {index + 1}/{SLIDES.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="grid size-7 cursor-pointer place-items-center rounded-full hover:bg-white/20"
        >
          <ChevronRightIcon width={16} height={16} />
        </button>
      </div>
    </section>
  );
}
