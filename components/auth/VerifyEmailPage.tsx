"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MailIcon,
  LockIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckIcon,
  AlertCircleIcon,
  ClockIcon,
  PaperPlaneSolidIcon,
} from "@/components/Icons";
import { useAuth } from "@/context/AuthContext";
import verifyEmailImg from "@/app/images/verifyEmailImg.png";
import verifyEmailMiniImg from "@/app/images/verifyEmailMini.png";

type VerificationState =
  | "default"
  | "invalid_code"
  | "expired_code"
  | "rate_limited"
  | "success"
  | "new_code_sent";

export function VerifyEmailPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [verState, setVerState] = useState<VerificationState>("default");
  const [countdown, setCountdown] = useState(54);
  const [rateLimitCountdown, setRateLimitCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Format masked email: e.g. "huse***@gmail.com"
  const rawEmail = currentUser?.email || "huseyn@gmail.com";
  const [username, domain] = rawEmail.split("@");
  const maskedEmail =
    username.length > 4
      ? `${username.slice(0, 4)}***@${domain || "gmail.com"}`
      : `${username.slice(0, 2)}***@${domain || "gmail.com"}`;

  // Resend Countdown Timer (starts at 54s)
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Rate Limit Countdown Timer (60s)
  useEffect(() => {
    if (verState !== "rate_limited" || rateLimitCountdown <= 0) return;
    const timer = setInterval(() => {
      setRateLimitCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVerState("default");
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [verState, rateLimitCountdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric single character
    const sanitized = value.replace(/[^0-9]/g, "");
    if (!sanitized && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = sanitized.slice(-1);
    setOtp(newOtp);

    if (verState === "invalid_code") {
      setVerState("default");
    }

    // Auto-advance to next input if filled
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);
    const lastFilled = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilled]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      setVerState("invalid_code");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Example verification condition: code "000000" triggers expired, anything else valid
      if (code === "000000") {
        setVerState("expired_code");
      } else if (code === "111111") {
        setVerState("invalid_code");
      } else {
        setVerState("success");
      }
    }, 600);
  };

  const handleSendNewCode = () => {
    setVerState("new_code_sent");
    setCountdown(60);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
        {/* ====================================================== */}
        {/* TABLET HERO BANNER (Visible only on md: & < lg)       */}
        {/* Large hero image at top with Back to Sign In button   */}
        {/* ====================================================== */}
        <div className="hidden md:block lg:hidden mx-auto max-w-[1440px] px-6 pt-6">
          <div className="relative w-full h-[220px] sm:h-[250px] rounded-2xl overflow-hidden shadow-2xs border border-line/60">
            <Image
              src={verifyEmailImg}
              alt="Sidra Fine Jewellery - Verify Your Email"
              fill
              priority
              className="object-cover object-[center_68%]"
            />
            {/* Soft gradient to ensure Back to Sign In button pops */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none" />

            {/* Back to Sign In on Top-Left */}
            <div className="absolute top-4 left-4 z-10">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-line px-3.5 py-1.5 text-[12.5px] font-medium text-ink shadow-2xs hover:bg-white transition-colors"
              >
                <ArrowLeftIcon width={13} height={13} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MAIN LAYOUT SECTION                                    */}
        {/* ====================================================== */}
        <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:pt-0 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Hero Banner (Desktop only - lg:col-span-5)*/}
            {/* ====================================================== */}
            <div className="relative hidden lg:flex flex-col justify-between overflow-hidden shadow-2xs min-h-[760px] p-8 xl:p-12 lg:col-span-5">
              <Image
                src={verifyEmailImg}
                alt="Sidra Fine Jewellery - One More Step"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />

              {/* Soft overlay gradient ensuring clean typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/10 to-transparent pointer-events-none" />

              {/* Top Text Content */}
              <div className="relative z-10 max-w-md pt-2 xl:pt-4">
                <h2 className="font-serif text-3xl xl:text-4xl 2xl:text-[46px] font-normal text-ink leading-[1.12] tracking-tight">
                  One<br />
                  More Step
                </h2>
                <p className="mt-4 text-[14px] xl:text-[15px] text-ink-soft leading-relaxed max-w-sm">
                  Verify your email to<br />
                  keep your account secure<br />
                  and access the world of<br />
                  fine jewellery.
                </p>
              </div>

              {/* Lower Section: Accent line and 2 uppercase copy lines */}
              <div className="relative z-10 mt-auto pt-16">
                <div className="w-12 h-0.5 bg-[#b8875f] mb-4" />
                <div className="space-y-1 text-[11px] xl:text-[11.5px] font-semibold tracking-wider text-ink/85 uppercase">
                  <p>TRUSTED JEWELLERY.</p>
                  <p>BRIGHTER JOURNEYS.</p>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT AREA: Verification Form + States + Sidebar       */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 flex flex-col xl:flex-row gap-8 xl:gap-10 justify-between items-start pt-2 lg:pt-10">
              {/* CENTER COLUMN: OTP Form and Different States */}
              <div className="w-full max-w-[440px] mx-auto xl:mx-0">
                {/* ---------------------------------------------------- */}
                {/* 1. STATE: SUCCESS STATE (Email Verified)             */}
                {/* ---------------------------------------------------- */}
                {verState === "success" && (
                  <div className="rounded-2xl border border-emerald-100 bg-[#f4f9f4] p-6 sm:p-8 space-y-6 text-center">
                    <div className="mx-auto size-14 rounded-full bg-emerald-600 text-white grid place-items-center shadow-xs">
                      <CheckIcon width={26} height={26} strokeWidth={2.5} />
                    </div>

                    <div>
                      <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink leading-tight">
                        Email Verified
                      </h1>
                      <p className="mt-2 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed max-w-xs mx-auto">
                        Your email address has been successfully verified. You can now continue to your account.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer"
                      >
                        Continue
                      </button>

                      <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-ink hover:underline pt-1"
                      >
                        <span>Go to My Account</span>
                        <ArrowRightIcon width={13} height={13} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 2. STATE: NEW CODE SENT (Confirmation)               */}
                {/* ---------------------------------------------------- */}
                {verState === "new_code_sent" && (
                  <div className="rounded-2xl border border-[#ebdccb]/60 bg-[#fbfbf8] p-6 sm:p-8 space-y-6 text-center shadow-2xs">
                    <div className="flex justify-center pt-1">
                      <PaperPlaneSolidIcon className="size-8" />
                    </div>

                    <div>
                      <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink leading-tight">
                        A New Code Has Been Sent
                      </h1>
                      <p className="mt-2 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed max-w-sm mx-auto">
                        We&apos;ve sent a new 6-digit verification code to <span className="font-medium text-ink">{maskedEmail}</span>.<br />
                        Please check your inbox (and spam folder).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setVerState("default")}
                      className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Enter Verification Code
                    </button>

                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors"
                    >
                      <ArrowLeftIcon width={13} height={13} />
                      <span>Back to Sign In</span>
                    </Link>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 3. DEFAULT & ERROR STATES FORM                       */}
                {/* ---------------------------------------------------- */}
                {verState !== "success" && verState !== "new_code_sent" && (
                  <>
                    <p className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1">
                      Email Verification
                    </p>
                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink leading-tight">
                      Verify Your Email
                    </h1>
                    <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-ink-soft leading-relaxed">
                      We&apos;ve sent a 6-digit verification code to{" "}
                      <span className="font-semibold text-ink">{maskedEmail}</span>
                    </p>
                    <p className="text-[13px] text-ink-soft mt-0.5">
                      Enter the code below to verify your email address.
                    </p>

                    {/* Top Error Notification Banner for specific states */}
                    {verState === "invalid_code" && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-[12.5px] font-medium text-red-600">
                        The code you entered is incorrect. Please check and try again.
                      </div>
                    )}

                    {verState === "expired_code" && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-[12.5px] font-medium text-red-600">
                        This verification code has expired. Please request a new code and try again.
                      </div>
                    )}

                    {verState === "rate_limited" && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50/70 p-3.5 text-[12.5px] font-medium text-red-600">
                        You&apos;ve requested a new code too many times. Please wait a moment before trying again.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* 6 OTP Input Boxes */}
                      <div className="flex items-center justify-between gap-2 sm:gap-2.5">
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              inputRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(idx, e)}
                            onPaste={idx === 0 ? handlePaste : undefined}
                            disabled={verState === "expired_code" || verState === "rate_limited"}
                            className={`size-11 sm:size-13 text-center text-lg sm:text-xl font-semibold rounded-lg border transition-all shadow-2xs focus:outline-none ${
                              verState === "invalid_code"
                                ? "border-red-500 bg-red-50/20 text-red-600 focus:border-red-500"
                                : "border-line bg-white text-ink focus:border-ink"
                            } ${
                              verState === "expired_code" || verState === "rate_limited"
                                ? "bg-cream-100 opacity-60 cursor-not-allowed"
                                : ""
                            }`}
                          />
                        ))}
                      </div>

                      {/* Error notice below inputs */}
                      {verState === "invalid_code" && (
                        <div className="flex items-center gap-1.5 pt-1 text-[12px] text-red-600 font-medium">
                          <AlertCircleIcon width={15} height={15} className="shrink-0 stroke-[2]" />
                          <span>The code is incorrect. Please try again.</span>
                        </div>
                      )}

                      {verState === "expired_code" && (
                        <div className="flex items-center gap-1.5 pt-1 text-[12px] text-red-600 font-medium">
                          <ClockIcon width={15} height={15} className="shrink-0 stroke-[2]" />
                          <span>This code has expired. Please request a new code.</span>
                        </div>
                      )}

                      {verState === "rate_limited" && (
                        <div className="flex items-center gap-1.5 pt-1 text-[12px] text-red-600 font-medium">
                          <ClockIcon width={15} height={15} className="shrink-0 stroke-[2]" />
                          <span>Please wait {rateLimitCountdown} seconds before requesting a new code.</span>
                        </div>
                      )}

                      {/* Conditional Buttons depending on state */}
                      {verState === "expired_code" ? (
                        <>
                          <button
                            type="button"
                            onClick={handleSendNewCode}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer mt-3"
                          >
                            <MailIcon width={17} height={17} className="stroke-[1.6]" />
                            <span>Send a New Code</span>
                          </button>

                          <div className="relative my-4 text-center">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-line/80" />
                            </div>
                            <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted">
                              or
                            </span>
                          </div>

                          <Link
                            href="/sign-in"
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-colors"
                          >
                            <ArrowLeftIcon width={14} height={14} />
                            <span>Back to Sign In</span>
                          </Link>
                        </>
                      ) : (
                        <>
                          {/* Primary CTA: Verify Email */}
                          <button
                            type="submit"
                            disabled={isLoading || verState === "rate_limited"}
                            className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-3"
                          >
                            {isLoading ? "Verifying..." : "Verify Email"}
                          </button>

                          {/* Resend Countdown Link */}
                          <div className="text-center pt-2">
                            <p className="text-[12.5px] text-ink-soft">
                              Didn&apos;t receive the code?{" "}
                              {countdown > 0 ? (
                                <span className="font-semibold text-amber-700">
                                  Resend in 00:{countdown.toString().padStart(2, "0")}
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleSendNewCode}
                                  className="font-semibold text-ink underline cursor-pointer hover:text-black"
                                >
                                  Resend Code
                                </button>
                              )}
                            </p>
                          </div>

                          {/* Or Divider */}
                          <div className="relative my-4 text-center">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-line/80" />
                            </div>
                            <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted">
                              or
                            </span>
                          </div>

                          {/* Send a New Code Button */}
                          <button
                            type="button"
                            onClick={handleSendNewCode}
                            disabled={verState === "rate_limited"}
                            className="w-full flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <MailIcon width={16} height={16} className="stroke-[1.6]" />
                            <span>Send a New Code</span>
                          </button>

                          {/* Change Email Link */}
                          <div className="text-center pt-2">
                            <Link
                              href="/create-account"
                              className="text-[12px] text-ink-soft underline hover:text-ink transition-colors"
                            >
                              Change Email
                            </Link>
                          </div>

                          {/* Security Info Box */}
                          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ebdccb] bg-[#fbf8f4] p-3.5 sm:p-4 text-ink shadow-2xs">
                            <div className="text-ink mt-0.5 shrink-0">
                              <LockIcon width={20} height={20} className="stroke-[1.5]" />
                            </div>
                            <p className="text-[12px] text-ink-soft leading-relaxed">
                              This code is time-limited and can only be used once. For your security, we do not share whether an account exists for this email address.
                            </p>
                          </div>
                        </>
                      )}
                    </form>
                  </>
                )}

                {/* ---------------------------------------------------- */}
                {/* PREVIEW STATES (DEMO SWITCHER PILLS)                 */}
                {/* ---------------------------------------------------- */}
                <div className="mt-8 pt-5 border-t border-line/60 text-center">
                  <p className="text-[11px] font-medium text-muted uppercase tracking-wider mb-2">
                    Preview States (Demo):
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        setVerState("default");
                        setOtp(["", "", "", "", "", ""]);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "default"
                          ? "bg-ink text-white border-ink"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Default
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVerState("invalid_code");
                        setOtp(["1", "2", "3", "4", "5", "6"]);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "invalid_code"
                          ? "bg-red-600 text-white border-red-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Invalid Code
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVerState("expired_code");
                        setOtp(["", "", "", "", "", ""]);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "expired_code"
                          ? "bg-red-600 text-white border-red-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Expired Code
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setVerState("rate_limited");
                        setRateLimitCountdown(60);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "rate_limited"
                          ? "bg-amber-600 text-white border-amber-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Resend Rate Limit
                    </button>

                    <button
                      type="button"
                      onClick={() => setVerState("success")}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "success"
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Success State
                    </button>

                    <button
                      type="button"
                      onClick={() => setVerState("new_code_sent")}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        verState === "new_code_sent"
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      New Code Sent
                    </button>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* TABLET & MOBILE: A More Secure You Notice Card       */}
                {/* Visible on < xl below the form (with icon, title,    */}
                {/* and description as shown in screenshot)              */}
                {/* ---------------------------------------------------- */}
                <div className="flex xl:hidden mt-6 items-center gap-3.5 rounded-xl border border-[#ebdccb]/80 bg-[#fbf8f4] p-4 text-ink shadow-2xs">
                  <div className="size-11 rounded-full border border-[#ebdccb] bg-[#f6eee3] text-[#8e4835] grid place-items-center shrink-0">
                    <ShieldCheckIcon width={22} height={22} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[15px] sm:text-base font-normal text-ink">
                      A More Secure You
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] text-ink-soft mt-0.5 leading-snug">
                      Email verification helps us keep your account safe and protect your jewellery journey.
                    </p>
                  </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* MOBILE: Bottom Hero Banner (Visible on < md only)    */}
                {/* As requested: "Telefon modda isə həmin soldakı şəkil  */}
                {/* aşağıda olacaq" - üzüklər belirgin görünəcək         */}
                {/* ---------------------------------------------------- */}
                <div className="md:hidden mt-8 rounded-2xl overflow-hidden shadow-2xs border border-line/60 relative h-[190px]">
                  <Image
                    src={verifyEmailImg}
                    alt="Sidra Fine Jewellery - Trusted Jewellery. Brighter Journeys."
                    fill
                    sizes="100vw"
                    className="object-cover object-[75%_70%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/70 to-transparent pointer-events-none" />
                  <div className="relative z-10 p-5 flex flex-col justify-center h-full max-w-[190px]">
                    <h3 className="font-serif text-lg sm:text-xl text-ink leading-tight">
                      Trusted Jewellery.
                    </h3>
                    <p className="font-serif text-lg sm:text-xl text-ink leading-tight">
                      Brighter Journeys.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHTMOST SIDEBAR: Mini Image & Security Points (Desktop >= xl only) */}
              <div className="w-full max-w-[440px] xl:max-w-[240px] 2xl:max-w-[260px] mx-auto xl:mx-0 shrink-0 space-y-4 xl:space-y-5 pt-4 xl:pt-2 hidden xl:block">
                {/* Mini Image */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xs border border-[#ebdccb]/60 bg-cream-100">
                  <Image
                    src={verifyEmailMiniImg}
                    alt="Sidra Fine Jewellery - A More Secure You"
                    fill
                    priority
                    sizes="260px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Sidebar Title & Subtitle (Always visible in info block) */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink leading-tight">
                    <span className="hidden xl:inline">
                      A More<br />
                      Secure You
                    </span>
                    <span className="xl:hidden">
                      A More Secure You
                    </span>
                  </h3>
                  <p className="mt-2 text-[12px] text-ink-soft leading-relaxed">
                    Email verification helps us keep your account safe and protect your jewellery journey.
                  </p>
                </div>

                {/* 3 Security Points */}
                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="text-amber-800 shrink-0">
                      <LockIcon width={18} height={18} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12.5px] font-medium text-ink">
                      Secure your account
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-amber-800 shrink-0">
                      <ShieldCheckIcon width={18} height={18} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12.5px] font-medium text-ink">
                      Prevent unauthorized access
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-amber-800 shrink-0">
                      <StarIcon width={18} height={18} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12.5px] font-medium text-ink">
                      Unlock all marketplace features
                    </p>
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
