"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  ClaspIcon,
  DiamondIcon,
  DropletIcon,
  HelpCircleIcon,
  InspectIcon,
  MinusIcon,
  PlusIcon,
  PolishIcon,
  PouchIcon,
  RefreshArrowsIcon,
  ShieldCheckIcon,
  SparkleIcon,
  SprayIcon,
  SunIcon,
  TruckIcon,
} from "../Icons";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { TopBar } from "../layout/TopBar";

import diamondsImage from "@/app/images/diamonds.png";
import gemstonesImage from "@/app/images/gemstones.png";
import goldPlatinumImage from "@/app/images/goldPlatinum.png";
import howToCleanImage from "@/app/images/howToClean.png";
import jewelleryHeroImage from "@/app/images/jewelleryHero.png";
import lifetimeHeroImage from "@/app/images/lifetimeHero.png";
import pearlsImage from "@/app/images/pearis.png";
import professionalCareImage from "@/app/images/professionalCare.png";
import sterlingSilverImage from "@/app/images/sterlingSilver.png";
import storageImage from "@/app/images/storage.png";

type GuideItem = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

const CARE_GUIDES: GuideItem[] = [
  {
    title: "Gold & Platinum",
    subtitle: "Care Guide",
    image: goldPlatinumImage,
  },
  {
    title: "Sterling Silver",
    subtitle: "Care Guide",
    image: sterlingSilverImage,
  },
  {
    title: "Diamonds",
    subtitle: "Care Guide",
    image: diamondsImage,
  },
  {
    title: "Gemstones",
    subtitle: "Care Guide",
    image: gemstonesImage,
  },
  {
    title: "Pearls",
    subtitle: "Care Guide",
    image: pearlsImage,
  },
];

const EVERYDAY_CARE = [
  {
    title: "Avoid harsh chemicals",
    text: "Keep your jewellery away from household cleaning products, bleach and cosmetics.",
    icon: SprayIcon,
  },
  {
    title: "Remove before water",
    text: "Take off your jewellery before swimming, showering or intense exercise.",
    icon: DropletIcon,
  },
  {
    title: "Avoid hard knocks and heat",
    text: "Protect from impacts and extreme temperatures.",
    icon: SunIcon,
  },
  {
    title: "Check regularly",
    text: "Inspect clasps, prongs and settings to ensure everything is secure.",
    icon: InspectIcon,
  },
];

const CLEANING_STEPS = [
  {
    step: "1",
    title: "Use a soft, lint-free cloth",
    text: "Gently wipe your jewellery after each wear.",
  },
  {
    step: "2",
    title: "Use mild soapy water",
    text: "For most pieces, clean with lukewarm water and a mild, pH-neutral soap.",
  },
  {
    step: "3",
    title: "Rinse and dry",
    text: "Rinse thoroughly and pat dry with a soft cloth.",
  },
  {
    step: "4",
    title: "Special care for sensitive stones",
    text: "Pearls, opals, emeralds and other delicate gemstones may require professional care.",
  },
];

const STORAGE_TIPS = [
  {
    title: "Store separately",
    text: "Use individual pouches or lined compartments to avoid scratches.",
    icon: PouchIcon,
  },
  {
    title: "Keep chains closed",
    text: "Fasten clasps and lay chains flat to prevent tangling.",
    icon: ClaspIcon,
  },
  {
    title: "Use a cool, dry place",
    text: "Avoid humidity and direct sunlight.",
    icon: SunIcon,
  },
];

const PROFESSIONAL_SERVICES = [
  {
    title: "Professional cleaning",
    text: "Restore brilliance and remove buildup.",
    icon: SparkleIcon,
  },
  {
    title: "Inspection",
    text: "Check settings, clasps and overall condition.",
    icon: InspectIcon,
  },
  {
    title: "Polishing & repair",
    text: "Bring back the original shine.",
    icon: PolishIcon,
  },
  {
    title: "Resizing & fit alteration",
    text: "Adjust for the perfect fit (where applicable).",
    icon: DiamondIcon,
  },
];

const WHEN_TO_SEEK_HELP = [
  {
    title: "Loose stones or prongs",
    text: "A stone feels loose or moves in its setting.",
    icon: DiamondIcon,
  },
  {
    title: "Damaged clasps",
    text: "The clasp doesn't close securely or is broken.",
    icon: ClaspIcon,
  },
  {
    title: "Visible scratches or dullness",
    text: "Your piece has lost its shine or shows deep scratches.",
    icon: PolishIcon,
  },
  {
    title: "Any other concern",
    text: "Not sure? Our experts can help.",
    icon: HelpCircleIcon,
  },
];

