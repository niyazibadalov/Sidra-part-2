"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  MailIcon,
  ArrowLeftIcon,
  LockIcon,
  XCircleIcon,
  CheckCircleIcon,
  CheckIcon,
  AlertTriangleIcon,
  AlertCircleIcon,
} from "@/components/Icons";
import forgotHeroImg from "@/app/images/forgotHero.png";
import heroSecImg from "@/app/images/heroSecImg.jpeg";

type FormState = "idle" | "success" | "rate_limited";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [requestCount, setRequestCount] = useState(0);
  const [countdown, setCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  // Countdown timer for rate limited state
  useEffect(() => {
    if (formState !== "rate_limited") return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setFormState("idle");
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [formState]);

  const validateEmail = (val: string) => {
    // Standard email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsLoading(true);

    // If submitted more than 2 times rapidly, demonstrate rate limiting state
    if (requestCount >= 2) {
      setTimeout(() => {
        setIsLoading(false);
        setFormState("rate_limited");
        setCountdown(60);
        setRequestCount(0);
      }, 500);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setFormState("success");
      setRequestCount((prev) => prev + 1);
    }, 600);
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* ====================================================== */}
        {/* MOBILE & TABLET TOP HERO BANNER STRIP (lg:hidden)      */}
        {/* ====================================================== */}
        <div className="relative w-full overflow-hidden border-b border-line/70 bg-cream-100 min-h-[170px] sm:min-h-[200px] md:min-h-[225px] lg:hidden">
          {/* Mobile Image: forgotHeroImg (rings on stone) */}
          <div className="sm:hidden absolute inset-0">
            <Image
              src={forgotHeroImg}
              alt="Sidra Fine Jewellery"
              fill
              priority
              className="object-cover object-[80%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf7]/95 via-[#fcfaf7]/80 to-transparent pointer-events-none" />
          </div>

          {/* Tablet Image: heroSecImg (single eternity ring on champagne silk) */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src={heroSecImg}
              alt="Sidra Fine Jewellery"
              fill
              priority
              className="object-cover object-[80%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf7]/95 via-[#fcfaf7]/75 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 py-5 sm:py-7 flex items-center h-full min-h-[170px] sm:min-h-[200px] md:min-h-[225px]">
            {/* Mobile Text (sm:hidden) */}
            <div className="sm:hidden max-w-[210px]">
              <h2 className="font-serif text-[22px] font-normal text-ink leading-[1.2]">
                Reset Your<br />Password
              </h2>
              <p className="mt-2 text-[12px] text-ink-soft leading-snug">
                Get back to your jewellery<br />journey with SIDRA.
              </p>
            </div>

            {/* Tablet Text (hidden sm:block) */}
            <div className="hidden sm:block max-w-sm">
              <h2 className="font-serif text-2xl md:text-[28px] font-normal text-ink leading-[1.2]">
                Your Jewellery<br />Journey Continues
              </h2>
              <p className="mt-2.5 text-[12.5px] md:text-[13px] text-ink-soft leading-relaxed">
                Reset your password and get back<br />to what you love.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MAIN 50/50 SPLIT SECTION                               */}
        {/* ====================================================== */}
        <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:pt-0 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-stretch">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Hero Banner with Image (Exact 50% split)  */}
            {/* ====================================================== */}
            <div className="relative hidden lg:flex flex-col justify-between overflow-hidden shadow-2xs min-h-[720px] p-8 xl:p-12">
              <Image
                src={forgotHeroImg}
                alt="Sidra Fine Jewellery - Timeless Connections"
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
                  Timeless Connections
                </h2>
                <p className="mt-3.5 text-[14px] xl:text-[15px] text-ink-soft leading-relaxed max-w-sm">
                  Your next favourite piece is just a few clicks away. Sign in
                  and continue your jewellery journey with SIDRA.
                </p>
              </div>

              {/* Lower Section: Accent line and 3 uppercase perks */}
              <div className="relative z-10 mt-auto pt-16">
                <div className="w-12 h-0.5 bg-[#b8875f] mb-4" />
                <div className="space-y-1.5 text-[11px] xl:text-[11.5px] font-semibold tracking-wider text-ink/85 uppercase">
                  <p>EXCEPTIONAL JEWELLERY</p>
                  <p>GLOBAL SUPPLIERS</p>
                  <p>TRUSTED MARKETPLACE</p>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Forgot Password Form & States            */}
            {/* ====================================================== */}
            <div className="flex flex-col justify-center py-4 lg:py-6">
              <div className="w-full max-w-[460px] mx-auto">
                {/* ---------------------------------------------------- */}
                {/* 1. STATE: SUCCESS (Reset Link Sent)                  */}
                {/* ---------------------------------------------------- */}
                {formState === "success" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3.5">
                      <div className="text-emerald-700 shrink-0 mt-0.5">
                        <CheckCircleIcon width={36} height={36} className="text-emerald-600" />
                      </div>
                      <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                          Reset Link Sent
                        </h1>
                        <p className="mt-1 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed">
                          If an account exists for this email, we&apos;ve sent password reset instructions.
                        </p>
                      </div>
                    </div>

                    {/* 3 Green Checklist Info Box */}
                    <div className="rounded-xl border border-emerald-200/80 bg-[#f4f9f4] p-4 space-y-2.5 text-[12.5px] text-ink">
                      <div className="flex items-center gap-2.5">
                        <CheckIcon width={16} height={16} className="text-emerald-700 shrink-0 stroke-[2.2]" />
                        <span>Check your inbox and spam folder.</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckIcon width={16} height={16} className="text-emerald-700 shrink-0 stroke-[2.2]" />
                        <span>The link expires in 1 hour.</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <CheckIcon width={16} height={16} className="text-emerald-700 shrink-0 stroke-[2.2]" />
                        <span>For security, the link can only be used once.</span>
                      </div>
                    </div>

                    <Link
                      href="/sign-in"
                      className="w-full flex items-center justify-center rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Back to Sign In
                    </Link>

                    {/* Button to try again / reset form state */}
                    <button
                      type="button"
                      onClick={() => {
                        setFormState("idle");
                        setEmail("");
                        setError(null);
                      }}
                      className="w-full text-center text-[12.5px] font-medium text-rose-gold-dark hover:underline cursor-pointer"
                    >
                      Did not receive the link? Try another email
                    </button>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 2. STATE: RATE LIMITED (Too Many Requests)           */}
                {/* ---------------------------------------------------- */}
                {formState === "rate_limited" && (
                  <div className="space-y-6">
                    <div className="flex items-start gap-3.5">
                      <div className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                        <AlertTriangleIcon width={24} height={24} className="stroke-[1.8]" />
                      </div>
                      <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                          Too Many Requests
                        </h1>
                        <p className="mt-1 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed">
                          Please wait a few minutes before requesting another reset link.
                        </p>
                      </div>
                    </div>

                    {/* Amber countdown notification box */}
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 sm:p-4 flex items-center gap-3 text-amber-900 text-[12.5px]">
                      <AlertCircleIcon width={18} height={18} className="shrink-0 text-amber-700 stroke-[1.8]" />
                      <p className="font-medium">
                        You can try again in {countdown} seconds.
                      </p>
                    </div>

                    <Link
                      href="/sign-in"
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 transition-colors"
                    >
                      <ArrowLeftIcon width={14} height={14} />
                      <span>Back to Sign In</span>
                    </Link>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 3. STATE: DEFAULT IDLE FORM (with Email Validation)  */}
                {/* ---------------------------------------------------- */}
                {formState === "idle" && (
                  <>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal text-ink leading-tight">
                      Forgot Password?
                    </h1>
                    <p className="mt-1.5 text-[14px] sm:text-[14.5px] text-ink-soft leading-relaxed">
                      Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* Email address field with mail icon & error state */}
                      <div>
                        <label
                          htmlFor="forgot-email"
                          className="block text-[12.5px] font-medium text-ink mb-1.5"
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                            <MailIcon width={18} height={18} className="stroke-[1.5]" />
                          </div>

                          <input
                            id="forgot-email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (error) setError(null);
                            }}
                            placeholder="you@example.com"
                            className={`w-full rounded-lg border bg-white pl-10 pr-10 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                              error
                                ? "border-red-500 focus:border-red-500 bg-red-50/20"
                                : "border-line focus:border-ink"
                            }`}
                          />

                          {/* Red (X) Icon inside input when in error state */}
                          {error && (
                            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-red-500">
                              <XCircleIcon width={18} height={18} />
                            </div>
                          )}
                        </div>

                        {/* Red error message */}
                        {error && (
                          <p className="mt-1.5 text-[12px] text-red-600 font-medium">
                            {error}
                          </p>
                        )}
                      </div>

                      {/* Primary CTA: Send Reset Link */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? "Sending Link..." : "Send Reset Link"}
                      </button>

                      {/* or divider */}
                      <div className="relative my-4 text-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-line/80" />
                        </div>
                        <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted">
                          or
                        </span>
                      </div>

                      {/* Back to Sign In button */}
                      <Link
                        href="/sign-in"
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-colors"
                      >
                        <ArrowLeftIcon width={14} height={14} />
                        <span>Back to Sign In</span>
                      </Link>
                    </form>

                    {/* Secure and private info card */}
                    <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#ebdccb] bg-[#fbf5ee] p-3.5 sm:p-4 text-ink shadow-2xs">
                      <div className="text-ink mt-0.5 shrink-0">
                        <LockIcon width={22} height={22} className="stroke-[1.5]" />
                      </div>
                      <div className="text-[12px] leading-relaxed">
                        <p className="font-semibold text-ink">Secure and private</p>
                        <p className="text-ink-soft mt-0.5">
                          The reset link is time-limited and can only be used once. For your security, we will not share whether an account exists for this email.
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {/* ---------------------------------------------------- */}
                {/* STATE DEMO SWITCHER PILLS (to easily view all 3 states)*/}
                {/* ---------------------------------------------------- */}
                <div className="mt-10 pt-6 border-t border-line/50 text-center">
                  <p className="text-[11px] font-medium text-muted uppercase tracking-wider mb-2">
                    Preview States (Demo):
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setFormState("idle");
                        setError(null);
                        setEmail("");
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        formState === "idle" && !error
                          ? "bg-ink text-white border-ink"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Default Form
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormState("idle");
                        setEmail("huseyn@");
                        setError("Please enter a valid email address.");
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        error
                          ? "bg-red-600 text-white border-red-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Email Error State
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormState("success");
                        setError(null);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        formState === "success"
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Success State
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFormState("rate_limited");
                        setCountdown(60);
                        setError(null);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        formState === "rate_limited"
                          ? "bg-amber-600 text-white border-amber-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Rate Limit State
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
