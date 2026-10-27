import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "../Icons";
import heroImage from "@/app/images/heroSecImg.jpeg";

export function TermsHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-cream-100">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[80%_center] lg:object-right"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-cream-100 from-30% via-cream-100/70 to-transparent sm:via-cream-100/45 lg:via-cream-100/5"
      />

      {/* tagline on the image, wide desktop only */}
      <p
        aria-hidden
        className="absolute top-[40%] right-[17%] hidden w-[150px] font-serif text-[18px] leading-snug text-ink xl:block"
      >
        Beautiful experiences built on trust.
      </p>

      <div className="mx-auto max-w-[1440px] px-4 pt-3 pb-5 sm:px-6 sm:pb-7 lg:px-10 lg:pt-5 lg:pb-9">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11.5px] text-ink-soft lg:text-[12.5px]">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRightIcon width={11} height={11} className="text-muted" />
          <span aria-current="page">Terms &amp; Conditions</span>
        </nav>

        <div className="mt-6 max-w-[66%] sm:mt-7 sm:max-w-[60%] lg:mt-9 lg:max-w-[640px]">
          <p className="text-[10px] font-medium tracking-[0.3em] text-ink-soft uppercase sm:text-[11px]">Legal</p>
          <h1 className="mt-2 font-serif text-[28px] leading-[1.08] text-ink min-[400px]:text-[32px] sm:text-5xl lg:mt-3 lg:text-[56px]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-[12px] leading-snug text-ink-soft sm:text-[14px] lg:mt-4 lg:text-[16px]">
            The terms that govern your use of SIDRA and purchases through our marketplace.
          </p>
          <p className="mt-2.5 text-[11px] text-ink-soft sm:text-[12px] lg:text-[13px]">Last updated: September 2026</p>
        </div>
      </div>
    </section>
  );
}
