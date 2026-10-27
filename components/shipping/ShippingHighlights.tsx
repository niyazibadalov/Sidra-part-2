import { HIGHLIGHTS } from "./shippingData";

export function ShippingHighlights() {
  return (
    <ul aria-label="Delivery highlights" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-2 lg:gap-3">
      {HIGHLIGHTS.map(({ icon: Icon, title, shortTitle, text }) => (
        <li
          key={title}
          className="flex flex-col items-center gap-2 rounded-xl border border-line/70 bg-cream-200/70 px-2 py-4 text-center lg:flex-row lg:items-start lg:gap-4 lg:px-5 lg:py-5 lg:text-left"
        >
          <Icon width={28} height={28} strokeWidth={1.3} className="shrink-0 text-ink lg:mt-1" />
          <div className="min-w-0">
            <h3 className="text-[12px] leading-tight text-ink sm:text-[11.5px] lg:font-serif lg:text-[16px]">
              <span className="lg:hidden">{shortTitle}</span>
              <span className="hidden lg:inline">{title}</span>
            </h3>
            <p className="mt-1 hidden text-[12.5px] leading-snug text-muted lg:block">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
