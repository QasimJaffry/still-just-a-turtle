import type { IconProps } from "./types";

export default function Envelope({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="8"
        y="16"
        width="48"
        height="34"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M9 18l23 17 23-17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 30l-1.4 2.9-3.2.4 2.3 2.3-.6 3.2 2.9-1.5 2.9 1.5-.6-3.2 2.3-2.3-3.2-.4Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}
