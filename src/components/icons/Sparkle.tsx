import type { IconProps } from "./types";

export default function Sparkle({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 1c.6 4.6 2 7.4 5 8.9-3 1.5-4.4 4.3-5 8.9-.6-4.6-2-7.4-5-8.9 3-1.5 4.4-4.3 5-8.9Z" />
      <path d="M20.5 15c.3 1.9.9 3 2.3 3.7-1.4.7-2 1.8-2.3 3.7-.3-1.9-.9-3-2.3-3.7 1.4-.7 2-1.8 2.3-3.7Z" opacity="0.7" />
    </svg>
  );
}
