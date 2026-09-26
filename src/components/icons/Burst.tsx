import type { IconProps } from "./types";

// the finale marker — Doomsday's gold burst
export default function Burst({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 4l5.5 15.5L53 14l-6 15.5L62 32l-15 2.5L53 50l-15.5-5.5L32 60l-5.5-5.5L11 50l6-15.5L2 32l15-2.5L11 14l15.5 5.5L32 4Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
