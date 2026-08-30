import type { IconProps } from "./types";

export default function Parcel({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 22 32 12l22 10v24L32 56 10 46Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M10 22 32 32l22-10M32 32v24" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path
        d="M21 17.5 32 22.5l11-5M32 12v10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M28 40h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
