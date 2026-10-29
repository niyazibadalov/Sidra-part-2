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

export const BarChartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20V14M10 20V9M16 20V4M22 20H2" />
  </Icon>
);

export const MegaphoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3 11 15-6v14L3 13v-2Z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </Icon>
);
