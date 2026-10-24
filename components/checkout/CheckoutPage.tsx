"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  UserIcon,
  ChevronDownIcon,
  CreditCardIcon,
  TruckIcon,
  RefreshArrowsIcon,
  DiamondIcon,
  InfoIcon,
} from "@/components/Icons";
import { useCartWishlist, ProductItem } from "@/context/CartWishlistContext";
import bagFullHeroImg from "@/app/images/bagFullHero.png";
import ring1 from "@/app/images/ring1.png";
import ring2 from "@/app/images/ring2.png";
import ring3 from "@/app/images/ring3.png";

export type CheckoutItem = ProductItem & {
  quantity: number;
  size?: string;
  selectedSize?: string;
  length?: string;
};

const DEFAULT_CHECKOUT_ITEMS: CheckoutItem[] = [
  {
    id: "co-ring-1",
    brand: "Maison Éclat",
    name: "Solitaire Diamond Ring",
    price: 1250,
    specs: "18K Gold • Diamond",
    image: ring1,
    category: "Rings",
    size: "7",
    quantity: 1,
  },
  {
    id: "co-hoop-2",
    brand: "Maison Éclat",
    name: "Éclat Hoop Earrings",
    price: 1240,
    specs: "18K Gold",
    image: ring2,
    category: "Earrings",
    size: "One size",
    quantity: 1,
  },
  {
    id: "co-clover-3",
    brand: "Veluna",
    name: "Clover Necklace",
    price: 1420,
    specs: "18K Gold • Malachite",
    image: ring3,
    category: "Necklaces",
    length: "42 cm",
    quantity: 1,
  },
];

const COUNTRY_OPTIONS = [
  { value: "TR", label: "Türkiye" },
  { value: "AZ", label: "Azerbaijan" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "AE", label: "United Arab Emirates" },
];

