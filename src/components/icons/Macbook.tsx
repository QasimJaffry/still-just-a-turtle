import type { IconProps } from "./types";

export default function Macbook({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="16"
        y="12"
        width="32"
        height="22"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="32" cy="17" r="0.9" fill="currentColor" />
      <path
        d="M8 38h48l-3.5 8a3 3 0 0 1-2.8 1.8H14.3A3 3 0 0 1 11.5 46L8 38Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M26 38h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* tiny stickers on the lid */}
      <circle cx="24" cy="24" r="2.6" fill="currentColor" opacity="0.35" />
      <path
        d="M39 20l1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  );
}
