import type { IconProps } from "./types";

export default function Team({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="42" cy="28" r="6.5" stroke="currentColor" strokeWidth="2.2" opacity="0.75" />
      <path
        d="M11 50c1-8 6-13 13-13s12 5 13 13"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M38 50c.8-6.5 4.6-10.5 9.5-10.5S56 44 57 50"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}
