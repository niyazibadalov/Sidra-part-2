import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

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

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7.5-4.6-9.2-9.3C1.7 7.5 3.8 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.3 3 4.2 6.2C19.5 15.4 12 20 12 20Z" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.6 4.1-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </Icon>
);

export const BagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 8h14l-1 12.5H6L5 8Z" />
    <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const PlayCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.5 9v6l4.5-3-4.5-3Z" fill="currentColor" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
  </Icon>
);

export const SparkleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
  </Icon>
);

export const DiamondIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
    <path d="M10 3 8 9l4 12 4-12-2-6" />
    <path d="M2 9h20" />
  </Icon>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const TruckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Icon>
);

export const ReturnBoxIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <path d="M20 9V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4" />
    <path d="m9 10-3-3 3-3" />
    <path d="M6 7h8a4 4 0 0 1 4 4v1" />
  </Icon>
);

export const LeafIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 21 3c-1.5 4-2 5.5-3.1 11.2A7 7 0 0 1 11 20Z" />
    <path d="M2 21c0-4 1.5-7.5 4-10" />
  </Icon>
);

export const CommunityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const InstagramIcon = (p: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <rect width="20" height="20" x="2" y="2" rx="5.5" ry="5.5" />
    <circle cx="12" cy="12" r="4.2" strokeWidth={2.2} />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...p}
  >
    <rect width="20" height="20" x="2" y="2" rx="4.5" fill="currentColor" />
    <circle cx="7" cy="7.2" r="1.3" fill="white" />
    <rect x="5.7" y="10" width="2.6" height="7.5" rx="0.5" fill="white" />
    <path
      d="M10.8 10h2.5v1.1h.04c.35-.67 1.2-1.37 2.5-1.37 2.67 0 3.16 1.76 3.16 4.05V17.5h-2.6v-3.8c0-.9-.02-2.07-1.26-2.07-1.26 0-1.45.98-1.45 2V17.5h-2.6V10z"
      fill="white"
    />
  </svg>
);

export const YouTubeIcon = (p: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    {...p}
  >
    <rect width="21" height="15.5" x="1.5" y="4.25" rx="4.5" fill="currentColor" />
    <path d="M10 8.5v7l5.5-3.5L10 8.5z" fill="white" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...p}
  >
    <path d="M14 13.5h2.5l1-3.5H14V8c0-.9.4-1.5 1.5-1.5H17V3.5s-1.2-.2-2.5-.2c-2.5 0-4 1.5-4 4.2V10H7.5v3.5H10.5V22h3.5v-8.5z" />
  </svg>
);

/* Line-art ring used inside image placeholders */
export const RingArt = (p: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 120"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <ellipse cx="60" cy="78" rx="34" ry="30" />
    <ellipse cx="60" cy="78" rx="28" ry="24" />
    <path d="M44 40h32l8 10-24 20-24-20 8-10Z" />
    <path d="M36 50h48M52 40l-4 10 12 20 12-20-4-10M60 40v10" />
  </svg>
);

export const GiftBoxIcon = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect width="20" height="5" x="2" y="7" rx="1" />
    <line x1="12" x2="12" y1="22" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </Icon>
);

export const ScissorsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" x2="8.12" y1="4" y2="15.88" />
    <line x1="14.47" x2="20" y1="14.48" y2="20" />
    <line x1="8.12" x2="12" y1="8.12" y2="12" />
  </Icon>
);

export const InsuredDeliveryIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Icon>
);

export const HeartCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 15.5s-3.8-2.3-4.5-4.5a2.2 2.2 0 0 1 3.7-2.1L12 9.6l.8-.7a2.2 2.2 0 0 1 3.7 2.1c-.7 2.2-4.5 4.5-4.5 4.5Z" />
  </Icon>
);

export const RefreshArrowsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </Icon>
);

export const DropletIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Icon>
);

export const SprayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10 2h4M12 2v4M8 6h8l1 3H7l1-3zM7 9v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9" />
  </Icon>
);

export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);

export const InspectIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    <path d="m9 11 1.5 1.5 3-3" />
  </Icon>
);

export const PouchIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 6h10l2 4v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10l2-4z" />
    <path d="M7 6l5 4 5-4" />
  </Icon>
);

export const ClaspIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="7" cy="12" r="4" />
    <circle cx="17" cy="12" r="4" />
    <path d="M11 12h2" />
  </Icon>
);

export const HelpCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </Icon>
);

export const PolishIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14 7 3-3 3 3-3 3" />
    <path d="m5 16 9-9" />
    <path d="m3 21 3-3" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M12 5v14" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);
