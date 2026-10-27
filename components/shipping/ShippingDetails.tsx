import Link from "next/link";
import { ArrowRightIcon, ChevronDownIcon } from "../Icons";
import { INFO_TOPICS, type InfoTopic } from "./shippingData";
import { TrackingStepper } from "./TrackingStepper";

function TopicLink({ link }: { link: NonNullable<InfoTopic["link"]> }) {
  return (
    <Link href={link.href} className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] text-ink underline-offset-2 hover:underline">
      {link.label} <ArrowRightIcon width={13} height={13} />
    </Link>
  );
}

function TopicCard({ t, className = "" }: { t: InfoTopic; className?: string }) {
  const Icon = t.icon;
  return (
    <article className={`flex gap-4 rounded-xl border border-line bg-cream-50 p-5 ${className}`}>
      <Icon width={28} height={28} strokeWidth={1.3} className="mt-0.5 shrink-0 text-ink" />
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-[17px] leading-tight text-ink">{t.title}</h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{t.body}</p>
        {t.emphasis && <p className="mt-1.5 text-[12.5px] font-medium text-ink">{t.emphasis}</p>}
        {t.tracking && <TrackingStepper />}
        {t.link && <TopicLink link={t.link} />}
      </div>
    </article>
  );
}

/** Desktop: four info cards (xl and up). */
export function ShippingDetailsGrid() {
  const byId = (id: string) => INFO_TOPICS.find((t) => t.id === id)!;
  return (
    <div className="hidden space-y-3 xl:block">
      <div className="grid grid-cols-[1fr_1.15fr_1fr] gap-3">
        <TopicCard t={byId("high-value")} />
        <TopicCard t={byId("tracking")} />
        <TopicCard t={byId("international")} />
      </div>
      <div className="grid grid-cols-[1fr_1.35fr] gap-3">
        <TopicCard t={byId("split")} className="items-center" />
        <TopicCard t={byId("wrong")} />
      </div>
    </div>
  );
}

/** Tablet / mobile: collapsible rows (below xl). Uses native <details>, no client JS. */
export function ShippingAccordion() {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-cream-50 xl:hidden">
      {INFO_TOPICS.map((t) => {
        const Icon = t.icon;
        return (
          <details key={t.id} className="group">
            <summary className="flex cursor-pointer list-none items-center gap-3 px-3.5 py-3 text-[14px] text-ink sm:px-4 [&::-webkit-details-marker]:hidden">
              <Icon width={18} height={18} className="shrink-0" />
              <span className="flex-1 font-serif">{t.title}</span>
              <ChevronDownIcon width={16} height={16} className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 pl-[3.1rem] sm:pl-[3.3rem]">
              {t.body && <p className="text-[12.5px] leading-relaxed text-muted">{t.body}</p>}
              {t.emphasis && <p className="mt-1.5 text-[12.5px] font-medium text-ink">{t.emphasis}</p>}
              {t.tracking && <TrackingStepper />}
              {t.link && <TopicLink link={t.link} />}
              {t.faqs && (
                <ul className="space-y-3">
                  {t.faqs.map((f) => (
                    <li key={f.q}>
                      <p className="text-[12.5px] font-medium text-ink">{f.q}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted">{f.a}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}
