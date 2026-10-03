"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  DiamondIcon,
  GiftBoxIcon,
  HeartCircleIcon,
  HeartIcon,
  InsuredDeliveryIcon,
  RefreshArrowsIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "../Icons";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";
import { TopBar } from "../layout/TopBar";

import anniversaryImage from "@/app/images/anniversary .png";
import birthdayImage from "@/app/images/birthday.png";
import boldImage from "@/app/images/bold.png";
import celebrationImage from "@/app/images/celebration.png";
import forHerImage from "@/app/images/for-her.png";
import forHimImage from "@/app/images/for-him.png";
import forSomeoneImage from "@/app/images/for-someone.png";
import giftBannerImage from "@/app/images/giftBanner.png";
import giftBanner2Image from "@/app/images/giftBanner2.png";
import graduationImage from "@/app/images/graduation.png";
import img1 from "@/app/images/img1.png";
import img2 from "@/app/images/img2.png";
import img3 from "@/app/images/img3.png";
import img4 from "@/app/images/img4.png";
import img5 from "@/app/images/img5.png";
import img6 from "@/app/images/img6.png";
import justBecauseImage from "@/app/images/justBecause.png";
import minimalImage from "@/app/images/minimal.png";
import romanticImage from "@/app/images/romantic.png";
import timelessImage from "@/app/images/timeless.png";
import weddingImage from "@/app/images/wedding.png";

type GiftImage = { label: string; image: StaticImageData };

const OCCASIONS: GiftImage[] = [
  { label: "Birthday", image: birthdayImage },
  { label: "Anniversary", image: anniversaryImage },
  { label: "Wedding", image: weddingImage },
  { label: "Graduation", image: graduationImage },
  { label: "Celebration", image: celebrationImage },
  { label: "Just Because", image: justBecauseImage },
];

const RECIPIENTS: GiftImage[] = [
  { label: "For Her", image: forHerImage },
  { label: "For Him", image: forHimImage },
  { label: "For Someone Special", image: forSomeoneImage },
];

const STYLES: GiftImage[] = [
  { label: "Romantic", image: romanticImage },
  { label: "Timeless", image: timelessImage },
  { label: "Minimal", image: minimalImage },
  { label: "Bold", image: boldImage },
];

const BUDGETS = [
  "Under €500",
  "€500 – €1,000",
  "€1,000 – €2,500",
  "Exceptional Gifts",
];

const PRODUCTS = [
  {
    id: "solitaire-ring",
    brand: "Maison Éclat",
    name: "Solitaire Diamond Ring",
    material: "18K Gold · 0.50 ct",
    price: "€2,450",
    badge: "Bestseller",
    image: img1,
  },
  {
    id: "heart-necklace",
    brand: "Veluna",
    name: "Heart Necklace",
    material: "18K Gold",
    price: "€1,820",
    image: img2,
  },
  {
    id: "tennis-bracelet",
    brand: "Atelier Noor",
    name: "Tennis Bracelet",
    material: "18K Gold",
    price: "€3,200",
    badge: "New",
    image: img4,
  },
  {
    id: "pearl-earrings",
    brand: "Lumea",
    name: "Pearl Drop Earrings",
    material: "18K Gold",
    price: "€1,980",
    image: img3,
  },
  {
    id: "eternity-ring",
    brand: "Maison Éclat",
    name: "Eternity Ring",
    material: "18K Gold",
    price: "€2,750",
    image: img6,
  },
  {
    id: "signature-pendant",
    brand: "Atelier Noor",
    name: "Signature Pendant",
    material: "18K Gold",
    price: "€2,150",
    image: img5,
  },
];

