"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  DiamondIcon,
  GlobeIcon,
  LeafIcon,
  TruckIcon,
  RefreshArrowsIcon,
  ShieldCheckIcon,
  BagIcon,
  EyeIcon,
  EyeOffIcon,
  AppleIcon,
  GoogleIcon,
  MailIcon,
  ArrowLeftIcon,
} from "@/components/Icons";
import signInHeroImg from "@/app/images/signInHero.png";

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

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulated sign in experience
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedMessage("Welcome back! Redirecting to your account...");
    }, 800);
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* Main 2-Column 50/50 Split Section within standard max-w-[1440px] layout */}
        <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-stretch">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Hero Banner with Image (Exact 50% split)  */}
            {/* ====================================================== */}
            <div className="relative hidden lg:flex flex-col justify-between overflow-hidden shadow-2xs min-h-[820px] p-8 xl:p-12">
              <Image
                src={signInHeroImg}
                alt="Sidra Fine Jewellery"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* Soft overlay gradient ensuring clean typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent pointer-events-none" />

              {/* Top Text Content */}
              <div className="relative z-10 max-w-md pt-2 xl:pt-4">
                <h2 className="font-serif text-3xl xl:text-4xl 2xl:text-[46px] font-normal text-ink leading-[1.15] tracking-tight">
                  Welcome Back
                </h2>
                <p className="mt-2.5 font-serif text-xl xl:text-2xl text-ink/90 font-normal leading-snug">
                  More Than Jewellery.
                  <br />
                  Your Story Continues.
                </p>
                <div className="mt-4 w-12 h-0.5 bg-ink/35" />
                <p className="mt-3.5 text-[13.5px] xl:text-[14px] text-ink-soft leading-relaxed max-w-sm">
                  Sign in to access your wishlist, track your orders and enjoy a
                  more personalised experience.
                </p>
              </div>

              {/* Lower Section: Callout & 3 Icons */}
              <div className="relative z-10 mt-auto pt-12">
                {/* Script phrase callout */}
                <div className="mb-6 pl-1">
                  <p className="font-script text-3xl xl:text-4xl text-ink/90 -rotate-3 leading-tight select-none">
                    A More
                    <br />
                    Beautiful
                    <br />
                    Tomorrow
                  </p>
                </div>

                {/* 3 Icons across the bottom */}
                <div className="grid grid-cols-3 gap-2 xl:gap-4 pt-5 text-ink">
                  <div className="flex items-center gap-2">
                    <DiamondIcon
                      width={25}
                      height={25}
                      className="shrink-0 stroke-[1.4]"
                    />
                    <span className="text-[11.5px] xl:text-[12px] font-medium leading-tight">
                      Timeless Craftsmanship
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <GlobeIcon
                      width={25}
                      height={25}
                      className="shrink-0 stroke-[1.4]"
                    />
                    <span className="text-[11.5px] xl:text-[12px] font-medium leading-tight">
                      A More Beautiful Tomorrow
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <LeafIcon
                      width={25}
                      height={25}
                      className="shrink-0 stroke-[1.4]"
                    />
                    <span className="text-[11.5px] xl:text-[12px] font-medium leading-tight">
                      Jewellery Lives Further
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Sign In Form (Exact 50% split)           */}
            {/* ====================================================== */}
            <div className="flex flex-col justify-center py-4 lg:py-6">
              <div className="w-full max-w-[460px] mx-auto">
                {/* Back to Home Link */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors mb-6 cursor-pointer"
                >
                  <ArrowLeftIcon width={14} height={14} />
                  <span>Back to Home</span>
                </Link>

                {/* Main Heading */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-ink leading-tight">
                  Sign In
                </h1>
                <p className="mt-1 text-[14px] sm:text-[14.5px] text-ink-soft">
                  Welcome back to Sidra.
                </p>

                {/* Wishlist Notice Box */}
                <div className="my-5 flex items-start gap-3 rounded-xl border border-[#ebdccb] bg-[#fbf5ee] p-3.5 sm:p-4 text-ink shadow-2xs">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/90 border border-[#e5d6c5] text-ink shadow-2xs">
                    <BagIcon width={18} height={18} className="stroke-[1.4]" />
                  </div>
                  <div className="text-[12.5px] sm:text-[13px] leading-snug">
                    <p className="font-semibold text-ink">
                      Sign in to continue to your wishlist.
                    </p>
                    <p className="text-ink-soft mt-0.5">
                      You&apos;ll return to where you left off.
                    </p>
                  </div>
                </div>

                {submittedMessage && (
                  <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200/80 p-3 text-[13px] font-medium text-emerald-800">
                    {submittedMessage}
                  </div>
                )}

                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="signin-email"
                      className="block text-[12.5px] font-medium text-ink mb-1.5"
                    >
                      Email address
                    </label>
                    <input
                      id="signin-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>

                  {/* Password Input with Visibility Toggle */}
                  <div>
                    <label
                      htmlFor="signin-password"
                      className="block text-[12.5px] font-medium text-ink mb-1.5"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-line bg-white pl-3.5 pr-10 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors cursor-pointer p-1"
                      >
                        {showPassword ? (
                          <EyeOffIcon width={16} height={16} />
                        ) : (
                          <EyeIcon width={16} height={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-[12.5px] pt-0.5">
                    <label className="flex items-center gap-2 text-ink-soft cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-4 rounded border-line accent-ink cursor-pointer"
                      />
                      <span>Remember me</span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="font-medium text-rose-gold-dark hover:underline transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                {/* Or Continue With Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line/80" />
                  </div>
                  <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted">
                    or continue with
                  </span>
                </div>

                {/* Social Sign In Buttons */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-line bg-white py-2.5 px-4 text-[13px] font-medium text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-all cursor-pointer"
                  >
                    <AppleIcon width={17} height={17} />
                    <span>Continue with Apple</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-line bg-white py-2.5 px-4 text-[13px] font-medium text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-all cursor-pointer"
                  >
                    <GoogleIcon width={17} height={17} />
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-lg border border-line bg-white py-2.5 px-4 text-[13px] font-medium text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-all cursor-pointer"
                  >
                    <MailIcon width={17} height={17} className="stroke-[1.5]" />
                    <span>Email me a sign-in link</span>
                  </button>
                </div>

                {/* New to Sidra Section */}
                <div className="mt-7 text-center">
                  <p className="text-[12.5px] text-muted mb-2">New to Sidra?</p>
                  <Link
                    href="/join"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-line bg-white py-2.5 px-4 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-all cursor-pointer"
                  >
                    Create Account
                  </Link>
                </div>

                {/* Security Note Card */}
                <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#ebdccb] bg-[#fbf5ee] p-3.5 sm:p-4 text-ink shadow-2xs">
                  <div className="text-ink mt-0.5 shrink-0">
                    <ShieldCheckIcon width={20} height={20} className="stroke-[1.5]" />
                  </div>
                  <div className="text-[12px] leading-relaxed">
                    <p className="font-semibold text-ink">Your security matters</p>
                    <p className="text-ink-soft mt-0.5">
                      We use industry-standard encryption to keep your information
                      safe. You can enable two-factor authentication after sign in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Trust Badges Directly Above Footer with clean top divider */}
        <section
          aria-label="Buyer protection and guarantees"
          className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10 border-t border-line/60"
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
                    className="shrink-0 text-ink sm:size-6"
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
      </main>

      <Footer />
    </>
  );
}
