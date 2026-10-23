"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BagIcon,
  HeartIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChevronDownIcon,
  RefreshArrowsIcon,
  DiamondIcon,
  LeafIcon,
  CheckIcon,
  InfoIcon,
  CloseIcon,
} from "@/components/Icons";
import { useCartWishlist, ProductItem } from "@/context/CartWishlistContext";

import bagFullHeroImg from "@/app/images/bagFullHero.png";
import bagHeroImg from "@/app/images/bagHero.png";
import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";
import ring4 from "@/app/images/ring4.png";
import ring5 from "@/app/images/ring5.png";
import ring6 from "@/app/images/ring6.png";
import diamondsImg from "@/app/images/diamonds.png";
import gemstonesImg from "@/app/images/gemstones.png";
import goldPlatinumImg from "@/app/images/goldPlatinum.png";

// 4 items for "You May Also Like" (matching Screenshot 1)
const YOU_MAY_ALSO_LIKE_PRODUCTS: ProductItem[] = [
  {
    id: "rec-marquise",
    name: "Marquise Diamond Ring",
    price: 1680,
    specs: "18K Gold • Diamond",
    image: ring2,
    category: "Rings",
  },
  {
    id: "rec-tennis",
    name: "Tennis Bracelet",
    price: 2900,
    specs: "18K Gold • Diamond",
    image: goldPlatinumImg,
    category: "Bracelets",
  },
  {
    id: "rec-peardrop",
    name: "Pear Drop Earrings",
    price: 1760,
    specs: "18K Gold • Diamond",
    image: diamondsImg,
    category: "Earrings",
  },
  {
    id: "rec-heart",
    name: "Heart Pendant",
    price: 1320,
    specs: "18K Gold • Diamond",
    image: ring5,
    category: "Necklaces",
  },
];

// 4 items for "Recently Viewed" (matching Screenshot 1)
const RECENTLY_VIEWED_PRODUCTS: ProductItem[] = [
  {
    id: "rv-emerald",
    name: "Emerald Cut Ring",
    price: 2980,
    specs: "18K Gold • Diamond",
    image: ring3,
    category: "Rings",
  },
  {
    id: "rv-aurelia",
    name: "Aurélia Earrings",
    price: 980,
    specs: "18K Gold",
    image: ring4,
    category: "Earrings",
  },
  {
    id: "rv-serenity",
    name: "Serenity Necklace",
    price: 1450,
    specs: "18K Gold • Diamond",
    image: gemstonesImg,
    category: "Necklaces",
  },
  {
    id: "rv-threestone",
    name: "Three Stone Ring",
    price: 2450,
    specs: "18K Gold • Diamond",
    image: ring6,
    category: "Rings",
  },
];

// 5 Trust Badges right above Footer
const TRUST_PERKS = [
  {
    icon: ShieldCheckIcon,
    title: "Authenticity Guaranteed",
    subtitle: "Every piece is verified",
  },
  {
    icon: TruckIcon,
    title: "Global Delivery",
    subtitle: "To 100+ countries",
  },
  {
    icon: RefreshArrowsIcon,
    title: "Easy Returns",
    subtitle: "Hassle-free within 30 days",
  },
  {
    icon: CreditCardIcon,
    title: "Secure Payments",
    subtitle: "Multiple options",
  },
  {
    icon: LeafIcon,
    title: "A More Sustainable Future",
    subtitle: "For generations to come",
  },
];

function setupSmoothDrag(el: HTMLDivElement, hasDraggedRef: React.MutableRefObject<boolean>) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let velX = 0;
  let lastX = 0;
  let momentumID: number;

  const onMouseDown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    isDown = true;
    hasDraggedRef.current = false;
    cancelAnimationFrame(momentumID);
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
    lastX = e.pageX;
    velX = 0;
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDown) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    el.scrollLeft = scrollLeft - walk;
    velX = e.pageX - lastX;
    lastX = e.pageX;
  };

  const onMouseUp = () => {
    if (!isDown) return;
    isDown = false;
    el.style.cursor = "grab";

    const momentumLoop = () => {
      if (Math.abs(velX) > 0.5) {
        el.scrollLeft -= velX * 1.2;
        velX *= 0.94;
        momentumID = requestAnimationFrame(momentumLoop);
      }
    };
    momentumID = requestAnimationFrame(momentumLoop);
  };

  el.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  return () => {
    cancelAnimationFrame(momentumID);
    el.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };
}

