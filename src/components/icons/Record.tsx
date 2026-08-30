import type { IconProps } from "./types";

export default function Record({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="6"
        y="10"
        width="52"
        height="44"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="26" cy="32" r="14" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="26" cy="32" r="9.5" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <circle cx="26" cy="32" r="2.4" fill="currentColor" />
      <path
        d="M38 20l14-4v6l-11 3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="22.5" r="2.2" fill="currentColor" />
    </svg>
  );
}
