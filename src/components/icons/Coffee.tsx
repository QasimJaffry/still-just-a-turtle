import type { IconProps } from "./types";

export default function Coffee({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 26h28l-2.5 21a5 5 0 0 1-5 4.4H22.5a5 5 0 0 1-5-4.4L15 26Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M43 29h4a6 6 0 0 1 0 12h-2.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M23 8c-2 3 2 4 0 7M31 8c-2 3 2 4 0 7M39 8c-2 3 2 4 0 7"
        className="steam"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
