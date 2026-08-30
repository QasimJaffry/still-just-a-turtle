import type { IconProps } from "./types";

export default function Turtle({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* shell */}
      <path
        d="M14 34c0-11 8-18 18-18s18 7 18 18-8 14-18 14-18-3-18-14Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* shell segment lines */}
      <path
        d="M32 16v32M20 24c4 3 20 3 24 0M17 38c6 4 24 4 30 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* head */}
      <path
        d="M14 30c-4-1-7 1-7 4s3 4 6 3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* eye */}
      <circle cx="10.5" cy="33" r="1.2" fill="currentColor" />
      {/* legs */}
      <path
        d="M20 48c-1 3-4 5-7 4M28 50c0 3-2 5-5 5M40 50c0 3 2 5 5 5M46 47c2 3 5 4 8 2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
