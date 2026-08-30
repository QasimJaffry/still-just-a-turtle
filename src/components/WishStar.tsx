import Sparkle from "./icons/Sparkle";

interface WishStarProps {
  onClick: () => void;
}

// The one real clickable star. Fixed to the viewport (like the decorative
// field) so it stays put as you scroll, matching the rest of the twinkle
// layer visually — but rendered as its own element with normal stacking,
// not nested inside StarField's -z-10 container, so it can actually
// receive clicks (a child z-index can't escape a parent's negative one).
export default function WishStar({ onClick }: WishStarProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="a star"
      className="fixed flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-[twinkle_4s_ease-in-out_infinite] items-center justify-center rounded-full text-[var(--color-accent)]/60"
      style={{ top: "88%", left: "86%", animationDelay: "0.3s" }}
    >
      <span className="pointer-events-none block h-2.5 w-2.5">
        <Sparkle className="h-full w-full" />
      </span>
    </button>
  );
}
