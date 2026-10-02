import Image from "next/image";
import Link from "next/link";
import bannerImg from "@/app/images/banner1.png";
import {
  ArrowRightIcon,
  CommunityIcon,
  DiamondIcon,
  GlobeIcon,
  LeafIcon,
} from "../Icons";

const PILLARS = [
  {
    icon: DiamondIcon,
    line1: "Supporting",
    line2: "Artisans",
  },
  {
    icon: LeafIcon,
    line1: "Sustainable",
    line2: "Sourcing",
  },
  {
    icon: CommunityIcon,
    line1: "Stronger",
    line2: "Communities",
  },
  {
    icon: GlobeIcon,
    line1: "Lasting",
    line2: "Impact",
  },
];

export function ImpactBanner() {
  return (
    <section
      aria-label="Social impact and sustainability"
      className="relative m-0 w-full overflow-hidden border-y border-line/60 bg-cream-100 p-0"
    >
      {/* Background image: banner.png stretching edge-to-edge */}
      <Image
        src={bannerImg}
        alt="Sustainability and ethical craft"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Subtle gradient to ensure text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r via-cream-100/50 to-cream-100/80" />

      {/* Content row - edge-to-edge full width */}
      <div className="relative z-10 flex min-h-[175px] w-full flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 sm:py-9 lg:min-h-[190px] lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:py-4 xl:px-12">
        {/* Left: Heading and Mission Statement. Hidden on mobile/tablet (< 1024px), shown on desktop */}
        <div className="hidden max-w-md text-center lg:block lg:text-left min-[1680px]:ml-[22vw] min-[1400px]:max-w-[390px]">
          <h3 className="font-serif text-2xl leading-tight text-ink sm:text-3xl lg:text-[30px]">
            More Than Jewellery
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft sm:text-[14.5px] lg:text-[13px]">
            We believe in a more inclusive, sustainable and brighter future for generations to come.
          </p>
        </div>

        {/* Center: 4 Pillars in a clean horizontal row */}
        <div className="flex shrink-0 items-center justify-center gap-3 sm:gap-7 lg:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.line1}
                className="flex flex-col items-center text-center"
              >
                <div className="grid size-11 place-items-center rounded-full border border-line bg-cream-50/90 text-ink shadow-2xs sm:size-12">
                  <Icon width={20} height={20} strokeWidth={1.4} />
                </div>
                <span className="mt-2 text-[10.5px] font-medium leading-tight text-ink-soft sm:text-[12px]">
                  {pillar.line1}
                  <br />
                  {pillar.line2}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: CTA Button (hidden on < 1024px) + Brighter Together + SIDRA Logo */}
        <div className="flex shrink-0 flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/impact"
            className="group hidden items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-ink-soft lg:inline-flex"
          >
            <span>Our Impact</span>
            <ArrowRightIcon
              width={14}
              height={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <div className="hidden h-12 w-px bg-sand-400/60 lg:block" aria-hidden="true" />

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-script text-2xl -rotate-6 text-ink sm:text-[28px]">
              Brighter
              <br />
              Together
            </span>

            <div className="h-8 w-px bg-sand-400/50" aria-hidden="true" />

            <div className="flex flex-col text-center">
              <span className="font-serif text-lg  tracking-[0.25em] text-ink sm:text-xl">
                SIDRA
              </span>
              <span className="text-[7.5px] font-medium tracking-[0.22em] text-muted uppercase sm:text-[8px]">
                Jewellery Lives Further
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