const SERVICES = [
  {
    title: "Luxury Gift Packaging",
    text: "Beautifully wrapped",
    icon: GiftBoxIcon,
  },
  {
    title: "Personalised Message",
    text: "Add a special note",
    icon: ScissorsIcon,
  },
  {
    title: "Insured Delivery",
    text: "For peace of mind",
    icon: InsuredDeliveryIcon,
  },
  {
    title: "Easy Returns",
    text: "Hassle-free within 30 days",
    icon: HeartCircleIcon,
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

function ImageChoices({
  items,
  className = "",
  imageClassName = "object-cover",
}: {
  items: GiftImage[];
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`grid gap-3.5 sm:gap-4 ${className}`}>
      {items.map((item) => (
        <Link
          key={item.label}
          href={`/gifts?selection=${encodeURIComponent(item.label.toLowerCase())}`}
          className="group cursor-pointer text-center"
        >
          <div className="relative aspect-[1.45] overflow-hidden rounded-md border border-line/50 bg-cream-200">
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 45vw, 16vw"
              className={`${imageClassName} transition-transform duration-500 group-hover:scale-105`}
            />
          </div>
          <span className="mt-2 block text-[13px] font-medium text-ink transition-colors group-hover:text-rose-gold-dark sm:text-[13.5px]">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

function ProductCard({
  product,
  liked,
  onToggle,
}: {
  product: (typeof PRODUCTS)[number];
  liked: boolean;
  onToggle: () => void;
}) {
  return (
    <article className="group min-w-0 rounded-md border border-line/70 bg-cream-50 transition-all hover:border-sand-400/80 hover:shadow-xs">
      <div className="relative aspect-[1.3] overflow-hidden rounded-t-md bg-[#efe4d9]">
        {product.badge && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-cream-50/95 px-2 py-0.5 text-[8.5px] font-medium tracking-wide text-rose-gold-dark shadow-2xs">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 grid size-6.5 cursor-pointer place-items-center rounded-full bg-cream-50/90 text-ink transition-colors hover:text-rose-gold"
        >
          <HeartIcon
            width={13}
            height={13}
            className={liked ? "fill-rose-gold text-rose-gold" : ""}
          />
        </button>
        <Link href={`/product/${product.id}`} className="absolute inset-0 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, 16vw"
            className="translate-y-1 scale-[1.08] object-contain p-1 transition-transform duration-500 group-hover:scale-[1.14]"
          />
        </Link>
      </div>
      <div className="p-2 sm:p-2.5">
        <span className="block text-[11px] text-muted leading-tight">{product.brand}</span>
        <Link href={`/product/${product.id}`} className="mt-0.5 block cursor-pointer">
          <h3 className="truncate text-[12.5px] font-medium text-ink transition-colors group-hover:text-rose-gold-dark sm:text-[13px]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 truncate text-[11px] text-muted">{product.material}</p>
        <p className="mt-1.5 text-[13.5px] font-semibold text-ink sm:text-[14px]">
          {product.price}
        </p>
      </div>
    </article>
  );
}

export function GiftsPage() {
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-1 bg-cream-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-cream-200">
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[390px]">
            <Image
              src={giftBannerImage}
              alt="The art of gifting"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/95 via-cream-100/55 to-transparent" />
            <div className="relative z-10 mx-auto flex min-h-[280px] max-w-[1440px] items-center px-5 py-8 sm:min-h-[340px] sm:px-8 lg:min-h-[390px] lg:px-10">
              <div className="max-w-[320px] sm:max-w-md">
                <p className="text-[10px] font-semibold tracking-[0.25em] text-ink-soft uppercase sm:text-[11px]">
                  Gifts
                </p>
                <h1 className="mt-2 font-serif text-[40px] leading-[0.94] text-ink sm:text-[50px] lg:text-[60px]">
                  The Art
                  <br />
                  of Gifting
                </h1>
                <p className="mt-3.5 max-w-[280px] text-[13px] leading-relaxed text-ink-soft sm:max-w-sm sm:text-[14px]">
                  Meaningful pieces for life&apos;s most beautiful moments.
                </p>
                <Link
                  href="#gift-guide"
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[12.5px] font-medium text-white transition-colors hover:bg-ink-soft sm:px-6 sm:py-3 sm:text-[13px]"
                >
                  <span>Shop Gifts</span>
                  <ArrowRightIcon width={13} height={13} />
                </Link>
              </div>
            </div>
            <p className="pointer-events-none absolute right-[5%] bottom-8 z-10 hidden -rotate-6 font-script text-xl leading-tight text-ink-soft drop-shadow-xs sm:text-2xl lg:block">
              More
              <br />
              Than a Gift
              <br />
              A Lasting Story
            </p>
          </div>
        </section>

        {/* Gift Guide Content */}
        <div id="gift-guide" className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {/* Shop by Occasion */}
          <section className="mt-2 mb-12 sm:mt-4 sm:mb-14">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
                Shop by Occasion
              </h2>
              <Link
                href="/gifts?view=all-occasions"
                className="flex cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink sm:text-[13px]"
              >
                <span>View all</span>
                <ArrowRightIcon width={13} height={13} />
              </Link>
            </div>
            <div id="occasion">
              <ImageChoices
                items={OCCASIONS}
                className="grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
              />
            </div>
          </section>

          {/* Shop by Recipient & Shop by Style */}
          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_1.32fr] lg:gap-10">
            <section>
              <h2 className="mb-4 font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
                Shop by Recipient
              </h2>
              <ImageChoices items={RECIPIENTS} className="grid-cols-3" />
            </section>
            <section>
              <h2 className="mb-4 font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
                Shop by Style
              </h2>
              <ImageChoices
                items={STYLES}
                className="grid-cols-4"
                imageClassName="object-cover"
              />
            </section>
          </div>

          {/* Shop by Budget */}
          <section className="mt-12 mb-14 sm:mt-14 sm:mb-16">
            <h2 className="mb-4 font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
              Shop by Budget
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {BUDGETS.map((budget) => (
                <Link
                  key={budget}
                  href={`/gifts?budget=${encodeURIComponent(budget)}`}
                  className="cursor-pointer rounded-xl border border-line/60 bg-cream-200/70 px-4 py-3.5 text-center text-[13px] font-medium text-ink transition-colors hover:border-sand-400 hover:bg-cream-200 sm:text-[13.5px]"
                >
                  {budget}
                </Link>
              ))}
            </div>
          </section>

          {/* Most Gifted */}
          <section className="mt-12 mb-14 sm:mt-14 sm:mb-16">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
                Most Gifted
              </h2>
              <Link
                href="/featured"
                className="flex cursor-pointer items-center gap-1.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink sm:text-[13px]"
              >
                <span>View all</span>
                <ArrowRightIcon width={13} height={13} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  liked={!!wishlist[product.id]}
                  onToggle={() =>
                    setWishlist((current) => ({
                      ...current,
                      [product.id]: !current[product.id],
                    }))
                  }
                />
              ))}
            </div>
          </section>

          {/* Meaningful Milestones Banner */}
          <section className="relative mt-8 min-h-[145px] overflow-hidden rounded-md border border-line/60 bg-cream-200 sm:min-h-[175px]">
            <Image
              src={giftBanner2Image}
              alt="Meaningful milestones"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-[70%_center] sm:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/95 via-cream-100/60 to-transparent sm:via-cream-100/50" />
            <div className="relative z-10 flex min-h-[145px] items-center justify-start px-6 py-5 sm:min-h-[175px] sm:px-10">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:gap-6 lg:gap-8">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-ink-soft uppercase sm:text-[11px]">
                    Gifts for every chapter
                  </p>
                  <h2 className="mt-1 font-serif text-[24px] leading-tight text-ink sm:text-[30px] lg:text-[34px]">
                    Meaningful Milestones
                  </h2>
                  <p className="mt-1 text-[12.5px] text-ink-soft sm:text-[13.5px]">
                    Celebrate today. Create tomorrow&apos;s heirlooms.
                  </p>
                </div>
                <Link
                  href="/collections"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-sm border border-ink/80 px-3.5 py-1.5 text-[11.5px] font-medium text-ink backdrop-blur-2xs transition-colors hover:bg-ink hover:text-white sm:px-4 sm:py-2 sm:text-[12px]"
                >
                  <span>Explore the Gift Guide</span>
                  <ArrowRightIcon width={12} height={12} />
                </Link>
              </div>
            </div>
          </section>

          {/* Gift Services */}
          <section className="mt-12 mb-8 sm:mt-14 sm:mb-10">
            <h2 className="mb-5 font-serif text-xl text-ink sm:text-[23px] lg:text-[25px]">
              Gift Services
            </h2>
            <div className="grid grid-cols-1 gap-5 border-b border-line/60 pb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="flex items-center gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-line/70 bg-cream-100 text-ink shadow-2xs">
                      <Icon width={20} height={20} strokeWidth={1.4} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-medium text-ink sm:text-[13.5px]">
                        {service.title}
                      </h4>
                      <p className="mt-0.5 text-[11.5px] text-muted">
                        {service.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Trust Bar directly above Footer */}
          <section
            aria-label="Buyer protection and guarantees"
            className="py-4 sm:py-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {TRUST_BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.title}
                    className="flex items-center justify-start gap-3 ps-2"
                  >
                    <Icon
                      width={22}
                      height={22}
                      strokeWidth={1.4}
                      className="shrink-0 text-ink"
                    />
                    <div>
                      <p className="text-[12.5px] font-semibold text-ink sm:text-[13px]">
                        {badge.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted">
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
      {/* Existing user-configured Footer component preserved exactly as requested */}
      <Footer />
    </>
  );
}
