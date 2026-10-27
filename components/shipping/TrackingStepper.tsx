import { TRACKING_STEPS } from "./shippingData";

export function TrackingStepper() {
  return (
    <ol className="relative mt-4 grid grid-cols-5" aria-label="Order progress">
      <span aria-hidden className="absolute top-2 right-[10%] left-[10%] h-px bg-sand-400" />
      {TRACKING_STEPS.map((label, i) => (
        <li key={label} className="relative flex flex-col items-center text-center">
          <span className="grid size-4 place-items-center rounded-full border border-rose-gold bg-cream-50">
            {i < TRACKING_STEPS.length - 1 && <span className="size-1.5 rounded-full bg-rose-gold" />}
          </span>
          <span className="mt-1.5 text-[9.5px] leading-tight text-muted">{label}</span>
        </li>
      ))}
    </ol>
  );
}
