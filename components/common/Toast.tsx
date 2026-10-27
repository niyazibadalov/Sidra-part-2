"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartWishlist } from "@/context/CartWishlistContext";
import { BagIcon, HeartIcon, CloseIcon, CheckIcon } from "@/components/Icons";

export function Toast() {
  const { toast, dismissToast } = useCartWishlist();

  if (!toast) return null;

  const isBag = toast.type === "bag";

  return (
    <aside
      aria-label="Notification"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex max-w-sm sm:max-w-md items-center gap-3.5 rounded-2xl border border-line/80 bg-white/95 p-3.5 shadow-[0_12px_36px_-10px_rgba(22,20,18,0.22)] backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Icon or Thumbnail */}
      <div className="relative size-12 shrink-0 rounded-xl border border-line/60 bg-[#faf8f5] p-1 flex items-center justify-center shadow-2xs">
        {toast.image ? (
          <Image
            src={toast.image}
            alt={toast.title}
            width={44}
            height={44}
            className="object-contain max-h-full max-w-full rounded-lg"
          />
        ) : isBag ? (
          <BagIcon width={22} height={22} className="text-ink" />
        ) : (
          <HeartIcon width={22} height={22} className="fill-[#b74134] text-[#b74134]" />
        )}
        <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
          <CheckIcon width={10} height={10} className="stroke-3" />
        </span>
      </div>

      {/* Message Text */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11.5px] font-semibold text-emerald-700 leading-tight">
          {toast.message}
        </p>
        <p className="truncate text-[12.5px] font-medium text-ink mt-0.5">
          {toast.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[11px]">
          <Link
            href={isBag ? "/bag" : "/wishlist"}
            onClick={dismissToast}
            className="font-semibold text-ink underline hover:text-rose-gold-dark transition-colors"
          >
            {isBag ? "View Shopping Bag →" : "View Wishlist →"}
          </Link>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={dismissToast}
        aria-label="Dismiss notification"
        className="grid size-7 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-cream-200 hover:text-ink transition-colors cursor-pointer"
      >
        <CloseIcon width={14} height={14} />
      </button>
    </aside>
  );
}