const PHONE_CODES = [
  { code: "+90", country: "TR" },
  { code: "+994", country: "AZ" },
  { code: "+1", country: "US" },
  { code: "+44", country: "GB" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+971", country: "AE" },
];

export function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCartWishlist();

  // If user has products in cart, display them; otherwise show the default items from design
  const items: CheckoutItem[] =
    cart.length > 0
      ? cart.map((c) => ({
          ...c,
          size: c.selectedSize || (c as any).size,
        }))
      : DEFAULT_CHECKOUT_ITEMS;

  // Form fields
  const [email, setEmail] = useState("");
  const [phoneCode, setPhoneCode] = useState("+90");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("TR");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [sameBilling, setSameBilling] = useState(true);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Restore saved checkout address if exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sidra_checkout_address");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.email) setEmail(data.email);
        if (data.phoneCode) setPhoneCode(data.phoneCode);
        if (data.phoneNumber) setPhoneNumber(data.phoneNumber);
        if (data.firstName) setFirstName(data.firstName);
        if (data.lastName) setLastName(data.lastName);
        if (data.country) setCountry(data.country);
        if (data.streetAddress) setStreetAddress(data.streetAddress);
        if (data.apartment) setApartment(data.apartment);
        if (data.city) setCity(data.city);
        if (data.stateProvince) setStateProvince(data.stateProvince);
        if (data.postalCode) setPostalCode(data.postalCode);
        if (typeof data.sameBilling === "boolean") setSameBilling(data.sameBilling);
        if (typeof data.saveInfo === "boolean") setSaveInfo(data.saveInfo);
      }
    } catch {
      // Ignore parse error
    }
  }, []);

  const handleContinueToDelivery = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (!streetAddress.trim()) newErrors.streetAddress = "Street address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!stateProvince.trim()) newErrors.stateProvince = "State/Province is required";
    if (!postalCode.trim()) newErrors.postalCode = "Postal code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = Object.keys(newErrors)[0];
      const elementId =
        firstKey === "email"
          ? "co-email"
          : firstKey === "firstName"
          ? "co-firstname"
          : firstKey === "lastName"
          ? "co-lastname"
          : firstKey === "country"
          ? "co-country"
          : firstKey === "streetAddress"
          ? "co-street"
          : firstKey === "city"
          ? "co-city"
          : firstKey === "stateProvince"
          ? "co-state"
          : "co-postal";
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }

    setErrors({});

    const countryObj = COUNTRY_OPTIONS.find((c) => c.value === country);
    const addressData = {
      email: email.trim(),
      phoneCode,
      phoneNumber: phoneNumber.trim(),
      phone: phoneNumber.trim() ? `${phoneCode} ${phoneNumber.trim()}` : "",
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      country,
      countryLabel: countryObj ? countryObj.label : country,
      streetAddress: streetAddress.trim(),
      apartment: apartment.trim(),
      city: city.trim(),
      stateProvince: stateProvince.trim(),
      postalCode: postalCode.trim(),
      sameBilling,
      saveInfo,
    };

    try {
      localStorage.setItem("sidra_checkout_address", JSON.stringify(addressData));
    } catch (err) {
      console.error("Failed to save address to localStorage", err);
    }

    router.push("/delivery");
  };

  // Promo code dropdown state
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Quantity map for editing items directly on summary
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    items.forEach((item) => {
      initial[item.id] = item.quantity || 1;
    });
    return initial;
  });

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === "SIDRA10") {
      setAppliedPromo("SIDRA10 (-10%)");
      setPromoDiscount(Math.round(subtotal * 0.1));
    } else {
      setAppliedPromo("PROMO100 (-$100)");
      setPromoDiscount(100);
    }
  };

  // Calculations
  const totalItemCount = Object.values(quantities).reduce((sum, q) => sum + q, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? item.quantity ?? 1),
    0
  );
  const estimatedTaxes = Math.round(subtotal * 0.08); // ~8% matching design ($3,910 -> $312)
  const total = Math.max(0, subtotal + estimatedTaxes - promoDiscount);

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* ====================================================== */}
        {/* DESKTOP TOP HERO BANNER (hidden on tablet & mobile)    */}
        {/* ====================================================== */}
        <section className="hidden lg:block relative w-full border-b border-line/70 bg-cream-100 overflow-hidden">
          <Image
            src={bagFullHeroImg}
            alt="Sidra Fine Jewellery - Checkout"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right sm:object-center"
          />
          {/* Subtle gradient overlay ensuring crisp typography */}
          <div className="absolute inset-0 to-transparent pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            {/* Back to Shopping Bag Link */}
            <Link
              href="/bag"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeftIcon width={13} height={13} />
              <span>Back to Shopping Bag</span>
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight">
                  Checkout
                </h1>
                <p className="mt-1 text-[13px] sm:text-[14px] text-ink-soft leading-relaxed max-w-md">
                  Extraordinary pieces. A more meaningful tomorrow.
                </p>
              </div>

              {/* Script phrase over ring (Desktop only) */}
              <div className="hidden lg:block select-none pr-6 text-right">
                <p className="font-script text-2xl lg:text-3xl text-ink-soft/90 -rotate-3 font-semibold leading-snug">
                  Brighter<br />Together
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* DESKTOP 4-STEP BREADCRUMB INDICATOR (hidden on mobile) */}
        {/* ====================================================== */}
        <section className="hidden lg:block border-b border-line/60 bg-white">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10 py-4 sm:py-5">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-6 overflow-x-auto text-[12.5px] sm:text-[13px]">
              {/* Step 1: Contact & Delivery (ACTIVE) */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="size-6 sm:size-7 rounded-full bg-ink text-white font-semibold text-[11px] sm:text-xs grid place-items-center">
                  1
                </span>
                <span className="font-semibold text-ink">Contact &amp; Delivery</span>
              </div>

              <div className="hidden sm:block w-8 lg:w-16 h-px bg-line/80 shrink-0" />

              {/* Step 2: Delivery */}
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  2
                </span>
                <span className="text-muted">Delivery</span>
              </div>

              <div className="hidden sm:block w-8 lg:w-16 h-px bg-line/80 shrink-0" />

              {/* Step 3: Payment */}
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  3
                </span>
                <span className="text-muted">Payment</span>
              </div>

              <div className="hidden sm:block w-8 lg:w-16 h-px bg-line/80 shrink-0" />

              {/* Step 4: Review */}
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  4
                </span>
                <span className="text-muted">Review</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* TABLET & MOBILE HEADER AREA (lg:hidden)                */}
        {/* ====================================================== */}
        <section className="block lg:hidden mx-auto max-w-[768px] px-4 sm:px-6 pt-5 pb-1">
          {/* Back to Shopping Bag Link */}
          <Link
            href="/bag"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors mb-3 cursor-pointer"
          >
            <ArrowLeftIcon width={13} height={13} />
            <span>Back to Shopping Bag</span>
          </Link>

          <h1 className="font-serif text-3xl sm:text-[34px] font-normal text-ink leading-tight">
            Checkout
          </h1>
          <p className="mt-1 text-[13px] text-ink-soft leading-relaxed">
            Extraordinary pieces. A more meaningful tomorrow.
          </p>

          {/* 4-Step Indicator for Mobile & Tablet (circles on top, labels below) */}
          <div className="mt-6 mb-4 px-1">
            <div className="flex items-start justify-between relative max-w-lg mx-auto">
              {/* Connecting line behind circles */}
              <div className="absolute top-3 sm:top-3.5 left-6 right-6 h-px bg-line/80 -z-0" />

              {/* Step 1: Contact & Delivery (ACTIVE) */}
              <div className="flex flex-col items-center relative z-10 w-20 sm:w-24">
                <span className="size-6 sm:size-7 rounded-full bg-ink text-white font-semibold text-[11px] sm:text-xs grid place-items-center shadow-xs">
                  1
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-ink text-center leading-tight mt-1.5">
                  Contact<br />&amp; Delivery
                </span>
              </div>

              {/* Step 2: Delivery */}
              <div className="flex flex-col items-center relative z-10 w-20 sm:w-24 opacity-60">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  2
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted text-center leading-tight mt-1.5">
                  Delivery
                </span>
              </div>

              {/* Step 3: Payment */}
              <div className="flex flex-col items-center relative z-10 w-20 sm:w-24 opacity-60">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  3
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted text-center leading-tight mt-1.5">
                  Payment
                </span>
              </div>

              {/* Step 4: Review */}
              <div className="flex flex-col items-center relative z-10 w-20 sm:w-24 opacity-60">
                <span className="size-6 sm:size-7 rounded-full border border-line bg-cream-50 text-muted font-medium text-[11px] sm:text-xs grid place-items-center">
                  4
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted text-center leading-tight mt-1.5">
                  Review
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Order Summary Accordion Dropdown (Mobile & Tablet) */}
          <div className="mt-4 rounded-xl border border-line/70 bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-cream-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] sm:text-[13.5px] font-medium text-ink">
                  Order Summary ({totalItemCount} {totalItemCount === 1 ? "item" : "items"})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] sm:text-[14px] font-semibold text-ink">
                  ${total.toLocaleString()}
                </span>
                <ChevronDownIcon
                  width={15}
                  height={15}
                  className={`text-ink/70 transition-transform duration-200 ${
                    isMobileSummaryOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Content */}
            {isMobileSummaryOpen && (
              <div className="px-4 py-4 border-t border-line/50 bg-[#fcfaf7] space-y-4">
                {/* Product items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`mob-${item.id}`}
                      className="pb-4 border-b border-line/40 last:border-b-0 last:pb-0 flex items-start gap-3.5"
                    >
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="72px"
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[64px]">
                        <div>
                          {item.brand && (
                            <p className="text-[11px] text-muted leading-tight mb-0.5">
                              {item.brand}
                            </p>
                          )}
                          <p className="text-[13px] font-medium text-ink leading-snug line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[11.5px] text-muted truncate">
                            {item.specs}
                          </p>
                          {item.size && (
                            <p className="text-[11px] text-ink-soft">
                              Size: {item.size}
                            </p>
                          )}
                          {item.length && (
                            <p className="text-[11px] text-ink-soft">
                              Length: {item.length}
                            </p>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11.5px]">
                            <span className="text-muted">Qty:</span>
                            <div className="relative inline-flex items-center">
                              <select
                                aria-label={`Quantity for ${item.name}`}
                                value={quantities[item.id] ?? item.quantity ?? 1}
                                onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                                className="appearance-none rounded-md border border-line bg-white pl-2 pr-5 py-0.5 text-[11.5px] font-medium text-ink focus:outline-none cursor-pointer shadow-2xs"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute right-1 text-muted">
                                <ChevronDownIcon width={9} height={9} />
                              </span>
                            </div>
                          </div>

                          <p className="font-semibold text-ink text-[13.5px] sm:text-[14px]">
                            ${(item.price * (quantities[item.id] ?? item.quantity ?? 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo or Gift Code Accordion in mobile dropdown */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="w-full flex items-center justify-between rounded-xl bg-white border border-line/70 px-3.5 py-2.5 text-[12.5px] font-medium text-ink transition-colors cursor-pointer"
                  >
                    <span>Promo or Gift code</span>
                    <ChevronDownIcon
                      width={14}
                      height={14}
                      className={`text-ink/70 transition-transform duration-200 ${
                        isPromoOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isPromoOpen && (
                    <form onSubmit={handleApplyPromo} className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter code (e.g. SIDRA10)"
                        className="flex-1 rounded-xl border border-line bg-white px-3 py-2 text-[12px] text-ink placeholder:text-muted focus:border-ink focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-white hover:bg-ink-soft transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 text-[11.5px] font-medium text-emerald-800">
                      <span>Applied: {appliedPromo}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoDiscount(0);
                        }}
                        className="text-emerald-900 underline hover:no-underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Cost breakdown */}
                <div className="border-t border-line/50 pt-3 space-y-2 text-[12.5px]">
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-medium text-ink">${subtotal.toLocaleString()}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="font-medium">-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Delivery</span>
                    <span className="text-[12px] text-muted">Calculated next step</span>
                  </div>
                  <div className="flex items-center justify-between text-ink-soft">
                    <span className="inline-flex items-center gap-1">
                      <span>Estimated taxes</span>
                      <InfoIcon width={12} height={12} className="text-muted" />
                    </span>
                    <span className="font-medium text-ink">${estimatedTaxes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-line/50 pt-2.5">
                    <span className="text-[14px] font-semibold text-ink">Total (USD)</span>
                    <span className="font-serif text-xl font-bold text-ink">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================== */}
        {/* MAIN 2-COLUMN CHECKOUT CONTENT                         */}
        {/* ====================================================== */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Checkout Form (lg:col-span-7)             */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* Account Choice Boxes */}
              <div className="space-y-4">
                {/* 1. Continue as guest */}
                <div className="rounded-2xl border border-[#ebdccb]/70 bg-[#fbf8f4] px-6 sm:px-7 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-ink shrink-0">
                      <UserIcon width={26} height={26} className="stroke-[1.5]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[21px] sm:text-[23px] font-normal text-ink leading-tight">
                        Continue as guest
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-ink-soft mt-1 leading-normal">
                        Fast, secure and simple. No account needed.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      // Smooth scroll to contact section
                      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-[180px] h-[46px] rounded-full bg-ink text-white text-[13px] sm:text-[13.5px] font-medium hover:bg-ink-soft transition-all shrink-0 shadow-sm cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5"
                  >
                    <span>Continue as guest</span>
                    <ArrowRightIcon width={13} height={13} />
                  </button>
                </div>

                {/* or Divider */}
                <div className="relative text-center my-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line/60" />
                  </div>
                  <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted font-medium">
                    or
                  </span>
                </div>

                {/* 2. Already have an account */}
                <div className="rounded-2xl border border-[#ebdccb]/70 bg-[#fbf8f4] px-6 sm:px-7 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-ink shrink-0">
                      <UserIcon width={26} height={26} className="stroke-[1.5]" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[21px] sm:text-[23px] font-normal text-ink leading-tight">
                        Already have an account?
                      </h3>
                      <p className="text-[12.5px] sm:text-[13px] text-ink-soft mt-1 leading-normal">
                        Sign in for a faster checkout and to track your order.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/sign-in"
                    className="w-full sm:w-[180px] h-[46px] rounded-full border border-ink/80 bg-white text-ink text-[13px] sm:text-[13.5px] font-medium hover:bg-cream-100 transition-all shrink-0 shadow-2xs cursor-pointer active:scale-[0.98] flex items-center justify-center"
                  >
                    Sign in
                  </Link>
                </div>
              </div>

              {/* ====================================================== */}
              {/* CONTACT INFORMATION SECTION                            */}
              {/* ====================================================== */}
              <div id="contact-section" className="pt-2">
                <h2 className="font-serif text-2xl font-normal text-ink leading-tight">
                  Contact Information
                </h2>
                <p className="mt-1 text-[13px] text-ink-soft">
                  We&apos;ll use this information to send your order updates.
                </p>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Email address */}
                  <div>
                    <label
                      htmlFor="co-email"
                      className="block text-[12.5px] font-medium text-ink mb-1.5"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="co-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      placeholder="you@email.com"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                          : "border-line focus:border-ink"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11.5px] text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone number */}
                  <div>
                    <label
                      htmlFor="co-phone"
                      className="block text-[12.5px] font-medium text-ink mb-1.5"
                    >
                      Phone number <span className="text-muted text-[11px] font-normal">(optional)</span>
                    </label>
                    <div className="flex">
                      <select
                        aria-label="Country phone code"
                        value={phoneCode}
                        onChange={(e) => setPhoneCode(e.target.value)}
                        className="rounded-l-xl border border-r-0 border-line bg-cream-50 px-2.5 py-2.5 text-[13px] font-medium text-ink focus:border-ink focus:outline-none shadow-2xs cursor-pointer"
                      >
                        {PHONE_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="co-phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="501 234 56 78"
                        className="w-full rounded-r-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                    <p className="mt-1.5 text-[11.5px] text-muted">
                      We&apos;ll only use this number for delivery updates.
                    </p>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* DELIVERY ADDRESS SECTION                               */}
              {/* ====================================================== */}
              <div className="pt-4 border-t border-line/60">
                <h2 className="font-serif text-2xl font-normal text-ink leading-tight">
                  Delivery Address
                </h2>
                <p className="mt-1 text-[13px] text-ink-soft">
                  Where would you like your order to be delivered?
                </p>

                <div className="mt-4 space-y-4">
                  {/* First & Last Name (2 columns on mobile, tablet & desktop) */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        htmlFor="co-firstname"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        First name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="co-firstname"
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                        }}
                        placeholder="John"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                          errors.firstName
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-[11.5px] text-red-500 font-medium">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="co-lastname"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Last name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="co-lastname"
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                        }}
                        placeholder="Doe"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                          errors.lastName
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-[11.5px] text-red-500 font-medium">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Country / Region */}
                  <div>
                    <label
                      htmlFor="co-country"
                      className="block text-[12.5px] font-medium text-ink mb-1.5"
                    >
                      Country / Region <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="co-country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
                        }}
                        className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-[13.5px] text-ink focus:outline-none transition-colors shadow-2xs cursor-pointer ${
                          errors.country
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      >
                        {COUNTRY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted">
                        <ChevronDownIcon width={16} height={16} />
                      </div>
                    </div>
                    {errors.country && (
                      <p className="mt-1 text-[11.5px] text-red-500 font-medium">{errors.country}</p>
                    )}
                  </div>

                  {/* Street address & Apartment */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="co-street"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Street address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="co-street"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => {
                          setStreetAddress(e.target.value);
                          if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: "" }));
                        }}
                        placeholder="Street name and house number"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                          errors.streetAddress
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      />
                      {errors.streetAddress && (
                        <p className="mt-1 text-[11.5px] text-red-500 font-medium">{errors.streetAddress}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="co-apt"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Apartment / Suite <span className="text-muted text-[11px] font-normal">(optional)</span>
                      </label>
                      <input
                        id="co-apt"
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="e.g. Apt 5, Block B"
                        className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* City, State, Postal code (3 columns on mobile, tablet & desktop) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                    <div>
                      <label
                        htmlFor="co-city"
                        className="block text-[12px] sm:text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="co-city"
                        type="text"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                        }}
                        placeholder="Istanbul"
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-[12.5px] sm:text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                          errors.city
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="co-state"
                        className="block text-[12px] sm:text-[12.5px] font-medium text-ink mb-1.5 truncate"
                      >
                        State <span className="hidden sm:inline">/ Province</span> <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="co-state"
                          value={stateProvince}
                          onChange={(e) => {
                            setStateProvince(e.target.value);
                            if (errors.stateProvince) setErrors((prev) => ({ ...prev, stateProvince: "" }));
                          }}
                          className={`w-full appearance-none rounded-xl border bg-white px-2.5 sm:px-3.5 py-2.5 pr-7 sm:pr-9 text-[12.5px] sm:text-[13.5px] text-ink focus:outline-none transition-colors shadow-2xs cursor-pointer ${
                            errors.stateProvince
                              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                              : "border-line focus:border-ink"
                          }`}
                        >
                          <option value="">Select</option>
                          <option value="Istanbul">Istanbul</option>
                          <option value="Ankara">Ankara</option>
                          <option value="Izmir">Izmir</option>
                          <option value="Baku">Baku</option>
                          <option value="London">London</option>
                          <option value="New York">New York</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 text-muted">
                          <ChevronDownIcon width={13} height={13} />
                        </div>
                      </div>
                      {errors.stateProvince && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.stateProvince}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="co-postal"
                        className="block text-[12px] sm:text-[12.5px] font-medium text-ink mb-1.5 truncate"
                      >
                        Postal code <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="co-postal"
                        type="text"
                        value={postalCode}
                        onChange={(e) => {
                          setPostalCode(e.target.value);
                          if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: "" }));
                        }}
                        placeholder="34000"
                        className={`w-full rounded-xl border bg-white px-3 py-2.5 text-[12.5px] sm:text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                          errors.postalCode
                            ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                            : "border-line focus:border-ink"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="mt-6 space-y-3.5">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <span className="text-[12.5px] text-ink-soft leading-snug">
                      Save this information for next time (optional)
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sameBilling}
                      onChange={(e) => setSameBilling(e.target.checked)}
                      className="mt-0.5 size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                    />
                    <div>
                      <span className="text-[12.5px] font-medium text-ink leading-snug block">
                        Billing address same as delivery address
                      </span>
                      <span className="text-[11.5px] text-muted mt-0.5 block">
                        You can change this in the next step if needed.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Continue to Delivery CTA (Mobile & Tablet only: block lg:hidden) */}
                <div className="block lg:hidden mt-6">
                  <button
                    type="button"
                    onClick={handleContinueToDelivery}
                    className="w-full rounded-full bg-ink py-4 text-[14px] font-semibold text-white shadow-md hover:bg-ink-soft transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue to Delivery</span>
                    <ArrowRightIcon width={14} height={14} />
                  </button>
                </div>

                {/* 4 Trust Icons (TABLET ONLY: hidden md:grid lg:hidden) */}
                <div className="hidden md:grid lg:hidden grid-cols-4 gap-4 pt-8 pb-3 border-t border-line/40 text-center">
                  <div className="flex flex-col items-center text-center">
                    <CreditCardIcon width={22} height={22} className="text-ink mb-1.5" />
                    <span className="text-[11px] font-medium text-ink leading-tight">
                      Secure<br />Payments
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <TruckIcon width={22} height={22} className="text-ink mb-1.5" />
                    <span className="text-[11px] font-medium text-ink leading-tight">
                      Global<br />Delivery
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <RefreshArrowsIcon width={22} height={22} className="text-ink mb-1.5" />
                    <span className="text-[11px] font-medium text-ink leading-tight">
                      Easy<br />Returns
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <DiamondIcon width={22} height={22} className="text-ink mb-1.5" />
                    <span className="text-[11px] font-medium text-ink leading-tight">
                      Authenticity<br />Guaranteed
                    </span>
                  </div>
                </div>

                {/* Bottom Return to bag link (Desktop only: hidden lg:block) */}
                <div className="hidden lg:block mt-8 pt-2">
                  <Link
                    href="/bag"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-ink underline underline-offset-4 hover:text-black transition-colors cursor-pointer"
                  >
                    <ArrowLeftIcon width={14} height={14} />
                    <span>Return to bag</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Order Summary (hidden on tablet & mobile) */}
            {/* ====================================================== */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
                {/* Header */}
                <div className="flex items-baseline justify-between border-b border-line/50 pb-3.5">
                  <div>
                    <h2 className="font-serif text-2xl font-normal text-ink">
                      Order Summary
                    </h2>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {totalItemCount} items in your bag
                    </p>
                  </div>
                  <Link
                    href="/bag"
                    className="text-[12.5px] font-medium text-ink underline underline-offset-2 hover:text-black cursor-pointer"
                  >
                    Edit
                  </Link>
                </div>

                {/* Product List */}
                <div className="space-y-5 pt-1">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="pb-5 border-b border-line/40 last:border-b-0 last:pb-1 flex items-start gap-4"
                    >
                      {/* Product Thumbnail (enlarged, no padding, no background box) */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>

                      {/* Details & Bottom Row */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[84px] sm:min-h-[96px]">
                        <div>
                          {item.brand && (
                            <p className="text-[12px] text-muted leading-tight mb-0.5">
                              {item.brand}
                            </p>
                          )}
                          <p className="text-[13.5px] sm:text-[14px] font-medium text-ink leading-snug">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-[12px] text-muted">
                            {item.specs}
                          </p>
                          {item.size && (
                            <p className="text-[12px] text-ink-soft mt-0.5">
                              Size: {item.size}
                            </p>
                          )}
                          {item.length && (
                            <p className="text-[12px] text-ink-soft mt-0.5">
                              Length: {item.length}
                            </p>
                          )}
                        </div>

                        {/* Bottom row: Qty on left, Price on bottom-right */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[12px]">
                            <span className="text-muted">Qty:</span>
                            <div className="relative inline-flex items-center">
                              <select
                                aria-label={`Quantity for ${item.name}`}
                                value={quantities[item.id] ?? item.quantity ?? 1}
                                onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                                className="appearance-none rounded-md border border-line bg-white pl-2 pr-6 py-0.5 text-[12px] font-medium text-ink focus:outline-none cursor-pointer shadow-2xs"
                              >
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute right-1.5 text-muted">
                                <ChevronDownIcon width={10} height={10} />
                              </span>
                            </div>
                          </div>

                          {/* Price at bottom right */}
                          <p className="font-semibold text-ink text-[15px] sm:text-[16px]">
                            ${(item.price * (quantities[item.id] ?? item.quantity ?? 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo or Gift Code Accordion Dropdown Box */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPromoOpen(!isPromoOpen)}
                    className="w-full flex items-center justify-between rounded-xl bg-[#f7f6f5] hover:bg-[#f1efeb] border border-line/70 px-4 py-3 text-[13px] font-medium text-ink transition-colors cursor-pointer"
                  >
                    <span>Promo or Gift code</span>
                    <ChevronDownIcon
                      width={15}
                      height={15}
                      className={`text-ink/70 transition-transform duration-200 ${
                        isPromoOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  {isPromoOpen && (
                    <form onSubmit={handleApplyPromo} className="mt-2.5 flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Enter code (e.g. SIDRA10)"
                        className="flex-1 rounded-xl border border-line bg-cream-50 px-3.5 py-2 text-[12.5px] text-ink placeholder:text-muted focus:border-ink focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-ink-soft transition-colors cursor-pointer shadow-2xs"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {appliedPromo && (
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 text-[12px] font-medium text-emerald-800">
                      <span>Applied: {appliedPromo}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoDiscount(0);
                        }}
                        className="text-emerald-900 underline hover:no-underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="border-t border-line/60 pt-4 space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-medium text-ink">${subtotal.toLocaleString()}</span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex items-center justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="font-medium">-${promoDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-ink-soft">
                    <span>Delivery</span>
                    <span className="text-[12.5px] text-muted">Calculated next step</span>
                  </div>

                  <div className="flex items-center justify-between text-ink-soft">
                    <span className="inline-flex items-center gap-1">
                      <span>Estimated taxes</span>
                      <InfoIcon width={13} height={13} className="text-muted" />
                    </span>
                    <span className="font-medium text-ink">${estimatedTaxes.toLocaleString()}</span>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between border-t border-line/60 pt-3.5">
                    <span className="text-[15px] font-semibold text-ink">Total (USD)</span>
                    <span className="font-serif text-2xl font-bold text-ink">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 4 Trust Guarantee Items inside summary */}
                <div className="border-t border-line/60 pt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <CreditCardIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Secure Payments</p>
                      <p className="text-[11px] text-muted">Your information is encrypted</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <TruckIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Insured Global Delivery</p>
                      <p className="text-[11px] text-muted">To 100+ countries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <RefreshArrowsIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Easy Returns</p>
                      <p className="text-[11px] text-muted">Hassle-free within 30 days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <DiamondIcon width={18} height={18} />
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">Authenticity Guaranteed</p>
                      <p className="text-[11px] text-muted">Every piece is verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue to Delivery CTA (below summary card, matching design) */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleContinueToDelivery}
                  className="w-full rounded-full bg-ink py-4 text-[14px] font-semibold text-white shadow-md hover:bg-ink-soft transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRightIcon width={14} height={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
