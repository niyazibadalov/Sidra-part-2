import { RIGHTS } from "./privacyData";

export function YourRights({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="your-rights" className={`rounded-xl border border-line bg-cream-50 p-4 ${className}`}>
      <h2 id="your-rights" className="font-serif text-[18px] text-ink">
        Your Rights
      </h2>
      <p className="mt-0.5 text-[11.5px] text-muted">You have the right to:</p>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {RIGHTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-2.5 rounded-lg border border-line bg-white/70 px-2.5 py-2.5">
            <Icon width={17} height={17} className="shrink-0 text-ink-soft" />
            <div className="min-w-0">
              <p className="font-serif text-[12px] leading-tight text-ink">{title}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
