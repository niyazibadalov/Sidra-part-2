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
