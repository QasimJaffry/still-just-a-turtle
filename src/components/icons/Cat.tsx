import type { IconProps } from "./types";

export default function Cat({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M17 24 12 11l11 8M47 24l5-13-11 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="34"
        r="19"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="24.5" cy="32" r="1.6" fill="currentColor" />
      <circle cx="39.5" cy="32" r="1.6" fill="currentColor" />
      <path
        d="M32 38v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M32 40c-1.5 2-6 2-7-1M32 40c1.5 2 6 2 7-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 36H6M14 40l-7 2M50 36h8M50 40l7 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
