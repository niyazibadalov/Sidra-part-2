import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../Icons";

import newCollectionImg from "@/app/images/newCollection.png";
import giftImg from "@/app/images/gift.png";
import communityImg from "@/app/images/community.png";

export function StoryBanners() {
  return (
    <section aria-label="Collections and stories" className=" sm:mt-10 lg:mt-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {/* Card 1: New Collections */}
          <div className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 transition-all duration-300 hover:shadow-xl sm:min-h-[260px] sm:p-6 lg:min-h-[275px] lg:p-7">
            <Image
              src={newCollectionImg}
              alt="New Collections"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft gradient to keep text readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />

            <div className="relative z-10">
              <h3 className="font-serif text-xl text-white sm:text-2xl lg:text-[25px] leading-tight">
                New
                <br />
                Collections
              </h3>
              <p className="mt-2 max-w-[200px] text-[12px] leading-relaxed text-white/80 sm:text-[12.5px]">
                Timeless designs for meaningful moments.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="/collections"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white transition-colors hover:text-sand-300"
              >
                <span>Explore Now</span>
                <ArrowRightIcon
                  width={13}
                  height={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Card 2: The Perfect Gift */}
          <div className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-cream-200 p-5 transition-all duration-300 hover:shadow-xl sm:min-h-[260px] sm:p-6 lg:min-h-[275px] lg:p-7">
            <Image
              src={giftImg}
              alt="The Perfect Gift"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-cream-100/90 via-cream-100/40 to-transparent" />

            <div className="relative z-10">
              <h3 className="font-serif text-xl text-ink sm:text-2xl lg:text-[25px] leading-tight">
                The
                <br />
                Perfect Gift
              </h3>
              <p className="mt-2 max-w-[190px] text-[12px] leading-relaxed text-ink-soft sm:text-[12.5px]">
                For life&apos;s most special moments.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <Link
                href="/gifts"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink transition-colors hover:text-rose-gold-dark"
              >
                <span>Shop Gifts</span>
                <ArrowRightIcon
                  width={13}
                  height={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Card 3: A Global Community of Beauty */}
          <div className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 transition-all duration-300 hover:shadow-xl sm:min-h-[260px] sm:p-6 lg:min-h-[275px] lg:p-7">
            <Image
              src={communityImg}
              alt="A Global Community of Beauty"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Soft gradient on left */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

            <div className="relative z-10">
              <h3 className="font-serif text-xl text-white sm:text-2xl lg:text-[25px] leading-tight">
                A Global
                <br />
                Community
                <br />
                of Beauty
              </h3>
              <p className="mt-2 max-w-[210px] text-[12px] leading-relaxed text-white/85 sm:text-[12.5px]">
                People, culture and craftsmanship. Together, we make jewellery live further.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4">
              <Link
                href="/stories"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white transition-colors hover:text-sand-300"
              >
                <span>Learn More</span>
                <ArrowRightIcon
                  width={13}
                  height={13}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              {/* Video Play Button */}
              <button
                type="button"
                aria-label="Watch video"
                className="grid size-10 place-items-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/35 sm:size-11"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 size-4 sm:size-5"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
