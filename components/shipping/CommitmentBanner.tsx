import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../Icons";
import bannerImage from "@/app/images/bagFullHero.png";

export function CommitmentBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-xl border border-line bg-sand-200">
      <Image
        src={bannerImage}
        alt=""
        fill
        sizes="(min-width: 1440px) 1360px, 100vw"
        className="-z-20 object-cover object-right"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-sand-200 via-sand-200/80 to-transparent lg:via-sand-200/50" />

      <div className="flex min-h-[110px] flex-col justify-center gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:min-h-[120px] lg:justify-start lg:gap-10 lg:px-8">
        <div>
          <p className="font-script text-[18px] leading-tight text-ink-soft sm:text-[22px] lg:hidden">
            More Than Jewellery
          </p>
          <div className="hidden lg:block">
            <p className="font-serif text-[26px] leading-[1.1] text-ink italic">
              Every Order Carries
              <br />
              Our Care
            </p>
            <p className="mt-1 text-[12.5px] text-ink-soft">From our studio to your hands, safely and beautifully.</p>
          </div>
        </div>
        <Link
          href="/about"
          className="flex h-10 w-fit items-center gap-2 rounded-lg border border-ink/60 bg-white/70 px-5 text-[12.5px] text-ink transition-colors hover:bg-white"
        >
          Our Commitment <ArrowRightIcon width={13} height={13} />
        </Link>
      </div>
    </section>
  );
}
