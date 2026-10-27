import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ChevronRightIcon, InfoIcon } from "../Icons";
import { DELIVERY_OPTIONS, type DeliveryOption } from "./shippingData";
import boxImage from "@/app/images/gift.png";

function Badge({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`rounded-full bg-[#f8e6d6] px-2.5 py-1 text-[10px] leading-none whitespace-nowrap text-rose-gold-dark ${className}`}>
      {children}
    </span>
  );
}

/** Desktop card (xl and up) */
function OptionCard({ o }: { o: DeliveryOption }) {
  const Icon = o.icon;
  return (
    <li className="relative flex flex-col rounded-xl border border-line bg-cream-50 p-4">
      {o.badge && <Badge className="absolute top-3 right-3">{o.badge}</Badge>}
      <Icon width={30} height={30} strokeWidth={1.3} className="text-ink" />
      <h3 className="mt-5 font-serif text-[15px] leading-tight text-ink">{o.title}</h3>
      <p className="mt-1 text-[14px] text-ink">{o.duration}</p>
      <p className="mt-2 min-h-[2.6rem] text-[12px] leading-snug text-muted">{o.description}</p>
      <p className="mt-3 text-[12px] font-medium text-ink">{o.price}</p>
      <Link
        href="/bag"
        className="mt-3 flex h-9 items-center justify-center rounded-md border border-ink/60 text-[12.5px] text-ink transition-colors hover:bg-cream-200"
      >
        Select
      </Link>
    </li>
  );
}

/** Tablet / mobile row (below xl) */
function OptionRow({ o }: { o: DeliveryOption }) {
  const Icon = o.icon;
  return (
    <li>
      <Link
        href="/bag"
        className="flex items-center gap-3 rounded-xl border border-line bg-cream-50 px-3.5 py-3 transition-colors hover:bg-cream-200 sm:gap-4 sm:px-4 sm:py-3.5"
      >
        <Icon width={26} height={26} strokeWidth={1.3} className="shrink-0 text-ink" />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[14.5px] leading-tight text-ink">{o.title}</h3>
          <p className="mt-0.5 text-[12px] text-muted">
            <span className="sm:hidden">{o.durationShort}</span>
            <span className="hidden sm:inline">{o.duration}</span>
          </p>
          <p className="mt-0.5 hidden text-[11.5px] font-medium text-ink sm:block">{o.price}</p>
        </div>
        {o.badge && <Badge className="shrink-0 py-1.5">{o.badge}</Badge>}
        <ChevronRightIcon width={16} height={16} className="shrink-0 text-ink" />
      </Link>
    </li>
  );
}

export function DeliveryOptions() {
  return (
    <section aria-labelledby="delivery-options" className="xl:grid xl:grid-cols-[minmax(0,1fr)_250px] xl:gap-5">
      <div>
        <h2 id="delivery-options" className="font-serif text-[24px] text-ink sm:text-[26px] lg:text-[30px]">
          Delivery Options
        </h2>
        <p className="mt-0.5 hidden text-[13px] text-muted sm:block sm:text-[14px]">
          Choose the option that best suits your needs.
        </p>

        <ul className="mt-4 hidden gap-3 xl:grid xl:grid-cols-4">
          {DELIVERY_OPTIONS.map((o) => (
            <OptionCard key={o.id} o={o} />
          ))}
        </ul>

        <ul className="mt-3 space-y-2.5 sm:mt-4 xl:hidden">
          {DELIVERY_OPTIONS.map((o) => (
            <OptionRow key={o.id} o={o} />
          ))}
        </ul>

        <p className="mt-3 flex items-start gap-2.5 text-[11.5px] leading-snug text-muted sm:text-[12px]">
          <InfoIcon width={16} height={16} className="mt-px shrink-0 text-rose-gold" />
          Delivery times are estimates and may vary based on your location, product availability, and external factors such as customs clearance.
        </p>
      </div>

      {/* Packaging card, desktop only */}
      <aside className="mt-0 hidden overflow-hidden rounded-xl bg-sand-200/70 xl:mt-[3.6rem] xl:block xl:self-start">
        <div className="relative h-[170px]">
          <Image src={boxImage} alt="SIDRA signature gift box" fill sizes="250px" className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-serif text-[17px] leading-snug text-ink">Beautifully Packaged, Thoughtfully Delivered</h3>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
            Your order arrives in our signature packaging, designed to protect what matters most.
          </p>
          <Link href="/about" className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-ink underline-offset-2 hover:underline">
            Learn more about our packaging <ArrowRightIcon width={13} height={13} />
          </Link>
        </div>
      </aside>
    </section>
  );
}
