import type { IconProps } from "./types";

export default function Book({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 20c-4-4-13-5-20-3v29c7-2 16-1 20 3 4-4 13-5 20-3V17c-7-2-16-1-20 3Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M32 20v29" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M16 24c4-1.5 10-1.5 13 0M16 31c4-1.5 10-1.5 13 0M35 24c4-1.5 10-1.5 13 0M35 31c4-1.5 10-1.5 13 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
