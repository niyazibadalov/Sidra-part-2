"use client";

import Image from "next/image";
import Link from "next/link";
import heroSecImg from "@/app/images/heroSecImg.jpeg";
import { ArrowRightIcon } from "../Icons";

export function CollectionsPromoBanner() {
  return (
    <div className="relative my-10 rounded-2xl border border-line/60 bg-[#efe6dc] shadow-xs">
      {/* Mobile & Tablet layout: Text directly over full background image */}
      <div className="relative min-h-[340px] w-full p-6 sm:min-h-[380px] sm:p-8 lg:hidden">
        {/* Background image covering whole card */}
        <Image
          src={heroSecImg}
          alt="Life's Beautiful Moments Rings"
          fill
          sizes="100vw"
          className="rounded-2xl object-cover object-[70%_center]"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-white/80 to-[#efe6dc]/95" />

        {/* Text content placed over image */}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <h2 className="font-serif text-2xl font-normal leading-tight text-ink sm:text-3xl">
              Rings for
              <br />
              Life&apos;s Beautiful
              <br />
              Moments
            </h2>
            <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed font-medium text-ink/80 sm:text-[14px]">
              From proposals to personal milestones, find the ring that tells your story.
            </p>
            <div className="mt-5">
              <Link
                href="#products"
                className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-ink transition-colors hover:text-rose-gold-dark"
              >
                <span>Shop the Collection</span>
                <ArrowRightIcon
                  width={14}
                  height={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Script text on bottom right */}
          <div className="mt-14 flex justify-end">
            <p
              className="pointer-events-none font-script text-xl leading-tight text-white drop-shadow-md sm:text-2xl"
              aria-hidden
            >
              A More
              <br />
              Brilliant
              <br />
              Tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Desktop layout (lg+): Side-by-side */}
      <div className="hidden grid-cols-12 items-center lg:grid">
        {/* Left text column */}
        <div className="z-10 p-10 lg:col-span-5">
          <h2 className="font-serif text-[32px] font-normal leading-tight text-ink">
            Rings for
            <br />
            Life&apos;s Beautiful
            <br />
            Moments
          </h2>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
            From proposals to personal milestones, find the ring that tells your story.
          </p>
          <div className="mt-6">
            <Link
              href="#products"
              className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-rose-gold-dark"
            >
              <span>Shop the Collection</span>
              <ArrowRightIcon
                width={14}
                height={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Right image column */}
        <div className="relative h-[280px] w-full lg:col-span-7">
          <Image
            src={heroSecImg}
            alt="Life's Beautiful Moments Rings"
            fill
            sizes="58vw"
            className="rounded-r-2xl object-cover object-[70%_center]"
          />
          {/* Subtle gradient overlay to blend into left background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe6dc] via-[#efe6dc]/30 to-transparent" />

          {/* Script text overlay on right */}
          <p
            className="pointer-events-none absolute right-8 bottom-8 z-10 font-script text-[28px] leading-tight text-white drop-shadow-md"
            aria-hidden
          >
            A More
            <br />
            Brilliant
            <br />
            Tomorrow
          </p>
        </div>
      </div>
    </div>
  );
}
