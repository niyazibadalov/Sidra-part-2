"use client";

import Image from "next/image";
import Link from "next/link";
import heroSecImg from "@/app/images/heroSecImg.jpeg";
import { ArrowRightIcon } from "../Icons";

export function CollectionsPromoBanner() {
  return (
    <div className="relative my-10 overflow-hidden rounded-2xl border border-line/60 bg-[#efe6dc] shadow-xs">
      <div className="grid grid-cols-1 items-center lg:grid-cols-12">
        {/* Left text column */}
        <div className="z-10 p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <h2 className="font-serif text-2xl font-normal leading-tight text-ink sm:text-3xl lg:text-[32px]">
            Rings for
            <br />
            Life&apos;s Beautiful
            <br />
            Moments
          </h2>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-soft sm:text-[14px]">
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
        <div className="relative h-[200px] w-full overflow-hidden sm:h-[240px] lg:col-span-7 lg:h-[280px]">
          <Image
            src={heroSecImg}
            alt="Life's Beautiful Moments Rings"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[70%_center]"
          />
          {/* Subtle gradient overlay to blend into left background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe6dc] via-[#efe6dc]/30 to-transparent lg:from-[#efe6dc]" />

          {/* Script text overlay on right */}
          <p
            className="pointer-events-none absolute right-6 bottom-6 z-10 font-script text-xl leading-tight text-white drop-shadow-md sm:right-8 sm:bottom-8 sm:text-2xl lg:text-[28px]"
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
