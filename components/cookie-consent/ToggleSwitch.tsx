type ToggleSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
};

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-10 shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        checked ? "bg-ink" : "bg-sand-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}
