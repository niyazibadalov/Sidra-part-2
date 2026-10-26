import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Same visual style as components/Icons.tsx (24px grid, 1.5 stroke).
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
  </Icon>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21Z" />
    <path d="M9 9.5c.5 2 2.5 4 5 5l1.2-1.2-1.8-1-.8.7c-.9-.4-1.6-1.1-2-2l.7-.8-1-1.8L9 9.5Z" />
  </Icon>
);

export const BoltIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </Icon>
);

export const CrownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z" />
  </Icon>
);

export const ImageUploadIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </Icon>
);

export const HeadsetIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h3v5H4zM17 14h3v5h-3z" />
    <path d="M20 19a3 3 0 0 1-3 3h-3" />
  </Icon>
);
