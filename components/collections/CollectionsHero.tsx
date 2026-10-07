"use client";

import Image from "next/image";
import heroSecImg from "@/app/images/heroSecImg.jpeg";
import { HERO_PILLS } from "./data";

type CollectionsHeroProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
};

export function CollectionsHero({
  selectedCategory,
  onSelectCategory,
}: CollectionsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cream-200 border-b border-line/60">
      {/* Background Image: stacked rings photo */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={heroSecImg}
          alt="Sidra Rings Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-[60%_center]"
        />
        {/* Soft radial & linear gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100/95 via-cream-100/80 to-transparent sm:from-cream-100/90 sm:via-cream-100/60 sm:to-transparent lg:from-cream-100/85 lg:via-cream-100/40 lg:to-transparent" />
      </div>

      {/* Script handwritten text on top-right */}
      <p
        className="pointer-events-none absolute top-6 right-6 z-10 hidden font-script text-2xl leading-tight text-white drop-shadow-sm md:block lg:top-8 lg:right-12 lg:text-[30px]"
        aria-hidden
      >
        More
        <br />
        <span className="pl-3">Stories</span>
        <br />
        <span className="pl-6">Brighter</span>
        <br />
        <span className="pl-9">Lives</span>
      </p>

      {/* Container */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        {/* Title and description */}
        <div className="max-w-[540px]">
          <h1 className="font-serif text-4xl tracking-tight text-ink sm:text-5xl lg:text-[56px] leading-[1.05]">
            Rings
          </h1>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft sm:text-[14.5px]">
            Symbols of love, style and every beautiful tomorrow. Discover rings for every moment and every story.
          </p>
        </div>

        {/* 4 Ring Category Pills - visible on tablet and desktop, moved below hero on mobile */}
        <div className="mt-6 hidden flex-wrap items-center gap-2.5 sm:gap-3 md:flex">
          {HERO_PILLS.map((pill) => {
            const isActive =
              (pill.category && selectedCategory === pill.category) ||
              (pill.name === "Diamond" && selectedCategory === "Diamond");

            return (
              <button
                key={pill.name}
                type="button"
                onClick={() => {
                  if (pill.category) {
                    onSelectCategory(pill.category);
                  } else if (pill.name === "Diamond") {
                    onSelectCategory("Diamond");
                  }
                }}
                className={`group flex cursor-pointer items-center gap-2.5 rounded-full border px-3 py-1.5 transition-all sm:px-3.5 sm:py-2 ${
                  isActive
                    ? "border-ink bg-ink text-white shadow-sm"
                    : "border-line/80 bg-white/80 text-ink backdrop-blur-xs hover:border-sand-400 hover:bg-white"
                }`}
              >
                <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-cream-100 p-0.5 sm:size-8">
                  <Image
                    src={pill.image}
                    alt={pill.name}
                    fill
                    sizes="32px"
                    className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="text-[12.5px] font-medium tracking-tight sm:text-[13px]">
                  {pill.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
