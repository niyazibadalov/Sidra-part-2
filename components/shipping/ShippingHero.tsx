import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ChevronRightIcon } from "../Icons";
import heroImage from "@/app/images/lifetimeHero.png";

export function ShippingHero() {
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
        className="absolute inset-0 -z-10 bg-linear-to-r from-cream-100 from-35% via-cream-100/70 to-transparent sm:via-cream-100/45 lg:via-cream-100/10"
      />

      {/* handwritten note, desktop only */}
      <p
        aria-hidden
        className="absolute top-9 right-10 hidden rotate-[-8deg] font-script text-[22px] leading-[1.15] text-ink-soft xl:block"
      >
        More
        <br />
        Than Jewellery
        <br />A Closer Tomorrow
      </p>

      <div className="mx-auto max-w-360 px-4 pt-3 pb-5 sm:px-6 sm:pb-6 lg:px-10 lg:pt-5 lg:pb-9">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11.5px] text-ink-soft lg:text-[12px]">
          <Link href="/" className="hover:text-ink">Home</Link>
          <ChevronRightIcon width={11} height={11} className="text-muted" />
          <span aria-current="page">Shipping &amp; Delivery</span>
        </nav>

        <div className="mt-4 max-w-[62%] sm:mt-5 sm:max-w-[60%] lg:mt-7 lg:max-w-160">
          <h1 className="font-serif text-[30px] leading-[1.08] text-ink min-[400px]:text-[34px] sm:text-5xl lg:text-[56px]">
            Shipping &amp; Delivery
          </h1>
          <p className="mt-2 text-[13px] leading-snug text-ink sm:text-[15px] lg:mt-3 lg:text-[19px]">
            Secure, reliable delivery for your most precious moments.
          </p>
          <p className="mt-3 hidden text-[14.5px] leading-relaxed text-ink-soft lg:block">
            We ensure your jewellery reaches you safely, with insured delivery, real-time tracking and dedicated support at every step.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-3.5 lg:mt-5 lg:max-w-110">
  <Link
    href="/orders"
    className="flex h-16 flex-1 items-center justify-center gap-2 rounded bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-ink-soft sm:h-18 lg:h-12"
  >
    <span>Track Your Order</span>
    <ArrowRightIcon width={14} height={14} className="shrink-0" />
  </Link>
  <Link
    href="/help"
    className="flex h-16 flex-1 items-center justify-center rounded border border-ink/60 bg-white/70 px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white sm:h-18 lg:h-12"
  >
    Contact Support
  </Link>
</div>
      </div>
    </section>
  );
}