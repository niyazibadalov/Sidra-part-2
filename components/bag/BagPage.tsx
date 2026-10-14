"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  BagIcon,
  HeartIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  CloseIcon,
  ShieldCheckIcon,
  TruckIcon,
  RotateCcwIcon,
} from "@/components/Icons";
import { useCartWishlist } from "@/context/CartWishlistContext";
import bagHeroImg from "@/app/images/bagHero.png";

export function BagPage() {
  const { cart, removeFromCart, updateCartQty, clearCart, cartCount } =
    useCartWishlist();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
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
          /* 2. FILLED SHOPPING BAG STATE                                  */
          /* ============================================================ */
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-10">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-line/60 pb-5">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-ink">
                  Shopping Bag
                </h1>
                <p className="mt-1 text-[13px] text-ink-soft">
                  {cartCount} item{cartCount === 1 ? "" : "s"} in your bag
                </p>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="text-[12px] font-medium text-ink-soft hover:text-[#b74134] transition-colors cursor-pointer self-start sm:self-auto"
              >
                Clear all items
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-line/70 bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-sand-400"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative size-20 sm:size-24 shrink-0 rounded-xl bg-[#faf7f2] border border-line/50 p-2 flex items-center justify-center shadow-2xs">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-ink text-[14.5px]">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-[12px] text-muted">
                          {item.selectedMaterial || item.metal || "18K Gold"}
                          {item.selectedSize && ` · Size ${item.selectedSize}`}
                        </p>
                        <p className="mt-1 text-[14px] font-bold text-ink">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-line/40">
                      {/* Quantity Selector */}
                      <div className="inline-flex items-center rounded-full border border-line bg-[#fbf9f6] px-2 py-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="grid size-7 cursor-pointer place-items-center text-ink-soft hover:text-ink transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon width={12} height={12} />
                        </button>
                        <span className="w-7 text-center text-[13px] font-semibold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="grid size-7 cursor-pointer place-items-center text-ink-soft hover:text-ink transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon width={12} height={12} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-semibold text-ink text-[15px] sm:w-20 text-right">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="grid size-8 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-cream-200 hover:text-ink transition-colors"
                      >
                        <CloseIcon width={14} height={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Shipping & Delivery Guarantee Banner */}
                <div className="mt-6 rounded-2xl border border-line/60 bg-[#faf7f2] p-4 flex flex-wrap items-center justify-around gap-4 text-center text-[12px] text-ink-soft">
                  <div className="flex items-center gap-2">
                    <TruckIcon width={18} height={18} className="text-ink" />
                    <span>Free Global Insured Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcwIcon width={18} height={18} className="text-ink" />
                    <span>30-Day Easy Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon width={18} height={18} className="text-ink" />
                    <span>Lifetime Authenticity Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 rounded-2xl border border-line/70 bg-white p-6 shadow-xs space-y-4">
                  <h2 className="font-serif text-xl font-medium text-ink">
                    Order Summary
                  </h2>

                  <div className="space-y-2.5 border-b border-line/60 pb-4 text-[13px] text-ink-soft">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-emerald-700">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duties &amp; Taxes</span>
                      <span className="text-muted">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-base font-bold text-ink pt-1">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-full bg-ink py-3.5 text-center text-[13.5px] font-semibold text-white shadow-md transition-all hover:bg-ink-soft active:scale-[0.99] cursor-pointer"
                  >
                    Proceed to Checkout →
                  </button>

                  <Link
                    href="/jewellery"
                    className="block w-full text-center text-[12.5px] font-semibold text-ink underline hover:text-rose-gold-dark transition-colors cursor-pointer pt-1"
                  >
                    Continue Shopping
                  </Link>

                  <div className="pt-2 text-[11.5px] text-muted text-center leading-relaxed">
                    🔒 SSL Encrypted &amp; Guaranteed Safe Checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