export function BagPage() {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    cartCount,
    moveToWishlist,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCartWishlist();

  const youMayAlsoLikeRef = useRef<HTMLDivElement>(null);
  const recentlyViewedRef = useRef<HTMLDivElement>(null);
  const hasDraggedLikeRef = useRef(false);
  const hasDraggedRecentRef = useRef(false);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    if (youMayAlsoLikeRef.current) {
      cleanups.push(setupSmoothDrag(youMayAlsoLikeRef.current, hasDraggedLikeRef));
    }
    if (recentlyViewedRef.current) {
      cleanups.push(setupSmoothDrag(recentlyViewedRef.current, hasDraggedRecentRef));
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  // Subtotal calculation
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Estimated tax (calculated as ~8% matching Screenshot 1: $3,910 subtotal -> $312 tax)
  const estimatedTax = cart.length > 0 ? Math.round(subtotal * 0.08) : 0;
  const deliveryFee = 0; // Free delivery
  const total = Math.max(0, subtotal + estimatedTax + deliveryFee - promoDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (promoCode.trim().toUpperCase() === "SIDRA10" || promoCode.trim().toUpperCase() === "SAVE") {
      const discountVal = Math.round(subtotal * 0.1);
      setPromoDiscount(discountVal);
      setPromoMessage(`Coupon applied! Saved $${discountVal.toLocaleString()}`);
    } else {
      setPromoDiscount(0);
      setPromoMessage("Invalid promo code. Try 'SIDRA10'");
    }
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-cream-50">
        {cart.length === 0 ? (
          /* ============================================================ */
          /* 1. EMPTY SHOPPING BAG STATE (Screenshot 2)                    */
          /* ============================================================ */
          <section className="relative w-full border-b border-line/60">
            <div className="relative min-h-[460px] sm:min-h-[520px] w-full flex items-center justify-center py-16 px-6">
              <Image
                src={bagHeroImg}
                alt="Shopping Bag background"
                fill
                priority
                className="object-cover object-center opacity-85"
              />
              <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />

              {/* Centered Content Card */}
              <div className="relative z-10 mx-auto max-w-xl text-center flex flex-col items-center">
                <div className="mb-4 grid size-16 place-items-center rounded-full border border-line/80 bg-white/90 text-ink shadow-sm">
                  <BagIcon width={32} height={32} className="stroke-[1.25]" />
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink">
                  Your bag is empty
                </h1>
                <p className="mt-3.5 text-[13.5px] sm:text-[14.5px] leading-relaxed text-ink-soft max-w-md">
                  Discover timeless jewellery pieces and add your favourites to your
                  bag.
                </p>
                <Link
                  href="/category"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 text-[13.5px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                >
                  <span>Continue Shopping</span>
                  <ArrowRightIcon width={14} height={14} />
                </Link>

                <Link
                  href="/wishlist"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink underline hover:text-rose-gold-dark transition-colors cursor-pointer"
                >
                  <span>View Wishlist</span>
                  <HeartIcon width={14} height={14} />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* ============================================================ */
          /* 2. FILLED SHOPPING BAG STATE (Desktop - 1440px Screenshot 1)  */
          /* ============================================================ */
          <>
            {/* Hero Section Banner */}
            <section className="relative w-full border-b border-line/60 bg-cream-200">
              <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[280px]">
                <Image
                  src={bagFullHeroImg}
                  alt="Shopping Bag Banner"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-right sm:object-center opacity-95"
                />
                {/* Gradient wash from left to protect text legibility, plus enhanced soft overlay on <= 500px */}
                <div className="absolute inset-0 bg-gradient-to-r from-cream-100/20 to-transparent max-[500px]:bg-cream-50/25 max-[500px]:backdrop-blur-[1px]" />

                {/* Content Container aligned with main content */}
                <div className="relative z-10 mx-auto flex min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] max-w-[1440px] items-center justify-between px-5 py-8 sm:px-8 lg:px-10">
                  <div className="max-w-xl">
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-tight text-ink">
                      Shopping Bag
                    </h1>
                    <p className="mt-2 text-[14px] sm:text-[15px] font-semibold text-ink">
                      {cartCount} item{cartCount === 1 ? "" : "s"} in your bag
                    </p>
                    <p className="mt-1.5 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed max-w-md">
                      Extraordinary pieces. A more meaningful tomorrow.
                    </p>
                  </div>

                  {/* Right side callout phrase from Screenshot 1 */}
                  <div className="hidden lg:block select-none pr-4 text-right">
                    <p className="font-script text-2xl lg:text-3xl text-ink-soft/90 -rotate-3 font-semibold leading-snug">
                      More Than<br />A Purchase
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Shopping Bag Layout */}
            <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 sm:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* ====================================================== */}
                {/* LEFT COLUMN: Cart Items List (col-span-8)               */}
                {/* ====================================================== */}
                <div className="lg:col-span-8 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="relative rounded-2xl border border-line/70 bg-white p-3.5 sm:p-5 transition-shadow hover:shadow-2xs"
                    >
                      {/* Main Item Row: Left Image, Right Details */}
                      <div className="flex items-start gap-3.5 sm:gap-4 md:gap-6">
                        {/* Product Image Thumbnail */}
                        <div className="relative size-28 min-[380px]:size-32 sm:size-36 md:size-38 lg:size-40 shrink-0 self-start rounded-xl bg-[#fbf9f6] border border-line/40 p-2 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 140px, 180px"
                            className="object-contain"
                          />
                          {/* "Ready to ship" badge if present */}
                          {(item.stockText === "Ready to ship" || item.id === "cart-1") && (
                            <span className="absolute bottom-1.5 left-1.5 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[9.5px] sm:text-[10px] font-medium text-emerald-800 shadow-2xs">
                              Ready to ship
                            </span>
                          )}
                        </div>

                        {/* Product Info & Specifications */}
                        <div className="flex-1 min-w-0">
                          {/* Top Header Row: Brand and Mobile Close/Remove 'x' button */}
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-[11px] sm:text-[11.5px] font-medium text-ink-muted">
                              {item.brand || "Maison Éclat"}
                            </p>

                            {/* Top-Right 'x' Quick Remove Button (Mobile only) */}
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                              className="md:hidden text-ink-soft hover:text-ink transition-colors p-0.5 cursor-pointer -mt-0.5 -mr-0.5"
                            >
                              <CloseIcon width={14} height={14} className="stroke-[1.75]" />
                            </button>
                          </div>

                          {/* Product Name */}
                          <h3 className="font-serif text-[15px] sm:text-[17px] md:text-[18px] font-normal sm:font-medium text-ink mt-0.5 leading-snug">
                            <Link
                              href={`/category/${item.id}`}
                              className="hover:text-rose-gold-dark transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                          </h3>

                          {/* Metal / Stone specs */}
                          <p className="text-[11.5px] sm:text-[12.5px] text-ink-soft mt-0.5 sm:mt-1">
                            {item.specs || item.metal || "18K Gold • Diamond"}
                          </p>

                          {/* Size / Length selector */}
                          <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-[11.5px] sm:text-[12px] text-ink-soft">
                            <span>{item.category === "Necklaces" ? "Length:" : "Size:"}</span>
                            <div className="inline-flex items-center gap-1 text-[11.5px] sm:text-[12px] font-medium text-ink cursor-pointer hover:text-rose-gold-dark transition-colors">
                              <span>{item.selectedSize || (item.category === "Necklaces" ? "42 cm" : "7")}</span>
                              <ChevronDownIcon width={11} height={11} className="text-ink-soft" />
                            </div>
                          </div>

                          {/* Delivery info row (hidden on phone, visible from sm+) */}
                          <div className="hidden sm:flex mt-2.5 items-center gap-2 text-[11.5px] sm:text-[12px] text-ink-soft">
                            <TruckIcon width={14} height={14} className="text-ink-soft shrink-0" />
                            <span>
                              Get it between <strong className="font-semibold text-ink">25 - 28 Apr</strong>
                              <span className="hidden min-[480px]:inline text-ink-muted ml-1.5">• Express delivery available</span>
                            </span>
                          </div>

                          {/* Action Links: Edit, Move to Wishlist, Remove (Shown on md+ tablet & desktop) */}
                          <div className="hidden md:flex mt-4 items-center gap-4 text-[12px] font-medium text-ink-soft border-t border-line/40 pt-3">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              <PencilIcon width={13} height={13} />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => moveToWishlist(item)}
                              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-rose-gold-dark transition-colors cursor-pointer"
                            >
                              <HeartIcon width={13} height={13} />
                              <span>Move to Wishlist</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-[#b74134] transition-colors cursor-pointer"
                            >
                              <TrashIcon width={13} height={13} />
                              <span>Remove</span>
                            </button>
                          </div>

                          {/* Mobile Quantity Counter & Price Row (in right column beneath size, exactly matching screenshot) */}
                          <div className="md:hidden mt-2.5 space-y-2">
                            <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs w-fit">
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                                className="flex size-7 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30 transition-colors cursor-pointer"
                              >
                                <MinusIcon width={11} height={11} />
                              </button>
                              <span className="w-7 text-center text-[12px] font-semibold text-ink select-none">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                                className="flex size-7 items-center justify-center text-ink-soft hover:text-ink transition-colors cursor-pointer"
                              >
                                <PlusIcon width={11} height={11} />
                              </button>
                            </div>

                            <div>
                              <p className="font-serif text-[17px] font-bold text-ink">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Desktop Only: Right column for Quantity Counter & Price (hidden on mobile, flex on md+) */}
                        <div className="hidden md:flex flex-col items-end justify-between self-stretch shrink-0 min-w-[130px]">
                          {/* Item Total Price */}
                          <p className="font-serif text-lg sm:text-xl text-ink">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>

                          {/* Quantity Counter */}
                          <div className="mt-auto flex items-center rounded-lg border border-line bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex size-7.5 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                              <MinusIcon width={12} height={12} />
                            </button>
                            <span className="w-8 text-center text-[12.5px] font-semibold text-ink select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex size-7.5 items-center justify-center text-ink-soft hover:text-ink transition-colors cursor-pointer"
                            >
                              <PlusIcon width={12} height={12} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Row: Move to Wishlist & Remove (Mobile only) */}
                      <div className="md:hidden mt-3.5 pt-3 border-t border-line/40 flex items-center justify-between text-[12px] font-medium text-ink-soft">
                        <button
                          type="button"
                          onClick={() => moveToWishlist(item)}
                          className="inline-flex items-center gap-1.5 text-ink-soft hover:text-rose-gold-dark transition-colors cursor-pointer"
                        >
                          <HeartIcon width={13} height={13} />
                          <span>Move to Wishlist</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center gap-1.5 text-ink-soft hover:text-[#b74134] transition-colors cursor-pointer"
                        >
                          <TrashIcon width={13} height={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* ====================================================== */}
                  {/* MOBILE PROMO & ORDER SUMMARY ACCORDIONS (< md only)    */}
                  {/* ====================================================== */}
                  <div className="md:hidden space-y-3.5 pt-2">
                    {/* 1. Promo or Gift code Accordion */}
                    <div className="rounded-2xl border border-line/80 bg-white shadow-2xs overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsPromoOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left font-serif text-[17px] font-normal text-ink hover:bg-cream-50/50 transition-colors cursor-pointer"
                      >
                        <span>Promo or Gift code</span>
                        <ChevronDownIcon
                          width={16}
                          height={16}
                          className={`text-ink transition-transform duration-200 ${isPromoOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isPromoOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-line/40">
                          <form onSubmit={handleApplyPromo} className="flex gap-2 mt-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Enter code"
                              className="flex-1 rounded-lg border border-line bg-[#fbf9f6] px-3.5 py-2.5 text-[12.5px] text-ink placeholder:text-ink-muted focus:border-ink focus:bg-white focus:outline-none transition-colors"
                            />
                            <button
                              type="submit"
                              className="rounded-lg border border-line bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink shadow-2xs hover:bg-[#fbf9f6] transition-colors cursor-pointer"
                            >
                              Apply
                            </button>
                          </form>
                          {promoMessage && (
                            <p className={`mt-2 text-[11.5px] ${promoDiscount > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                              {promoMessage}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 2. Order Summary Accordion */}
                    <div className="rounded-2xl border border-line/80 bg-white shadow-2xs overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsSummaryOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left font-serif text-[19px] font-normal text-ink hover:bg-cream-50/50 transition-colors cursor-pointer"
                      >
                        <span>Order Summary</span>
                        <ChevronDownIcon
                          width={16}
                          height={16}
                          className={`text-ink transition-transform duration-200 ${isSummaryOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isSummaryOpen && (
                        <div className="px-5 pb-6 pt-2 border-t border-line/40 space-y-4">
                          {/* Cost Breakdown */}
                          <div className="space-y-2.5 text-[13.5px]">
                            <div className="flex items-center justify-between text-ink-soft">
                              <span>Subtotal ({cartCount} items)</span>
                              <span className="font-semibold text-ink">${subtotal.toLocaleString()}</span>
                            </div>

                            <div className="flex items-center justify-between text-ink-soft">
                              <span>Delivery</span>
                              <span className="font-semibold text-ink">Free</span>
                            </div>

                            <div className="flex items-center justify-between text-ink-soft">
                              <span className="inline-flex items-center gap-1">
                                <span>Estimated taxes</span>
                                <span title="Tax calculated based on destination">
                                  <InfoIcon width={13} height={13} className="text-ink-muted cursor-pointer" />
                                </span>
                              </span>
                              <span className="font-semibold text-ink">${estimatedTax.toLocaleString()}</span>
                            </div>

                            {promoDiscount > 0 && (
                              <div className="flex items-center justify-between text-emerald-700 font-medium">
                                <span>Promo discount</span>
                                <span>-${promoDiscount.toLocaleString()}</span>
                              </div>
                            )}
                          </div>

                          {/* Total (USD) */}
                          <div className="flex items-baseline justify-between border-t border-line/60 pt-3.5">
                            <span className="text-[15px] font-medium text-ink">Total (USD)</span>
                            <span className="font-serif text-2xl font-bold text-ink">
                              ${total.toLocaleString()}
                            </span>
                          </div>

                          {/* Proceed to Checkout CTA Button */}
                          <Link
                            href="/checkout"
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-ink py-3.5 text-[14px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                          >
                            <span>Proceed to Checkout</span>
                            <ArrowRightIcon width={14} height={14} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* TABLET & DESKTOP: Order Summary Card (md:+)             */}
                {/* ====================================================== */}
                <div className="hidden md:block lg:col-span-4 lg:sticky lg:top-28">
                  <div className="rounded-2xl border border-line/80 bg-white p-6 shadow-2xs space-y-5">
                    <h2 className="font-serif text-2xl font-normal text-ink">
                      Order Summary
                    </h2>

                    {/* Cost Breakdown */}
                    <div className="space-y-3 text-[13.5px] border-b border-line/60 pb-5">
                      <div className="flex items-center justify-between text-ink-soft">
                        <span>Subtotal ({cartCount} items)</span>
                        <span className="font-semibold text-ink">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-ink-soft">
                        <span>Delivery</span>
                        <span className="font-semibold text-ink">Free</span>
                      </div>

                      <div className="flex items-center justify-between text-ink-soft">
                        <span className="inline-flex items-center gap-1">
                          <span>Estimated taxes</span>
                          <span title="Tax calculated based on destination">
                            <InfoIcon width={13} height={13} className="text-ink-muted cursor-pointer" />
                          </span>
                        </span>
                        <span className="font-semibold text-ink">
                          ${estimatedTax.toLocaleString()}
                        </span>
                      </div>

                      <p className="text-[11px] text-ink-muted pt-0.5">
                        Calculated at checkout based on your location
                      </p>

                      {promoDiscount > 0 && (
                        <div className="flex items-center justify-between text-emerald-700 font-medium">
                          <span>Promo discount</span>
                          <span>-${promoDiscount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Promo or Gift Code */}
                    <div>
                      <label
                        htmlFor="promo-code"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Promo or Gift code
                      </label>
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          id="promo-code"
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 rounded-lg border border-line bg-[#fbf9f6] px-3.5 py-2 text-[12.5px] text-ink placeholder:text-ink-muted focus:border-ink focus:bg-white focus:outline-none transition-colors"
                        />
                        <button
                          type="submit"
                          className="rounded-lg border border-line bg-white px-4 py-2 text-[12.5px] font-semibold text-ink shadow-2xs hover:bg-[#fbf9f6] transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                      {promoMessage && (
                        <p className={`mt-1.5 text-[11.5px] ${promoDiscount > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                          {promoMessage}
                        </p>
                      )}
                    </div>

                    {/* Total USD */}
                    <div className="flex items-baseline justify-between border-t border-line/60 pt-4">
                      <span className="text-[15px] font-medium text-ink">Total (USD)</span>
                      <span className="font-serif text-2xl sm:text-[26px] font-bold text-ink">
                        ${total.toLocaleString()}
                      </span>
                    </div>

                    {/* Proceed to Checkout CTA Button */}
                    <Link
                      href="/checkout"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-ink py-3.5 text-[13.5px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRightIcon width={14} height={14} />
                    </Link>

                    {/* 4 Trust Items under Checkout */}
                    <div className="space-y-3.5 pt-4 border-t border-line/40">
                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <CreditCardIcon width={22} height={22} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Secure Payments</p>
                          <p className="text-[11px] text-ink-soft">Multiple trusted options</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <TruckIcon width={22} height={22} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Insured Global Delivery</p>
                          <p className="text-[11px] text-ink-soft">To 100+ countries</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <RefreshArrowsIcon width={22} height={22} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Easy Returns</p>
                          <p className="text-[11px] text-ink-soft">Hassle-free within 30 days</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <ShieldCheckIcon width={22} height={22} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Authenticity Guaranteed</p>
                          <p className="text-[11px] text-ink-soft">Every piece is verified</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Recommended Products & Trust Perks: Shown both when filled and when empty */}
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10 pb-10">
          {/* ====================================================== */}
          {/* SECTION: You May Also Like (Screenshot 1)              */}
          {/* ====================================================== */}
          <section className="mt-14 pt-10 border-t border-line/60">
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                    You May Also Like
                  </h2>
                  <Link
                    href="/category"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                </div>

                <div
                  ref={youMayAlsoLikeRef}
                  className="flex lg:grid lg:grid-cols-4 items-stretch gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 select-none cursor-grab active:cursor-grabbing lg:cursor-default [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {YOU_MAY_ALSO_LIKE_PRODUCTS.map((product) => {
                    const wishlisted = isInWishlist(product.id);
                    return (
                      <div
                        key={product.id}
                        className="w-[210px] sm:w-[250px] md:w-[270px] lg:w-auto shrink-0 lg:shrink group relative flex flex-col justify-between rounded-2xl border border-line/70 bg-white transition-all hover:border-sand-400 hover:shadow-xs"
                      >
                        {/* Image: Edge-to-edge with aspect-[4/3] to reduce card height */}
                        <div className="relative aspect-[4/3] w-full rounded-t-2xl bg-[#fbf9f6] flex items-center justify-center">
                          {/* Wishlist Heart Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasDraggedLikeRef.current) return;
                              toggleWishlist(product);
                            }}
                            className="absolute top-2.5 right-2.5 z-10 flex size-7 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <HeartIcon
                              width={14}
                              height={14}
                              className={wishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"}
                            />
                          </button>

                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 280px"
                            draggable={false}
                            className="object-cover rounded-t-2xl pointer-events-none"
                          />
                        </div>

                        {/* Info & CTA with compact padding */}
                        <div className="p-3 sm:p-3.5 flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-[13.5px] sm:text-[14.5px] font-medium text-ink line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="mt-0.5 text-[11px] sm:text-[11.5px] text-ink-soft">
                              {product.specs}
                            </p>
                            <p className="mt-1 font-semibold text-[14.5px] sm:text-[15.5px] text-ink">
                              ${product.price.toLocaleString()}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasDraggedLikeRef.current) return;
                              addToCart(product, 1);
                            }}
                            className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-line bg-white py-1.5 sm:py-2 text-[11.5px] sm:text-[12px] font-semibold text-ink shadow-2xs hover:bg-ink hover:text-white transition-colors cursor-pointer"
                          >
                            <BagIcon width={18} height={18} />
                            <span>Add to Bag</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ====================================================== */}
              {/* SECTION: Recently Viewed (Screenshot 1)                 */}
              {/* ====================================================== */}
              <section className="mt-14 pt-10 border-t border-line/60">
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                    Recently Viewed
                  </h2>
                  <Link
                    href="/jewellery"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                </div>

                <div
                  ref={recentlyViewedRef}
                  className="flex lg:grid lg:grid-cols-4 items-stretch gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 select-none cursor-grab active:cursor-grabbing lg:cursor-default [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {RECENTLY_VIEWED_PRODUCTS.map((product) => {
                    const wishlisted = isInWishlist(product.id);
                    return (
                      <div
                        key={product.id}
                        className="w-[210px] sm:w-[250px] md:w-[270px] lg:w-auto shrink-0 lg:shrink group relative flex flex-col justify-between rounded-2xl border border-line/70 bg-white transition-all hover:border-sand-400 hover:shadow-xs"
                      >
                        {/* Image: Edge-to-edge with aspect-[4/3] to reduce card height */}
                        <div className="relative aspect-[4/3] w-full rounded-t-2xl bg-[#fbf9f6] flex items-center justify-center">
                          {/* Wishlist Heart Toggle */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasDraggedRecentRef.current) return;
                              toggleWishlist(product);
                            }}
                            className="absolute top-2.5 right-2.5 z-10 flex size-7 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <HeartIcon
                              width={14}
                              height={14}
                              className={wishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"}
                            />
                          </button>

                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 210px, (max-width: 1024px) 270px, 280px"
                            draggable={false}
                            className="object-cover rounded-t-2xl pointer-events-none"
                          />
                        </div>

                        {/* Info with compact padding */}
                        <div className="p-3 sm:p-3.5">
                          <h3 className="font-serif text-[13.5px] sm:text-[14.5px] font-medium text-ink line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="mt-1 font-semibold text-[14.5px] sm:text-[15.5px] text-ink">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ====================================================== */}
            {/* Trust Perks Row above Footer (Screenshot 1)            */}
            {/* ====================================================== */}
            <section className="border-t border-line/60 bg-[#fbf9f6] py-8">
              <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
                <div className="grid grid-cols-2 min-[480px]:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                  {TRUST_PERKS.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div
                        key={perk.title}
                        className="flex items-center gap-3 transition-transform hover:-translate-y-0.5"
                      >
                        <div className="grid size-10 shrink-0 place-items-center rounded-full border border-line/70 bg-white text-ink shadow-2xs">
                          <Icon width={25} height={25} />
                        </div>
                        <div className="min-w-0 leading-tight">
                          <p className="text-[12px] sm:text-[12.5px] font-semibold text-ink truncate">
                            {perk.title}
                          </p>
                          <p className="text-[11px] text-ink-soft truncate mt-0.5">
                            {perk.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
      </main>

      <Footer />
    </>
  );
}
