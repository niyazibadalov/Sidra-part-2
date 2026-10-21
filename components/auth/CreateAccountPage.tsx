"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TopBar } from "../layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  DiamondIcon,
  TruckIcon,
  RefreshArrowsIcon,
  ShieldCheckIcon,
  HeartIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  AppleIcon,
  GoogleIcon,
  MailIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@/components/Icons";
import createAccountHeroImg from "@/app/images/createAccountHero.png";
import heroSecImg from "@/app/images/heroSecImg.jpeg";

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

export function CreateAccountPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Password Validation Rules (as specified in design)
  const passwordRules = [
    {
      id: "length",
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      label: "Includes an uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      id: "number",
      label: "Includes a number",
      met: /[0-9]/.test(password),
    },
    {
      id: "special",
      label: "Includes a special character (e.g. !@#$%^&*)",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passedCount = passwordRules.filter((r) => r.met).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (passedCount < 4) {
      setError("Please ensure your password satisfies all 4 security criteria.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const result = register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });

    if (!result.success) {
      setIsLoading(false);
      setError(result.error || "Failed to create account.");
      return;
    }

    // Account created in localStorage; show brief success then route to sign in
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 900);
    }, 500);
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
          {/* Mobile Image: createAccountHeroImg */}
          <div className="sm:hidden absolute inset-0">
            <Image
              src={createAccountHeroImg}
              alt="Sidra Fine Jewellery - Create Account"
              fill
              priority
              className="object-cover object-[80%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf7]/95 via-[#fcfaf7]/80 to-transparent pointer-events-none" />
          </div>

          {/* Tablet Image: heroSecImg */}
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
            <div className="sm:hidden max-w-[220px]">
              <h2 className="font-serif text-[22px] font-normal text-ink leading-[1.2]">
                <span className="italic block">A More</span>
                <span>Beautiful Tomorrow</span>
              </h2>
              <p className="mt-2 text-[12px] text-ink-soft leading-snug">
                Join the Sidra community.
              </p>
            </div>

            {/* Tablet Text (hidden sm:block) */}
            <div className="hidden sm:block max-w-sm">
              <h2 className="font-serif text-2xl md:text-[28px] font-normal text-ink leading-[1.2]">
                <span className="italic">A More</span> Beautiful Tomorrow
              </h2>
              <p className="mt-2 text-[12.5px] md:text-[13px] text-ink-soft leading-relaxed">
                Create your account and join the Sidra community.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* MAIN 50/50 SPLIT SECTION                               */}
        {/* ====================================================== */}
        <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-stretch">
            {/* ====================================================== */}
            {/* LEFT COLUMN: Hero Banner with Image (Exact 50% split)  */}
            {/* ====================================================== */}
            <div className="relative hidden lg:flex flex-col justify-between overflow-hidden shadow-2xs min-h-[920px] p-8 xl:p-12">
              <Image
                src={createAccountHeroImg}
                alt="Sidra Fine Jewellery - A More Beautiful Tomorrow"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />

              {/* Soft overlay gradient ensuring clean typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/10 pointer-events-none" />

              {/* Top Text Content */}
              <div className="relative z-10 max-w-md pt-2 xl:pt-4">
                <h2 className="text-3xl xl:text-4xl 2xl:text-[46px] font-normal text-ink leading-[1.12] tracking-tight">
                  <span className="font-serif italic font-normal block">A More</span>
                  <span className="font-serif block">Beautiful</span>
                  <span className="font-serif block">Tomorrow</span>
                </h2>
                <p className="mt-3.5 text-[14px] xl:text-[15px] text-ink-soft leading-relaxed">
                  Create your account and<br />
                  join the Sidra community.
                </p>

                {/* 4 Feature Points with Circular Badges */}
                <div className="mt-10 space-y-5">
                  {/* 1. Wishlist */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ebdccb] bg-white/80 backdrop-blur-xs text-ink shadow-2xs">
                      <HeartIcon width={19} height={19} className="stroke-[1.5]" />
                    </div>
                    <div className="text-[12.5px] xl:text-[13px] leading-snug">
                      <p className="font-semibold text-ink">Save your wishlist</p>
                      <p className="text-ink-soft text-[11.5px] xl:text-[12px]">across all devices</p>
                    </div>
                  </div>

                  {/* 2. Orders */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ebdccb] bg-white/80 backdrop-blur-xs text-ink shadow-2xs">
                      <LockIcon width={19} height={19} className="stroke-[1.5]" />
                    </div>
                    <div className="text-[12.5px] xl:text-[13px] leading-snug">
                      <p className="font-semibold text-ink">Track your orders</p>
                      <p className="text-ink-soft text-[11.5px] xl:text-[12px]">effortlessly</p>
                    </div>
                  </div>

                  {/* 3. Checkout */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ebdccb] bg-white/80 backdrop-blur-xs text-ink shadow-2xs">
                      <UserIcon width={19} height={19} className="stroke-[1.5]" />
                    </div>
                    <div className="text-[12.5px] xl:text-[13px] leading-snug">
                      <p className="font-semibold text-ink">Faster checkout</p>
                      <p className="text-ink-soft text-[11.5px] xl:text-[12px]">for a seamless experience</p>
                    </div>
                  </div>

                  {/* 4. Returns */}
                  <div className="flex items-center gap-3.5">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full border border-[#ebdccb] bg-white/80 backdrop-blur-xs text-ink shadow-2xs">
                      <RefreshArrowsIcon width={19} height={19} className="stroke-[1.5]" />
                    </div>
                    <div className="text-[12.5px] xl:text-[13px] leading-snug">
                      <p className="font-semibold text-ink">Easy returns</p>
                      <p className="text-ink-soft text-[11.5px] xl:text-[12px]">and dedicated support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower Section: Accent line and 2 uppercase copy lines */}
              <div className="relative z-10 mt-auto pt-16">
                <div className="w-12 h-0.5 bg-[#b8875f] mb-4" />
                <div className="space-y-1 text-[11px] xl:text-[11.5px] font-semibold tracking-wider text-ink/85 uppercase">
                  <p>TIMELESS PIECES</p>
                  <p>BRIGHTER STORIES</p>
                </div>
              </div>
            </div>

            {/* ====================================================== */}
            {/* RIGHT COLUMN: Create Account Form                      */}
            {/* ====================================================== */}
            <div className="flex flex-col justify-center py-4 lg:py-6">
              <div className="w-full max-w-[460px] mx-auto">
                {/* Back to Home Link */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft hover:text-ink transition-colors mb-4 cursor-pointer"
                >
                  <ArrowLeftIcon width={14} height={14} />
                  <span>Back to Home</span>
                </Link>

                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink leading-tight">
                  Create Account
                </h1>
                <p className="mt-1 text-[13.5px] sm:text-[14px] text-ink-soft leading-relaxed">
                  Join Sidra and be part of a more beautiful journey.
                </p>

                {/* Success Banner if submitted */}
                {isSuccess ? (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-[#f4f9f4] p-5 space-y-3">
                    <div className="flex items-center gap-2.5 text-emerald-800">
                      <CheckCircleIcon width={22} height={22} className="text-emerald-600 shrink-0" />
                      <h3 className="font-semibold text-[14px]">Account Created Successfully!</h3>
                    </div>
                    <p className="text-[12.5px] text-ink-soft leading-relaxed">
                      Welcome to SIDRA, {firstName}! We&apos;ve sent a confirmation email to <span className="font-medium text-ink">{email}</span>.
                    </p>
                    <Link
                      href="/sign-in"
                      className="inline-flex items-center justify-center w-full rounded-lg bg-ink py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-ink-soft transition-colors mt-2"
                    >
                      Proceed to Sign In
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Error Banner */}
                    {error && (
                      <div className="rounded-lg border border-red-200 bg-red-50/70 p-3 text-[12.5px] font-medium text-red-600">
                        {error}
                      </div>
                    )}

                    {/* First & Last Name Fields (2 Columns) */}
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label
                          htmlFor="first-name"
                          className="block text-[12.5px] font-medium text-ink mb-1.5"
                        >
                          First name
                        </label>
                        <input
                          id="first-name"
                          type="text"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="Huseyn"
                          className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="last-name"
                          className="block text-[12.5px] font-medium text-ink mb-1.5"
                        >
                          Last name
                        </label>
                        <input
                          id="last-name"
                          type="text"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="Ahmadov"
                          className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* Email address field */}
                    <div>
                      <label
                        htmlFor="signup-email"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Email address
                      </label>
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                      />
                    </div>

                    {/* Password field with show/hide toggle */}
                    <div>
                      <label
                        htmlFor="signup-password"
                        className="block text-[12.5px] font-medium text-ink mb-1.5"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="Create a secure password"
                          className="w-full rounded-lg border border-line bg-white pl-3.5 pr-10 py-2.5 text-[13.5px] text-ink placeholder:text-muted focus:border-ink focus:outline-none transition-colors shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-ink transition-colors cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOffIcon width={18} height={18} />
                          ) : (
                            <EyeIcon width={18} height={18} />
                          )}
                        </button>
                      </div>

                      {/* Dynamic 4-Segment Strength Bar */}
                      <div className="grid grid-cols-4 gap-1.5 mt-2">
                        {[0, 1, 2, 3].map((idx) => {
                          const isFilled = idx < passedCount;
                          let barColor = "bg-line/80";
                          if (isFilled) {
                            if (passedCount === 1) barColor = "bg-amber-400";
                            else if (passedCount <= 3) barColor = "bg-emerald-500";
                            else barColor = "bg-emerald-600";
                          }
                          return (
                            <div
                              key={idx}
                              className={`h-1 rounded-full transition-colors duration-300 ${barColor}`}
                            />
                          );
                        })}
                      </div>

                      {/* 4 Password Criteria Checklist */}
                      <div className="mt-3 space-y-1.5">
                        <p className="text-[12px] font-medium text-ink-soft">
                          Your password should include:
                        </p>
                        {passwordRules.map((rule) => (
                          <div
                            key={rule.id}
                            className="flex items-center gap-2 text-[12px] transition-colors"
                          >
                            {rule.met ? (
                              <CheckCircleIcon
                                width={15}
                                height={15}
                                className="text-emerald-600 shrink-0 stroke-[2]"
                              />
                            ) : (
                              <div className="size-[15px] rounded-full border border-line shrink-0 grid place-items-center" />
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
                    </div>

                    {/* Terms & Privacy Agreement Checkbox */}
                    <div className="pt-2 space-y-3">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="mt-0.5 size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                        />
                        <span className="text-[12.5px] text-ink-soft leading-snug">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="font-medium text-ink underline underline-offset-2 hover:text-black"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="font-medium text-ink underline underline-offset-2 hover:text-black"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      {/* Optional Newsletter Checkbox */}
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={newsletter}
                          onChange={(e) => setNewsletter(e.target.checked)}
                          className="mt-0.5 size-4 rounded border-line text-ink accent-ink focus:ring-ink"
                        />
                        <span className="text-[12.5px] text-ink-soft leading-snug">
                          Send me jewellery updates, exclusive offers and stories
                          from Sidra (optional).
                        </span>
                      </label>
                    </div>

                    {/* Primary CTA: Create Account Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-ink py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-ink-soft active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </button>

                    {/* Or Continue With Divider */}
                    <div className="relative my-6 text-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-line/80" />
                      </div>
                      <span className="relative bg-[#fcfaf7] px-3 text-[12px] text-muted">
                        or continue with
                      </span>
                    </div>

                    {/* Social Sign Up Buttons */}
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
                        <span>Email me a sign-up link</span>
                      </button>
                    </div>

                    {/* Already have an account? Sign in */}
                    <div className="mt-6 text-center text-[13px] text-ink-soft">
                      Already have an account?{" "}
                      <Link
                        href="/sign-in"
                        className="font-semibold text-ink underline underline-offset-2 hover:text-black"
                      >
                        Sign in
                      </Link>
                    </div>

                    {/* Security Notice Card */}
                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ebdccb] bg-[#fbf5ee] p-3.5 sm:p-4 text-ink shadow-2xs">
                      <div className="text-ink mt-0.5 shrink-0">
                        <ShieldCheckIcon width={25} height={25} className="stroke-[1.5]" />
                      </div>
                      <div className="text-[12px] leading-relaxed">
                        <p className="font-semibold text-ink">
                          Your information is safe with us
                        </p>
                        <p className="text-ink-soft mt-0.5">
                          We use industry-standard encryption to protect your
                          personal data.
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================== */}
        {/* 4 TRUST BADGES DIRECTLY ABOVE FOOTER                   */}
        {/* Visible on Tablet (md:) & Desktop (lg:) in 1 row (4-col)*/}
        {/* Hidden on Phone (< md / < 768px)                       */}
        {/* ====================================================== */}
        <section
          aria-label="Buyer protection and guarantees"
          className="hidden md:block mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10 border-t border-line/60"
        >
          <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="flex items-center justify-start gap-2.5 sm:gap-3 lg:justify-center"
                >
                  <Icon
                    width={24}
                    height={24}
                    strokeWidth={1.4}
                    className="shrink-0 text-ink sm:size-6 lg:size-6"
                  />
                  <div className="min-w-0">
                    <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-semibold text-ink truncate md:whitespace-normal">
                      {badge.title}
                    </p>
                    <p className="mt-0.5 text-[10.5px] sm:text-[11.5px] lg:text-[12px] text-muted truncate md:whitespace-normal">
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
