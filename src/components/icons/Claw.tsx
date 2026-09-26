import type { IconProps } from "./types";

export default function Claw({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 12 20 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M28 8 30 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 10 38 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M50 16 44 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M18 40c1 8 7 13 14 13s13-5 14-13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
