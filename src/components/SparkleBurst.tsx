import Sparkle from "./icons/Sparkle";

// two small glints, fixed positions relative to their container, fire once
// on mount and fade — deliberately restrained, not a celebration burst
export default function SparkleBurst() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span
        className="sparkle-pop absolute left-[28%] top-2 text-[var(--color-accent)]"
        style={{ width: 12, height: 12, animationDelay: "0.05s" }}
      >
        <Sparkle className="h-full w-full" />
      </span>
      <span
        className="sparkle-pop absolute right-[24%] top-6 text-[var(--color-lav-deep)]/70"
        style={{ width: 9, height: 9, animationDelay: "0.22s" }}
      >
        <Sparkle className="h-full w-full" />
      </span>
    </span>
  );
}
