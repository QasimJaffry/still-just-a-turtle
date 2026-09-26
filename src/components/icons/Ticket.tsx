import type { IconProps } from "./types";

// a film ticket stub — used for the movie-watchlist sticker
export default function Ticket({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 22c2.8 0 5 2.2 5 5s-2.2 5-5 5v10a3 3 0 0 0 3 3h42a3 3 0 0 0 3-3V32c-2.8 0-5-2.2-5-5s2.2-5 5-5V12a3 3 0 0 0-3-3H11a3 3 0 0 0-3 3v10Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M25 9v6M25 21v6M25 33v6M25 45v6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
      <path
        d="M35 24h12M35 30h9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="38.5" cy="38" r="3.4" stroke="currentColor" strokeWidth="2" />
      <path d="M41.5 40.4 45 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
