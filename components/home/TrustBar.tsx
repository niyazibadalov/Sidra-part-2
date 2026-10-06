import {
  DiamondIcon,
  LeafIcon,
  ReturnBoxIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "../Icons";

const PROPOSITIONS = [
  {
    icon: DiamondIcon,
    title: "Curated & Verified",
    subtitle: "Jewellery",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payments",
    subtitle: "Worldwide",
  },
  {
    icon: TruckIcon,
    title: "Global Delivery",
    subtitle: "To 100+ Countries",
  },
  {
    icon: ReturnBoxIcon,
    title: "Easy Returns",
    subtitle: "Hassle-Free",
  },
  {
    icon: LeafIcon,
    title: "A More Sustainable",
    subtitle: "Future",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Why choose Sidra" className="border-b border-line bg-cream-50">
      <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-10 lg:py-8">
        <ul className="grid grid-cols-2 gap-3 min-[400px]:gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-8">
          {PROPOSITIONS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex min-w-0 items-center gap-2.5 sm:gap-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-cream-200/90 text-ink ring-1 ring-line sm:size-14">
                  <Icon width={22} height={22} className="sm:h-7 sm:w-7" strokeWidth={1.4} />
                </div>
                <div className="min-w-0 text-[12px] leading-tight sm:text-[13px] sm:leading-snug">
                  <p className="font-medium text-ink break-words">{item.title}</p>
                  <p className="text-[11px] text-muted sm:text-[12px]">{item.subtitle}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
