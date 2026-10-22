"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  CheckCircleIcon,
  CheckIcon,
  AlertCircleIcon,
  LockIcon,
  ShieldCheckIcon,
} from "@/components/Icons";
import createAccountHeroImg from "@/app/images/createAccountHero.png";
import newPasswordMiniImg from "@/app/images/newPasswordMini.png";

type PageState = "form" | "expired" | "success";

export function ResetPasswordPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("form");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isMismatch, setIsMismatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 5 Security criteria as specified in the design
  const criteria = [
    {
      id: "length",
      label: "At least 8 characters",
      met: newPassword.length >= 8,
    },
    {
      id: "uppercase",
      label: "Include at least one uppercase letter (A–Z)",
      met: /[A-Z]/.test(newPassword),
    },
    {
      id: "lowercase",
      label: "Include at least one lowercase letter (a–z)",
      met: /[a-z]/.test(newPassword),
    },
    {
      id: "number",
      label: "Include at least one number (0–9)",
      met: /[0-9]/.test(newPassword),
    },
    {
      id: "special",
      label: "Include at least one special character (!@#$%...)",
      met: /[^A-Za-z0-9]/.test(newPassword),
    },
  ];

  const allCriteriaMet = criteria.every((c) => c.met);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setGeneralError("Please fill in both password fields.");
      return;
    }

    if (!allCriteriaMet) {
      setGeneralError("Please make sure your password satisfies all 5 security criteria.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsMismatch(true);
      setGeneralError(null);
      return;
    }

    setIsMismatch(false);
    setGeneralError(null);
    setIsLoading(true);

    // Update password in localStorage if currentUser exists
    try {
      const currentStored = localStorage.getItem("sidra_current_user");
      if (currentStored) {
        const currentUser = JSON.parse(currentStored);
        const usersStored = localStorage.getItem("sidra_users");
        if (usersStored) {
          const users = JSON.parse(usersStored);
          const idx = users.findIndex(
            (u: { email: string }) =>
              u.email.toLowerCase() === currentUser.email.toLowerCase()
          );
          if (idx > -1) {
            users[idx].password = newPassword;
            localStorage.setItem("sidra_users", JSON.stringify(users));
          }
        }
      }
    } catch (err) {
      console.error("Failed to update password in storage", err);
    }

    setTimeout(() => {
      setIsLoading(false);
      setPageState("success");
    }, 700);
  };

  return (
    <>
      <TopBar />
      <Header />

      <main className="flex-1 bg-[#fcfaf7]">
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
                src={createAccountHeroImg}
                alt="Sidra Fine Jewellery - A More Secure You"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />

              {/* Soft overlay gradient ensuring clean typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/10 to-transparent pointer-events-none" />

              {/* Top Text Content */}
              <div className="relative z-10 max-w-md pt-2 xl:pt-4">
                <h2 className="font-serif text-3xl xl:text-4xl 2xl:text-[46px] font-normal text-ink leading-[1.15] tracking-tight">
                  A More<br />
                  Secure You
                </h2>
                <p className="mt-4 text-[14px] xl:text-[15px] text-ink-soft leading-relaxed max-w-sm">
                  Create a new password and<br />
                  continue your jewellery<br />
                  journey with SIDRA.
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
            {/* RIGHT AREA: Form / States + Security Sidebar (lg:col-7) */}
            {/* ====================================================== */}
            <div className="lg:col-span-7 flex flex-col xl:flex-row gap-8 xl:gap-10 justify-between items-start pt-2 lg:pt-10">
              {/* CENTER COLUMN: Create a New Password Form & States */}
              <div className="w-full max-w-[440px] mx-auto xl:mx-0">
                {/* ---------------------------------------------------- */}
                {/* 1. STATE: SUCCESS STATE                              */}
                {/* ---------------------------------------------------- */}
                {pageState === "success" && (
                  <div className="rounded-2xl border border-emerald-100 bg-[#f4f9f4] p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="size-11 sm:size-12 rounded-full bg-emerald-600 text-white grid place-items-center shrink-0 shadow-xs">
                        <CheckIcon width={22} height={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink leading-tight">
                          Your Password Has Been Reset
                        </h1>
                        <p className="mt-2 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed">
                          Your password has been successfully updated. You can now sign in with your new password.
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/sign-in"
                      className="w-full flex items-center justify-center rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Continue to Sign In
                    </Link>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 2. STATE: INVALID OR EXPIRED LINK STATE              */}
                {/* ---------------------------------------------------- */}
                {pageState === "expired" && (
                  <div className="rounded-2xl border border-red-100 bg-[#fff8f8] p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="size-11 sm:size-12 rounded-full bg-red-500 text-white grid place-items-center shrink-0 shadow-xs">
                        <span className="text-xl sm:text-2xl font-bold leading-none">!</span>
                      </div>
                      <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-ink leading-tight">
                          This Reset Link Is Invalid or Expired
                        </h1>
                        <p className="mt-2 text-[13px] sm:text-[13.5px] text-ink-soft leading-relaxed">
                          This password reset link is no longer valid. It may have expired or already been used. For your security, please request a new link.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        href="/forgot-password"
                        className="w-full flex items-center justify-center rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer"
                      >
                        Request a New Link
                      </Link>

                      <Link
                        href="/sign-in"
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-[13px] font-medium text-ink-soft hover:text-ink transition-colors"
                      >
                        <ArrowLeftIcon width={13} height={13} />
                        <span>Back to Sign In</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 3. STATE: FORM WITH LIVE VALIDATION & MISMATCH ERROR */}
                {/* ---------------------------------------------------- */}
                {pageState === "form" && (
                  <>
                    {/* Back to Sign In Link */}
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors mb-4 cursor-pointer"
                    >
                      <ArrowLeftIcon width={14} height={14} />
                      <span>Back to Sign In</span>
                    </Link>

                    <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink leading-tight">
                      Create a New Password
                    </h1>
                    <p className="mt-1.5 text-[13.5px] sm:text-[14px] text-ink-soft leading-relaxed">
                      Your new password must be different from your previous password and meet the security requirements below.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      {/* General Error Banner */}
                      {generalError && (
                        <div className="rounded-lg border border-red-200 bg-red-50/70 p-3 text-[12.5px] font-medium text-red-600">
                          {generalError}
                        </div>
                      )}

                      {/* New Password Field */}
                      <div>
                        <label
                          htmlFor="new-password"
                          className="block text-[12.5px] font-medium text-ink mb-1.5"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              if (isMismatch) setIsMismatch(false);
                              if (generalError) setGeneralError(null);
                            }}
                            placeholder="••••••••••••"
                            className="w-full rounded-lg border border-line bg-white pl-3.5 pr-10 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-ink transition-colors cursor-pointer"
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                          >
                            {showNewPassword ? (
                              <EyeOffIcon width={18} height={18} />
                            ) : (
                              <EyeIcon width={18} height={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password Field (with Mismatch Error State) */}
                      <div>
                        <label
                          htmlFor="confirm-new-password"
                          className="block text-[12.5px] font-medium text-ink mb-1.5"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            id="confirm-new-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              if (isMismatch) setIsMismatch(false);
                              if (generalError) setGeneralError(null);
                            }}
                            placeholder="••••••••••••"
                            className={`w-full rounded-lg border bg-white pl-3.5 pr-10 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:outline-none transition-colors shadow-2xs ${
                              isMismatch
                                ? "border-red-500 focus:border-red-500 bg-red-50/20"
                                : "border-line focus:border-ink"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-ink transition-colors cursor-pointer"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon width={18} height={18} />
                            ) : (
                              <EyeIcon width={18} height={18} />
                            )}
                          </button>
                        </div>

                        {/* Red Mismatch Error message as in screenshot */}
                        {isMismatch && (
                          <div className="flex items-center gap-1.5 mt-2 text-[12px] text-red-600 font-medium">
                            <AlertCircleIcon width={15} height={15} className="shrink-0 stroke-[2]" />
                            <span>Passwords do not match. Please try again.</span>
                          </div>
                        )}
                      </div>

                      {/* 5 Security Criteria Box */}
                      <div className="rounded-xl border border-[#ebdccb] bg-[#fbf8f4] p-4 space-y-2.5">
                        {criteria.map((rule) => (
                          <div
                            key={rule.id}
                            className="flex items-center gap-2.5 text-[12.5px] transition-colors"
                          >
                            {rule.met ? (
                              <CheckCircleIcon
                                width={16}
                                height={16}
                                className="text-emerald-700 shrink-0 stroke-[2.2]"
                              />
                            ) : (
                              <div className="size-4 rounded-full border border-line bg-white shrink-0" />
                            )}
                            <span
                              className={
                                rule.met
                                  ? "text-ink font-medium"
                                  : "text-ink-soft"
                              }
                            >
                              {rule.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Primary CTA: Reset Password Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      >
                        {isLoading ? "Resetting Password..." : "Reset Password"}
                      </button>

                      {/* Secondary Button: Back to Sign In */}
                      <Link
                        href="/sign-in"
                        className="w-full flex items-center justify-center gap-2 rounded-lg border border-line bg-white py-2.5 text-[13px] font-semibold text-ink shadow-2xs hover:bg-cream-50 hover:border-ink/40 transition-colors"
                      >
                        <ArrowLeftIcon width={14} height={14} />
                        <span>Back to Sign In</span>
                      </Link>
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
                        setPageState("form");
                        setIsMismatch(false);
                        setGeneralError(null);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        pageState === "form" && !isMismatch
                          ? "bg-ink text-white border-ink"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Default Form
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPageState("form");
                        setNewPassword("SecurePass123!");
                        setConfirmPassword("MismatchPass456!");
                        setIsMismatch(true);
                        setGeneralError(null);
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        isMismatch
                          ? "bg-red-600 text-white border-red-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Password Mismatch
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPageState("expired");
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        pageState === "expired"
                          ? "bg-red-600 text-white border-red-600"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Expired Link State
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPageState("success");
                      }}
                      className={`px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        pageState === "success"
                          ? "bg-emerald-700 text-white border-emerald-700"
                          : "border-line bg-white text-ink-soft hover:bg-cream-50"
                      }`}
                    >
                      Success State
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHTMOST SIDEBAR: Security Guarantee Card */}
              <div className="w-full max-w-[440px] xl:max-w-[240px] 2xl:max-w-[260px] mx-auto xl:mx-0 shrink-0 space-y-4 xl:space-y-5 pt-4 xl:pt-2">
                {/* Mini Image (Desktop only: hidden on mobile & tablet) */}
                <div className="relative hidden xl:block w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xs border border-[#ebdccb]/60 bg-cream-100">
                  <Image
                    src={newPasswordMiniImg}
                    alt="Sidra Fine Jewellery - Protected Account"
                    fill
                    priority
                    sizes="260px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Sidebar Title */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink leading-tight">
                    <span className="hidden xl:inline">
                      Your Account<br />
                      Stays Protected
                    </span>
                    <span className="xl:hidden">
                      Your Account Stays Protected
                    </span>
                  </h3>
                </div>

                {/* 3 Security Points */}
                <div className="space-y-4 pt-1">
                  {/* Point 1: Time limited */}
                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <LockIcon width={20} height={20} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12px] text-ink-soft leading-relaxed">
                      This link is time-limited and can only be used once.
                    </p>
                  </div>

                  {/* Point 2: Direct sign in */}
                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <ShieldCheckIcon width={20} height={20} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12px] text-ink-soft leading-relaxed">
                      After resetting, you will be directed to sign in with your new password.
                    </p>
                  </div>

                  {/* Point 3: Never share */}
                  <div className="flex items-start gap-3">
                    <div className="text-ink mt-0.5 shrink-0">
                      <EyeOffIcon width={20} height={20} className="stroke-[1.5]" />
                    </div>
                    <p className="text-[12px] text-ink-soft leading-relaxed">
                      We never share your password or reset link with anyone.
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