const FAQS = [
  {
    question: "How often should I clean my jewellery?",
    answer:
      "We recommend a quick, gentle wipe with a soft lint-free cloth after every wear. A deeper cleaning with mild soapy water can be done every 2 to 4 weeks depending on how frequently the piece is worn.",
  },
  {
    question: "Can I use ultrasonic cleaners?",
    answer:
      "Ultrasonic cleaners are safe for plain gold, platinum and robust stones like diamonds. However, they should never be used for pearls, emeralds, opals, tanzanite or treated gemstones as ultrasonic vibrations can cause fractures.",
  },
  {
    question: "How do I care for pearls and other delicate stones?",
    answer:
      "Pearls should always be the last thing you put on and the first thing you take off. Keep them away from perfumes, hairsprays, and moisture. Clean only with a soft damp cloth and never submerge in water.",
  },
  {
    question: "Do you offer professional cleaning and repair services?",
    answer:
      "Yes! We offer complimentary annual inspections, professional ultrasonic and steam cleaning, prong retipping, ring resizing and restorative polishing through our certified master jewelers.",
  },
];

const TRUST_BADGES = [
  {
    title: "Secure Payments",
    subtitle: "Your information is encrypted",
    icon: DiamondIcon,
  },
  {
    title: "Global Delivery",
    subtitle: "To 100+ countries",
    icon: TruckIcon,
  },
  {
    title: "Easy Returns",
    subtitle: "Hassle-free within 30 days",
    icon: RefreshArrowsIcon,
  },
  {
    title: "Authenticity Guaranteed",
    subtitle: "Every piece is verified",
    icon: ShieldCheckIcon,
  },
];

