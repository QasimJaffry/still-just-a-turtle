import type { IconProps } from "./types";

export default function Bigini({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 26 24 12h16l4 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 26h38l-3 26a4 4 0 0 1-4 3.6H20a4 4 0 0 1-4-3.6l-3-26Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M13 26h38M20 34c8 3 16 3 24 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="1.5 4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="28" y="28" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
