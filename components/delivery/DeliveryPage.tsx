"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CloseIcon,
  ChevronDownIcon,
  TruckIcon,
  LockIcon,
  ShieldCheckIcon,
  StarIcon,
  MapPinIcon,
  InfoIcon,
  PackageIcon,
} from "@/components/Icons";

import ring1 from "@/app/images/ring1.png";
import ring3 from "@/app/images/ring3.png";
import pearis from "@/app/images/pearis.png";

// Helper Calendar Icon
function CalendarIcon({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// Shipping method definitions
type ShippingOption = {
  id: string;
  name: string;
  duration: string;
  price: number;
  tracking: boolean;
  status: "pending" | "confirmed";
  statusText: string;
};

const SELLER_1_SHIPPING: ShippingOption[] = [
  {
    id: "s1-yurtici",
    name: "Yurtiçi Kargo – Standart",
    duration: "3 – 5 business days",
    price: 25,
    tracking: true,
    status: "pending",
    statusText: "Coverage verification pending",
  },
  {
    id: "s1-aras",
    name: "Aras Kargo – Hızlı",
    duration: "1 – 2 business days",
    price: 45,
    tracking: true,
    status: "confirmed",
    statusText: "Insurance confirmed",
  },
  {
    id: "s1-ups",
    name: "UPS Türkiye – Ekspres",
    duration: "1 – 2 business days",
    price: 70,
    tracking: true,
    status: "confirmed",
    statusText: "Insurance confirmed",
  },
];

const SELLER_2_SHIPPING: ShippingOption[] = [
  {
    id: "s2-mng",
    name: "MNG Kargo – Standart",
    duration: "3 – 5 business days",
    price: 20,
    tracking: true,
    status: "pending",
    statusText: "Coverage verification pending",
  },
  {
    id: "s2-aras",
    name: "Aras Kargo – Hızlı",
    duration: "1 – 3 business days",
    price: 40,
    tracking: true,
    status: "confirmed",
    statusText: "Insurance confirmed",
  },
  {
    id: "s2-ups",
    name: "UPS Türkiye – Ekspres",
    duration: "1 – 2 business days",
    price: 65,
    tracking: true,
    status: "confirmed",
    statusText: "Insurance confirmed",
  },
];

export function DeliveryPage() {
  // Alert banner state
  const [showAlert, setShowAlert] = useState(true);

  // Accordion collapse state for sellers
  const [isSeller1Open, setIsSeller1Open] = useState(true);
  const [isSeller2Open, setIsSeller2Open] = useState(true);

  // Dynamic Quantities for products
  const [qtyRing, setQtyRing] = useState(1);
  const [qtyNecklace, setQtyNecklace] = useState(1);
  const [qtyEarrings, setQtyEarrings] = useState(1);

  // Selected shipping methods
  const [seller1Method, setSeller1Method] = useState("s1-yurtici");
  const [seller2Method, setSeller2Method] = useState("s2-mng");

  // Selected shipping fee calculations
  const selectedS1Option = SELLER_1_SHIPPING.find((o) => o.id === seller1Method) || SELLER_1_SHIPPING[0];
  const selectedS2Option = SELLER_2_SHIPPING.find((o) => o.id === seller2Method) || SELLER_2_SHIPPING[0];

  const deliveryFee1 = selectedS1Option.price;
  const deliveryFee2 = selectedS2Option.price;

  // Price calculations
  const priceRing = 1250;
  const priceNecklace = 1420;
  const priceEarrings = 975;

  const totalItemCount = qtyRing + qtyNecklace + qtyEarrings;
  const subtotal = priceRing * qtyRing + priceNecklace * qtyNecklace + priceEarrings * qtyEarrings;
  const discount = 150;
  const tax = Math.round(subtotal * 0.08); // 8% estimated tax
  const total = Math.max(0, subtotal + deliveryFee1 + deliveryFee2 - discount + tax);

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* ====================================================== */}
        {/* TOP HERO SECTION (No image, title & 4-step indicator)   */}
        {/* ====================================================== */}
        <section className="border-b border-line/60 bg-cream-50/50">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-7 lg:py-9">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left: Title & Subtitle */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-ink leading-tight">
                  Delivery Method
                </h1>
                <p className="mt-1.5 text-[13px] sm:text-[14px] text-ink-soft leading-relaxed max-w-xl">
                  Choose your delivery options for each seller. Items from different sellers may arrive in separate shipments.
                </p>
              </div>

              {/* Right: 4-Step Indicator (Step 1 & 2 are dark/active) */}
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0 self-start lg:self-center">
                {/* Step 1: Cart (Completed / Dark) */}
                <div className="flex flex-col items-center">
                  <span className="size-7 sm:size-8 rounded-full border-2 border-ink bg-white text-ink font-semibold text-xs sm:text-[13px] grid place-items-center shadow-2xs">
                    <CheckIcon width={13} height={13} className="stroke-[2.5]" />
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-medium text-ink mt-1.5">Cart</span>
                </div>

                {/* Completed Line connecting 1 and 2 */}
                <div className="w-8 sm:w-12 lg:w-16 h-0.5 bg-ink -mt-5" />

                {/* Step 2: Delivery (ACTIVE - Dark) */}
                <div className="flex flex-col items-center">
                  <span className="size-7 sm:size-8 rounded-full bg-ink text-white font-semibold text-xs sm:text-[13px] grid place-items-center shadow-xs">
                    2
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-bold text-ink mt-1.5">Delivery</span>
                </div>

                {/* Inactive Line connecting 2 and 3 */}
                <div className="w-8 sm:w-12 lg:w-16 h-px bg-line/80 -mt-5" />

                {/* Step 3: Payment */}
                <div className="flex flex-col items-center opacity-50">
                  <span className="size-7 sm:size-8 rounded-full border border-line bg-cream-50 text-muted font-medium text-xs sm:text-[13px] grid place-items-center">
                    3
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-muted mt-1.5">Payment</span>
                </div>

                {/* Inactive Line connecting 3 and 4 */}
                <div className="w-8 sm:w-12 lg:w-16 h-px bg-line/80 -mt-5" />

                {/* Step 4: Review */}
                <div className="flex flex-col items-center opacity-50">
                  <span className="size-7 sm:size-8 rounded-full border border-line bg-cream-50 text-muted font-medium text-xs sm:text-[13px] grid place-items-center">
                    4
                  </span>
                  <span className="text-[11px] sm:text-[12px] text-muted mt-1.5">Review</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* MAIN 2-COLUMN CONTENT                                  */}
        {/* ====================================================== */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Multi-seller Shipping Options (8 cols)    */}
            {/* ====================================================== */}
            <div className="lg:col-span-8 space-y-6">
              {/* Notice Alert Banner */}
              {showAlert && (
                <div className="rounded-2xl border border-[#f2ded1] bg-[#fef7f2] p-4 sm:p-5 flex items-start justify-between gap-4 shadow-2xs transition-all">
                  <div className="flex items-start gap-3.5">
                    <div className="size-9 rounded-xl bg-[#f8e5d8] text-[#a4532b] grid place-items-center shrink-0 mt-0.5">
                      <TruckIcon width={20} height={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink text-[13.5px] sm:text-[14px]">
                        Your order contains items from 2 different sellers.
                      </h3>
                      <p className="text-[12px] sm:text-[12.5px] text-ink-soft mt-1 leading-relaxed">
                        Items will be shipped separately and may arrive on different dates. You can track each shipment individually.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAlert(false)}
                    aria-label="Dismiss alert"
                    className="text-muted hover:text-ink p-1 transition-colors cursor-pointer shrink-0"
                  >
                    <CloseIcon width={16} height={16} />
                  </button>
                </div>
              )}

              {/* ====================================================== */}
              {/* SELLER GROUP 1: Lumea Jewellery                        */}
              {/* ====================================================== */}
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-6">
                {/* Seller Header */}
                <div className="flex items-center justify-between border-b border-line/60 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Seller Avatar */}
                    <div className="size-10 rounded-full bg-cream-200 border border-line flex items-center justify-center font-serif font-bold text-ink text-sm">
                      L
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold text-ink text-[15px]">
                          Lumea Jewellery
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                          <span>Verified Seller</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11.5px] text-muted mt-0.5">
                        <span className="flex items-center gap-1 text-amber-600 font-medium">
                          <StarIcon width={12} height={12} className="fill-amber-500 text-amber-500" />
                          <span>4.8</span>
                          <span className="text-muted">(1.2K reviews)</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon width={11} height={11} />
                          <span>Istanbul, Türkiye</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collapse Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsSeller1Open(!isSeller1Open)}
                    className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                  >
                    <span>2 items</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`transition-transform duration-200 ${isSeller1Open ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Seller Content Accordion */}
                {isSeller1Open && (
                  <div className="space-y-6">
                    {/* 2-Column Inside Seller Card: Items Left, Delivery Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Products Left Column */}
                      <div className="space-y-4">
                        {/* Product 1: Solitaire Diamond Ring */}
                        <div className="flex items-center justify-between gap-3.5 p-3.5 rounded-xl bg-[#fcfaf7] border border-line/60">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Enlarged image with NO padding */}
                            <div className="relative size-20 sm:size-[84px] shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                              <Image
                                src={ring1}
                                alt="Solitaire Diamond Ring"
                                fill
                                sizes="90px"
                                className="object-contain"
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-[13.5px] font-semibold text-ink leading-snug">
                                Solitaire Diamond Ring
                              </h4>
                              <p className="text-[11.5px] text-muted mt-0.5">
                                18K Gold • Size: 52
                              </p>
                              <p className="font-semibold text-ink text-[14px] mt-1.5">
                                ${priceRing.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Stepper centered vertically */}
                          <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs shrink-0 self-center">
                            <button
                              type="button"
                              onClick={() => setQtyRing((q) => Math.max(1, q - 1))}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-ink">
                              {qtyRing}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQtyRing((q) => q + 1)}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Product 2: Malachite Clover Necklace */}
                        <div className="flex items-center justify-between gap-3.5 p-3.5 rounded-xl bg-[#fcfaf7] border border-line/60">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Enlarged image with NO padding */}
                            <div className="relative size-20 sm:size-[84px] shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                              <Image
                                src={ring3}
                                alt="Malachite Clover Necklace"
                                fill
                                sizes="90px"
                                className="object-contain"
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-[13.5px] font-semibold text-ink leading-snug">
                                Malachite Clover Necklace
                              </h4>
                              <p className="text-[11.5px] text-muted mt-0.5">
                                18K Gold • 42 cm
                              </p>
                              <p className="font-semibold text-ink text-[14px] mt-1.5">
                                ${priceNecklace.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Stepper centered vertically */}
                          <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs shrink-0 self-center">
                            <button
                              type="button"
                              onClick={() => setQtyNecklace((q) => Math.max(1, q - 1))}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-ink">
                              {qtyNecklace}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQtyNecklace((q) => q + 1)}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Options Right Column */}
                      <div>
                        <h4 className="text-[13px] font-semibold text-ink mb-2.5">
                          Choose Delivery Method
                        </h4>

                        <div className="space-y-2.5">
                          {SELLER_1_SHIPPING.map((opt) => {
                            const isSelected = seller1Method === opt.id;
                            return (
                              <label
                                key={opt.id}
                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? "border-ink bg-cream-50/60 shadow-2xs"
                                    : "border-line/70 bg-white hover:border-line hover:bg-cream-50/20"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="seller1-shipping"
                                  value={opt.id}
                                  checked={isSelected}
                                  onChange={() => setSeller1Method(opt.id)}
                                  className="mt-1 size-4 accent-ink"
                                />

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[13px] font-semibold text-ink">
                                      {opt.name}
                                    </span>
                                    <span className="text-[13px] font-bold text-ink">
                                      ${opt.price}
                                    </span>
                                  </div>

                                  <p className="text-[11.5px] text-muted mt-0.5">
                                    {opt.duration}
                                  </p>

                                  <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                                    <span className="inline-flex items-center gap-1 rounded bg-cream-100/80 px-1.5 py-0.5 text-ink-soft">
                                      <PackageIcon width={11} height={11} />
                                      <span>Tracking available</span>
                                    </span>

                                    {opt.status === "confirmed" ? (
                                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-800 font-medium">
                                        <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                                        <span>{opt.statusText}</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-amber-800 font-medium">
                                        <ShieldCheckIcon width={11} height={11} />
                                        <span>{opt.statusText}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Estimated Delivery Notice Banner */}
                    <div className="rounded-xl bg-[#fcf8f3] border border-[#ebdccb]/70 p-3.5 flex items-center gap-2.5 text-[12px] sm:text-[12.5px] text-ink-soft">
                      <div className="text-[#a4532b] shrink-0">
                        <CalendarIcon className="size-4" />
                      </div>
                      <span>
                        Estimated delivery for this seller:{" "}
                        <strong className="text-ink font-semibold">
                          3 – 5 business days (Oct 15 – Oct 20, 2026)
                        </strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ====================================================== */}
              {/* SELLER GROUP 2: Aurora Jewellery                       */}
              {/* ====================================================== */}
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-6">
                {/* Seller Header */}
                <div className="flex items-center justify-between border-b border-line/60 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Seller Avatar */}
                    <div className="size-10 rounded-full bg-cream-200 border border-line flex items-center justify-center font-serif font-bold text-ink text-sm">
                      A
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-semibold text-ink text-[15px]">
                          Aurora Jewellery
                        </h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                          <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                          <span>Verified Seller</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11.5px] text-muted mt-0.5">
                        <span className="flex items-center gap-1 text-amber-600 font-medium">
                          <StarIcon width={12} height={12} className="fill-amber-500 text-amber-500" />
                          <span>4.7</span>
                          <span className="text-muted">(860 reviews)</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPinIcon width={11} height={11} />
                          <span>Ankara, Türkiye</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Collapse Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsSeller2Open(!isSeller2Open)}
                    className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors cursor-pointer"
                  >
                    <span>1 item</span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={`transition-transform duration-200 ${isSeller2Open ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {/* Seller Content Accordion */}
                {isSeller2Open && (
                  <div className="space-y-6">
                    {/* 2-Column Inside Seller Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Products Left Column */}
                      <div className="space-y-4">
                        {/* Product 1: Pearl Drop Earrings */}
                        <div className="flex items-center justify-between gap-3.5 p-3.5 rounded-xl bg-[#fcfaf7] border border-line/60">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Enlarged image with NO padding */}
                            <div className="relative size-20 sm:size-[84px] shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                              <Image
                                src={pearis}
                                alt="Pearl Drop Earrings"
                                fill
                                sizes="90px"
                                className="object-contain"
                              />
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-[13.5px] font-semibold text-ink leading-snug">
                                Pearl Drop Earrings
                              </h4>
                              <p className="text-[11.5px] text-muted mt-0.5">
                                18K Gold • Natural Pearls
                              </p>
                              <p className="font-semibold text-ink text-[14px] mt-1.5">
                                ${priceEarrings.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Stepper centered vertically */}
                          <div className="flex items-center rounded-lg border border-line bg-white shadow-2xs shrink-0 self-center">
                            <button
                              type="button"
                              onClick={() => setQtyEarrings((q) => Math.max(1, q - 1))}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-7 h-7 flex items-center justify-center text-xs font-semibold text-ink">
                              {qtyEarrings}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQtyEarrings((q) => q + 1)}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink hover:bg-cream-100 transition-colors text-xs font-semibold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Options Right Column */}
                      <div>
                        <h4 className="text-[13px] font-semibold text-ink mb-2.5">
                          Choose Delivery Method
                        </h4>

                        <div className="space-y-2.5">
                          {SELLER_2_SHIPPING.map((opt) => {
                            const isSelected = seller2Method === opt.id;
                            return (
                              <label
                                key={opt.id}
                                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                  isSelected
                                    ? "border-ink bg-cream-50/60 shadow-2xs"
                                    : "border-line/70 bg-white hover:border-line hover:bg-cream-50/20"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="seller2-shipping"
                                  value={opt.id}
                                  checked={isSelected}
                                  onChange={() => setSeller2Method(opt.id)}
                                  className="mt-1 size-4 accent-ink"
                                />

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[13px] font-semibold text-ink">
                                      {opt.name}
                                    </span>
                                    <span className="text-[13px] font-bold text-ink">
                                      ${opt.price}
                                    </span>
                                  </div>

                                  <p className="text-[11.5px] text-muted mt-0.5">
                                    {opt.duration}
                                  </p>

                                  <div className="flex items-center gap-2 mt-2 flex-wrap text-[11px]">
                                    <span className="inline-flex items-center gap-1 rounded bg-cream-100/80 px-1.5 py-0.5 text-ink-soft">
                                      <PackageIcon width={11} height={11} />
                                      <span>Tracking available</span>
                                    </span>

                                    {opt.status === "confirmed" ? (
                                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-800 font-medium">
                                        <CheckIcon width={10} height={10} className="stroke-[2.5]" />
                                        <span>{opt.statusText}</span>
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-amber-800 font-medium">
                                        <ShieldCheckIcon width={11} height={11} />
                                        <span>{opt.statusText}</span>
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Estimated Delivery Notice Banner */}
                    <div className="rounded-xl bg-[#fcf8f3] border border-[#ebdccb]/70 p-3.5 flex items-center gap-2.5 text-[12px] sm:text-[12.5px] text-ink-soft">
                      <div className="text-[#a4532b] shrink-0">
                        <CalendarIcon className="size-4" />
                      </div>
                      <span>
                        Estimated delivery for this seller:{" "}
                        <strong className="text-ink font-semibold">
                          3 – 5 business days (Oct 15 – Oct 20, 2026)
                        </strong>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Return to Cart Link (matching screenshot) */}
              <div className="pt-4">
                <Link
                  href="/bag"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-ink underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
                >
                  <ArrowLeftIcon width={14} height={14} />
                  <span>Back to Cart</span>
                </Link>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Order Summary (4 cols - narrowed)        */}
            {/* ====================================================== */}
            <div className="lg:col-span-4 lg:sticky lg:top-19 space-y-4">
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                {/* Header */}
                <div className="border-b border-line/50 pb-3.5">
                  <h2 className="font-serif text-2xl font-normal text-ink">
                    Order Summary
                  </h2>
                  <p className="mt-0.5 text-[12px] text-muted">
                    {totalItemCount} items from 2 sellers
                  </p>
                </div>

                {/* Items in Summary */}
                <div className="space-y-3.5">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                      <Image
                        src={ring1}
                        alt="Solitaire Diamond Ring"
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-1">
                        Solitaire Diamond Ring
                      </p>
                      <p className="text-[11.5px] text-muted">Lumea Jewellery • Qty: {qtyRing}</p>
                    </div>
                    <span className="font-semibold text-ink text-[13.5px]">
                      ${(priceRing * qtyRing).toLocaleString()}
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                      <Image
                        src={ring3}
                        alt="Malachite Clover Necklace"
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-1">
                        Malachite Clover Necklace
                      </p>
                      <p className="text-[11.5px] text-muted">Lumea Jewellery • Qty: {qtyNecklace}</p>
                    </div>
                    <span className="font-semibold text-ink text-[13.5px]">
                      ${(priceNecklace * qtyNecklace).toLocaleString()}
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-3">
                    <div className="relative size-14 shrink-0 rounded-xl bg-[#f7f3ec] border border-line/40 overflow-hidden flex items-center justify-center">
                      <Image
                        src={pearis}
                        alt="Pearl Drop Earrings"
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-ink leading-snug line-clamp-1">
                        Pearl Drop Earrings
                      </p>
                      <p className="text-[11.5px] text-muted">Aurora Jewellery • Qty: {qtyEarrings}</p>
                    </div>
                    <span className="font-semibold text-ink text-[13.5px]">
                      ${(priceEarrings * qtyEarrings).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="border-t border-line/60 pt-4 space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Item Subtotal ({totalItemCount} items)</span>
                    <span className="font-medium text-ink">${subtotal.toLocaleString()}</span>
                  </div>

                  {/* Dynamic delivery fee per seller */}
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Delivery Fee (Lumea Jewellery)</span>
                    <span className="font-medium text-ink">${deliveryFee1}</span>
                  </div>

                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Delivery Fee (Aurora Jewellery)</span>
                    <span className="font-medium text-ink">${deliveryFee2}</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-medium">-${discount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between text-ink-soft">
                    <span className="inline-flex items-center gap-1">
                      <span>Tax (KDV 20%, included)</span>
                      <InfoIcon width={13} height={13} className="text-muted cursor-pointer" />
                    </span>
                    <span className="font-medium text-ink">${tax.toLocaleString()}</span>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between border-t border-line/60 pt-3.5">
                    <span className="text-[15px] font-semibold text-ink">Total (incl. tax)</span>
                    <span className="font-serif text-2xl font-bold text-ink">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Continue to Payment Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    className="w-full rounded-full bg-ink py-4 text-[14px] font-semibold text-white shadow-md hover:bg-ink-soft transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRightIcon width={14} height={14} />
                  </button>
                </div>

                {/* 3 Trust Items below CTA */}
                <div className="border-t border-line/60 pt-4 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <LockIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Secure Checkout</p>
                      <p className="text-[11px] text-muted">PCI-DSS compliant</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <PackageIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Free &amp; Easy Returns</p>
                      <p className="text-[11px] text-muted">Within 14 days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <ShieldCheckIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Your Data is Protected</p>
                      <p className="text-[11px] text-muted">We never share your information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
