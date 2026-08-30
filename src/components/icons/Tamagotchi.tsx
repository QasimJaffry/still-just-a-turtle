import type { IconProps } from "./types";

export default function Tamagotchi({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 6c12 0 19 9 19 22s-7 24-19 24-19-11-19-24S20 6 32 6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect
        x="19"
        y="17"
        width="26"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="24" cy="49" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="49" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="40" cy="49" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M14 24c-3 1-4 4-2 6M50 24c3 1 4 4 2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
