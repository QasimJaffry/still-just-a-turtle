import type { IconProps } from "./types";

export default function Spiral({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 32c1.2-3 5-3.4 6 .5.9 3.5-2.6 6-6 5.5-4.3-.6-7.4-4.9-6.2-9.6C27.2 23 33.4 19 39 20.7c6.5 2 10.1 9 7.7 15.9-2.8 8-11.4 12.2-19.6 9.4C18 43 13 33 16.2 23.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}
