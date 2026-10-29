import { COOKIE_TABLE } from "./cookieData";

const HEAD = ["Cookie", "Provider", "Purpose", "Category", "Duration"];

/** Scrolls horizontally inside its own box on small screens. */
export function CookieDetailsTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-cream-50">
      <table className="w-full min-w-[640px] text-left text-[12px]">
        <thead>
          <tr className="bg-sand-200/60 text-ink">
            {HEAD.map((h) => (
              <th key={h} scope="col" className="px-3.5 py-2.5 text-[11.5px] font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-ink-soft">
          {COOKIE_TABLE.map((r) => (
            <tr key={r.name}>
              <td className="px-3.5 py-2.5 font-mono text-[11.5px] text-ink">{r.name}</td>
              <td className="px-3.5 py-2.5 whitespace-nowrap">{r.provider}</td>
              <td className="px-3.5 py-2.5">{r.purpose}</td>
              <td className="px-3.5 py-2.5">{r.category}</td>
              <td className="px-3.5 py-2.5 whitespace-nowrap">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
