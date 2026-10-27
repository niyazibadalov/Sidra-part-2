import { DiamondIcon, ReturnBoxIcon, ShieldCheckIcon, TruckIcon } from "../Icons";

const ITEMS = [
  { icon: DiamondIcon, title: "Secure Payments", sub: "Your information is encrypted" },
  { icon: TruckIcon, title: "Global Delivery", sub: "To 100+ countries" },
  { icon: ReturnBoxIcon, title: "Easy Returns", sub: "Hassle-free within 30 days" },
  { icon: ShieldCheckIcon, title: "Authenticity Guaranteed", sub: "Every piece is verified" },
];

export function ServiceAssuranceBar() {
  return (
    <section aria-label="Our promises" className="border-y border-line bg-cream-50">
      <ul className="mx-auto grid max-w-360 grid-cols-4 px-2 py-3 sm:px-6 lg:px-10 lg:py-4">
        {ITEMS.map(({ icon: Icon, title, sub }) => (
          <li
            key={title}
            className="flex flex-col items-center gap-1 px-1 text-center lg:flex-row lg:justify-center lg:gap-3 lg:border-l lg:border-line lg:text-left lg:first:border-l-0"
          >
            <Icon width={22} height={22} className="shrink-0 text-ink" strokeWidth={1.4} />
            <span className="min-w-0">
              <span className="block text-[9.5px] leading-tight font-medium text-ink sm:text-[11px] lg:text-[12.5px]">
                {title}
              </span>
              <span className="hidden text-[11.5px] text-muted lg:block">{sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
