import { GLANCE } from "./privacyData";

export function PrivacyGlance() {
  return (
    <section aria-labelledby="privacy-glance" className="rounded-xl border border-line bg-cream-50 p-4 lg:p-5">
      <h2 id="privacy-glance" className="font-serif text-[18px] text-ink sm:text-[20px]">
        Your Privacy at a Glance
      </h2>
      <ul className="mt-2 grid sm:mt-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {GLANCE.map(({ icon: Icon, title, text, short }) => (
          <li
            key={title}
            className="flex items-center gap-3 border-b border-line py-3 last:border-b-0 sm:flex-col sm:items-start sm:gap-2.5 sm:rounded-xl sm:border sm:bg-white/70 sm:p-4 sm:last:border-b"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-cream-100 text-ink-soft sm:size-10">
              <Icon width={18} height={18} />
            </span>
            <div>
              <h3 className="font-serif text-[14px] text-ink sm:text-[15px]">{title}</h3>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted sm:text-[12px]">
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{text}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
