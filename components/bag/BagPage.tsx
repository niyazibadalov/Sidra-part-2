"use client";

import React, { useState } from "react";
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

export function BagPage() {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    clearCart,
    cartCount,
    moveToWishlist,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useCartWishlist();

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

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
                  href="/jewellery"
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
                {/* Gradient wash from left to protect text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-cream-100/20 to-transparent" />

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
                      className="relative rounded-2xl border border-line/70 bg-white p-4 sm:p-5 transition-shadow hover:shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                        {/* Product Image Thumbnail */}
                        <div className="relative size-24 sm:size-45 shrink-0 rounded-xl bg-[#fbf9f6] border border-line/40 p-2 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="120px"
                            className="object-contain"
                          />
                          {/* "Ready to ship" badge if present */}
                          {(item.stockText === "Ready to ship" || item.id === "cart-1") && (
                            <span className="absolute -top-2 -left-2 sm:top-1.5 sm:left-1.5 inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 text-[10px] font-medium text-emerald-800 shadow-2xs">
                              Ready to ship
                            </span>
                          )}
                        </div>

                        {/* Product Info & Specifications */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-[11.5px] font-medium text-ink-muted">
                                {item.brand || "Maison Éclat"}
                              </p>
                              <h3 className="font-serif text-[17px] sm:text-[18px] font-medium text-ink mt-0.5">
                                <Link
                                  href={`/category/${item.id}`}
                                  className="hover:text-rose-gold-dark transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </h3>
                            </div>

                            {/* Item Total Price (Mobile / Tablet inline) */}
                            <div className="sm:hidden text-right">
                              <p className="font-serif text-lg font-bold text-ink">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Metal / Stone specs */}
                          <p className="text-[12px] sm:text-[12.5px] text-ink-soft mt-1">
                            {item.specs || item.metal || "18K Gold • Diamond"}
                          </p>

                          {/* Size / Length selector */}
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[12px] text-ink-soft">
                              {item.category === "Necklaces" ? "Length:" : "Size:"}
                            </span>
                            <div className="relative inline-flex items-center gap-1 rounded-md border border-line bg-[#fbf9f6] px-2.5 py-1 text-[11.5px] font-medium text-ink cursor-pointer hover:bg-white transition-colors">
                              <span>{item.selectedSize || (item.category === "Necklaces" ? "42 cm" : "7")}</span>
                              <ChevronDownIcon width={12} height={12} className="text-ink-soft" />
                            </div>
                          </div>

                          {/* Delivery info row */}
                          <div className="mt-3 flex items-center gap-2 text-[11.5px] sm:text-[12px] text-ink-soft">
                            <TruckIcon width={14} height={14} className="text-ink-soft shrink-0" />
                            <span>
                              Get it between <strong className="font-semibold text-ink">25 - 28 Apr</strong>
                              <span className="hidden min-[480px]:inline text-ink-muted ml-1.5">• Express delivery available</span>
                            </span>
                          </div>

                          {/* Action Links: Edit, Move to Wishlist, Remove */}
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] font-medium text-ink-soft border-t border-line/40 pt-3">
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
                        </div>

                        {/* Right: Quantity Counter & Desktop Price */}
                        <div className="hidden sm:flex flex-col items-end justify-between self-stretch shrink-0 min-w-[130px]">
                          {/* Item Total Price */}
                          <p className="font-serif text-lg sm:text-xl font-bold text-ink">
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

                        {/* Mobile Quantity Counter */}
                        <div className="sm:hidden flex items-center justify-between w-full pt-2">
                          <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex size-7 items-center justify-center text-ink-soft hover:text-ink disabled:opacity-30 transition-colors"
                            >
                              <MinusIcon width={12} height={12} />
                            </button>
                            <span className="w-8 text-center text-[12px] font-semibold text-ink">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex size-7 items-center justify-center text-ink-soft hover:text-ink transition-colors"
                            >
                              <PlusIcon width={12} height={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clear Cart / Continue shopping helper */}
                  <div className="flex items-center justify-between pt-2 px-1 text-[12.5px]">
                    <Link
                      href="/jewellery"
                      className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink font-medium transition-colors"
                    >
                      <span>← Continue shopping</span>
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-ink-muted hover:text-[#b74134] transition-colors cursor-pointer font-medium"
                    >
                      Clear bag
                    </button>
                  </div>
                </div>

                {/* ====================================================== */}
                {/* RIGHT COLUMN: Order Summary (col-span-4)                */}
                {/* ====================================================== */}
                <div className="lg:col-span-4">
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
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-[13.5px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRightIcon width={14} height={14} />
                    </button>

                    {/* 4 Trust Items under Checkout */}
                    <div className="space-y-3.5 pt-4 border-t border-line/40">
                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <CreditCardIcon width={16} height={16} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Secure Payments</p>
                          <p className="text-[11px] text-ink-soft">Multiple trusted options</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <TruckIcon width={16} height={16} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Insured Global Delivery</p>
                          <p className="text-[11px] text-ink-soft">To 100+ countries</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <RefreshArrowsIcon width={16} height={16} />
                        </div>
                        <div>
                          <p className="text-[12.5px] font-semibold text-ink">Easy Returns</p>
                          <p className="text-[11px] text-ink-soft">Hassle-free within 30 days</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fbf9f6] text-ink border border-line/40">
                          <ShieldCheckIcon width={16} height={16} />
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

              {/* ====================================================== */}
              {/* SECTION: You May Also Like (Screenshot 1)              */}
              {/* ====================================================== */}
              <section className="mt-16 pt-10 border-t border-line/60">
                <div className="mb-6 flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                    You May Also Like
                  </h2>
                  <Link
                    href="/jewellery"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {YOU_MAY_ALSO_LIKE_PRODUCTS.map((product) => {
                    const wishlisted = isInWishlist(product.id);
                    return (
                      <div
                        key={product.id}
                        className="group relative flex flex-col justify-between rounded-xl border border-line/70 bg-white p-3.5 transition-all hover:border-sand-400 hover:shadow-xs"
                      >
                        {/* Wishlist Heart Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-5 right-5 z-10 flex size-7 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <HeartIcon
                            width={14}
                            height={14}
                            className={wishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"}
                          />
                        </button>

                        {/* Image */}
                        <div className="relative aspect-square w-full rounded-lg bg-[#fbf9f6] p-4 flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="240px"
                            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Info & CTA */}
                        <div className="mt-3 flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-[14px] sm:text-[15px] font-medium text-ink line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="mt-0.5 text-[11.5px] text-ink-soft">
                              {product.specs}
                            </p>
                            <p className="mt-1 font-serif text-[15px] sm:text-[16px] font-bold text-ink">
                              ${product.price.toLocaleString()}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => addToCart(product, 1)}
                            className="mt-3.5 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-white py-2 text-[12px] font-semibold text-ink shadow-2xs hover:bg-ink hover:text-white transition-colors cursor-pointer"
                          >
                            <BagIcon width={13} height={13} />
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

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {RECENTLY_VIEWED_PRODUCTS.map((product) => {
                    const wishlisted = isInWishlist(product.id);
                    return (
                      <div
                        key={product.id}
                        className="group relative flex flex-col justify-between rounded-xl border border-line/70 bg-white p-3.5 transition-all hover:border-sand-400 hover:shadow-xs"
                      >
                        {/* Wishlist Heart Toggle */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-5 right-5 z-10 flex size-7 items-center justify-center rounded-full bg-white/90 text-ink shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <HeartIcon
                            width={14}
                            height={14}
                            className={wishlisted ? "fill-[#b74134] text-[#b74134]" : "text-ink"}
                          />
                        </button>

                        {/* Image */}
                        <div className="relative aspect-square w-full rounded-lg bg-[#fbf9f6] p-4 flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="240px"
                            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Info */}
                        <div className="mt-3">
                          <h3 className="font-serif text-[14px] sm:text-[15px] font-medium text-ink line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="mt-1 font-serif text-[15px] sm:text-[16px] font-bold text-ink">
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
                          <Icon width={18} height={18} />
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
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