export function JewelleryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 bg-cream-50">
        {/* <div className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[12px] text-muted py-2"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span className="text-muted/60">/</span>
            <span className="font-medium text-ink">Jewellery Care</span>
          </nav>
        </div> */}

        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-cream-200">
          <div className="relative min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]">
            <Image
              src={jewelleryHeroImage}
              alt="Jewellery Care"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[78%_center] sm:object-[70%_center] lg:object-center"
            />
            {/* Gradient wash from left to protect text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/95 via-cream-100/60 to-transparent sm:via-cream-100/45" />

            <div className="relative z-10 mx-auto flex min-h-[300px] max-w-[1440px] items-center px-5 py-8 sm:min-h-[360px] sm:px-8 lg:min-h-[420px] lg:px-10">
              <div className="max-w-[340px] sm:max-w-lg">
                <h1 className="font-serif text-[40px] leading-[0.96] text-ink sm:text-[52px] lg:text-[60px]">
                  Jewellery Care
                </h1>
                <p className="mt-2 font-serif text-[17px] text-ink sm:mt-3 sm:text-[20px] lg:text-[22px]">
                  Care for every piece, for every chapter.
                </p>
                <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft sm:text-[14px]">
                  Timeless beauty deserves proper care. Discover expert advice,
                  practical tips and professional services to keep your
                  jewellery shining today and for years to come.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="#care-services"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-ink px-5 py-2.5 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft"
                  >
                    <span>Book a Care Service</span>
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex cursor-pointer items-center rounded-sm border border-line bg-white/70 px-5 py-2.5 text-[12.5px] font-medium text-ink backdrop-blur-2xs transition-colors hover:bg-cream-100"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Script Text on Right */}
            <p className="pointer-events-none absolute right-[5%] bottom-50 z-10 hidden -rotate-6 font-script text-xl leading-tight text-ink-soft sm:text-2xl lg:block font-bold">
              A
              <br />
              Brighter
              <br />
              Tomorrow
            </p>
          </div>
        </section>

        {/* Main Content Container */}
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {/* Quick Care Guides (5 Cards) */}
          <section aria-label="Care guides by material">
            <div className="flex w-full gap-3 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-3.5 sm:overflow-visible sm:pb-0 sm:pt-0 md:grid-cols-3 xl:grid-cols-5 lg:gap-4">
              {CARE_GUIDES.map((guide) => (
                <div
                  key={guide.title}
                  className="group flex w-[140px] shrink-0 snap-start cursor-pointer flex-col items-center rounded-lg border border-line/70 bg-cream-50  text-center transition-all hover:border-sand-400 hover:bg-cream-100/60 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5 sm:text-left"
                >
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md sm:size-16 md:size-18 xl:size-20">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 640px) 70px, 80px"
                      className="object-cover scale-[1.3] transition-transform duration-300 group-hover:scale-115"
                    />
                  </div>
                  <div className="mt-2.5 min-w-0 flex-1 sm:mt-0">
                    <h3 className="text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-rose-gold-dark sm:text-[14.5px]">
                      {guide.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-muted sm:text-[12px]">
                      {guide.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Row 1: Everyday Care & How to Clean (2 Columns) */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-12">
            {/* Left: Everyday Care */}
            <section aria-label="Everyday care habits">
              <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                Everyday Care
              </h2>
              <p className="mt-1 text-[13.5px] text-muted sm:text-[14px]">
                Simple habits make a big difference.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {EVERYDAY_CARE.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-lg border border-line/70 bg-cream-50/80 p-5 transition-colors hover:border-sand-400 sm:p-6"
                    >
                      <div className="grid size-11 place-items-center rounded-full bg-cream-200/90 text-ink sm:size-12">
                        <Icon width={22} height={22} strokeWidth={1.4} />
                      </div>
                      <h4 className="mt-3.5 text-[15px] font-semibold text-ink sm:text-[16px]">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Right: How to Clean */}
            <section aria-label="How to clean at home">
              <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                How to Clean
              </h2>
              <p className="mt-1 text-[13.5px] text-muted sm:text-[14px]">
                Gentle care at home.
              </p>
              <div className="mt-5 grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_1.3fr]">
                <div className="relative aspect-square w-full overflow-hidden rounded-md border border-line/60 bg-cream-200">
                  <Image
                    src={howToCleanImage}
                    alt="How to clean jewellery"
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  {CLEANING_STEPS.map((step) => (
                    <div key={step.step} className="flex items-start gap-3.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream-200/90 text-[13px] font-bold text-ink sm:size-9 sm:text-[13.5px]">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="text-[14.5px] font-semibold text-ink sm:text-[15.5px]">
                          {step.title}
                        </h4>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Row 2: Storage & Professional Care (2 Columns) */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-12">
            {/* Left: Storage */}
            <section aria-label="Storage tips">
              <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                Storage
              </h2>
              <p className="mt-1 text-[13.5px] text-muted sm:text-[14px]">
                Keep your pieces safe.
              </p>
              <div className="mt-5 grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_1.3fr]">
                <div className="relative aspect-square w-full overflow-hidden rounded-md border border-line/60 bg-cream-200">
                  <Image
                    src={storageImage}
                    alt="Jewellery storage"
                    fill
                    sizes="(max-width: 640px) 100vw, 350px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4.5">
                  {STORAGE_TIPS.map((tip) => {
                    const Icon = tip.icon;
                    return (
                      <div key={tip.title} className="flex items-start gap-3.5">
                        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-cream-200/90 text-ink sm:size-11">
                          <Icon width={20} height={20} strokeWidth={1.4} />
                        </div>
                        <div>
                          <h4 className="text-[14.5px] font-semibold text-ink sm:text-[15.5px]">
                            {tip.title}
                          </h4>
                          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                            {tip.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Right: Professional Care */}
            <section id="care-services" aria-label="Professional care services">
              <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                Professional Care
              </h2>
              <p className="mt-1 text-[13.5px] text-muted sm:text-[14px]">
                Expert service for lasting beauty.
              </p>
              <div className="mt-5 grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_1.3fr]">
                <div className="flex flex-col gap-2.5">
                  <div className="relative aspect-square w-full overflow-hidden rounded-md border border-line/60 bg-cream-200">
                    <Image
                      src={professionalCareImage}
                      alt="Professional Jewellery Care"
                      fill
                      sizes="(max-width: 640px) 100vw, 350px"
                      className="object-cover"
                    />
                  </div>
                  <Link
                    href="#care-services"
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-ink py-2.5 text-center text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft sm:text-[13px]"
                  >
                    <span>Book a Care Service</span>
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                </div>
                <div className="flex flex-col gap-4">
                  {PROFESSIONAL_SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.title}
                        className="flex items-start gap-3.5"
                      >
                        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-cream-200/90 text-ink sm:size-11">
                          <Icon width={20} height={20} strokeWidth={1.4} />
                        </div>
                        <div>
                          <h4 className="text-[14.5px] font-semibold text-ink sm:text-[15.5px]">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                            {service.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Row 3: When to Seek Help & FAQs (2 Columns) */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-12">
            {/* Left: When to Seek Help */}
            <section aria-label="When to seek professional help">
              <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                When to Seek Help
              </h2>
              <p className="mt-1 text-[13.5px] text-muted sm:text-[14px]">
                If you notice any of the following, we recommend professional
                care.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {WHEN_TO_SEEK_HELP.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-lg border border-line/70 bg-cream-50/80 p-5 transition-colors hover:border-sand-400 sm:p-6"
                    >
                      <div className="grid size-11 place-items-center rounded-full bg-cream-200/90 text-ink sm:size-12">
                        <Icon width={22} height={22} strokeWidth={1.4} />
                      </div>
                      <h4 className="mt-3.5 text-[15px] font-semibold text-ink sm:text-[16px]">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Right: FAQs */}
            <section aria-label="Frequently asked questions">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-[24px] text-ink sm:text-[26px]">
                    Frequently Asked Questions
                  </h2>
                </div>
                <Link
                  href="/help"
                  className="flex items-center gap-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink sm:text-[13.5px]"
                >
                  <span>View all</span>
                  <ArrowRightIcon width={13} height={13} />
                </Link>
              </div>
              <div className="mt-5 divide-y divide-line/70 rounded-lg border border-line/60 bg-cream-50/70">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={faq.question} className="px-5 py-4 sm:px-6 sm:py-4.5">
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left transition-colors"
                      >
                        <span className="text-[14.5px] font-semibold text-ink sm:text-[15.5px]">
                          {faq.question}
                        </span>
                        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-cream-200/90 text-ink transition-transform duration-200 sm:size-7.5">
                          {isOpen ? (
                            <MinusIcon width={14} height={14} />
                          ) : (
                            <PlusIcon width={14} height={14} />
                          )}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-2.5"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-[13px] leading-relaxed text-ink-soft sm:text-[13.5px]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Banner: Jewellery for a Lifetime */}
          <section className="relative mt-12 min-h-[145px] overflow-hidden rounded-md border border-line/60 bg-cream-200 sm:mt-16 sm:min-h-[175px]">
            <Image
              src={lifetimeHeroImage}
              alt="Jewellery for a Lifetime"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-[70%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/95 via-cream-100/60 to-transparent sm:via-cream-100/50" />
            <div className="relative z-10 flex min-h-[145px] items-center justify-between px-6 py-5 sm:min-h-[175px] sm:px-10">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-6 lg:gap-8">
                <div>
                  <h2 className="font-serif text-[24px] italic leading-tight text-ink sm:text-[30px] lg:text-[34px]">
                    Jewellery for a Lifetime
                  </h2>
                  <p className="mt-1 text-[12.5px] text-ink-soft sm:text-[13.5px]">
                    With the right care, your story continues.
                  </p>
                </div>
                <Link
                  href="#care-services"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-ink/80 bg-white/35 px-3.5 py-1.5 text-[11.5px] font-medium text-ink backdrop-blur-2xs transition-colors hover:bg-ink hover:text-white sm:px-4 sm:py-2 sm:text-[12px]"
                >
                  <span>Explore Our Services</span>
                  <ArrowRightIcon width={12} height={12} />
                </Link>
              </div>

              {/* Right side script */}
              <p className="pointer-events-none hidden -rotate-6 font-script text-xl leading-tight text-ink-soft sm:text-2xl lg:block">
                Same Beauty
                <br />
                New Chapters
              </p>
            </div>
          </section>

          {/* Trust Bar directly above Footer */}
          <section
            aria-label="Buyer protection and guarantees"
            className="mt-8 py-6 sm:mt-10 sm:py-8 border-t border-line/60"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {TRUST_BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.title}
                    className="flex items-center justify-start gap-3.5 sm:justify-center"
                  >
                    <Icon
                      width={26}
                      height={26}
                      strokeWidth={1.4}
                      className="shrink-0 text-ink sm:size-7"
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-ink sm:text-[14.5px]">
                        {badge.title}
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted sm:text-[12.5px]">
                        {badge.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Existing Footer component preserved as requested */}
      <Footer />
    </>
  );
}
