import type { IconProps } from "./types";

export default function Donut({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M22 15l3 3M40 14l-2 4M48 24l-4 2M50 36l-4-1M42 47l-2-4M24 50l1-4M15 41l3-2M14 27l4 1" />
      </g>
    </svg>
  );
}
