import type { IconProps } from "./types";

export default function Filmstrip({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="6" y="14" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="2.4" />
      <path d="M6 22h52M6 42h52" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <rect x="11" y="16.5" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="49" y="16.5" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="11" y="43.5" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="49" y="43.5" width="4" height="4" rx="1" fill="currentColor" opacity="0.6" />
      <path d="M25 27l12 5-12 5v-10Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}
