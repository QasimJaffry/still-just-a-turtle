import Sparkle from "./icons/Sparkle";

// purely decorative twinkling stars — no interactivity here. The one real
// clickable star lives in WishStar.tsx as its own element, since anything
// nested inside this -z-10 layer can never actually receive clicks (it's
// pinned behind the page's stacking context no matter what z-index a child
// tries to claim).
const stars = [
  { top: "6%", left: "8%", size: 14, delay: "0s" },
  { top: "14%", left: "82%", size: 10, delay: "1.1s" },
  { top: "38%", left: "4%", size: 9, delay: "2.2s" },
  { top: "52%", left: "92%", size: 13, delay: "0.6s" },
  { top: "74%", left: "10%", size: 11, delay: "1.8s" },
  { top: "22%", left: "48%", size: 8, delay: "2.6s" },
  { top: "64%", left: "50%", size: 10, delay: "1.4s" },
];

export default function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-[twinkle_4s_ease-in-out_infinite] text-[var(--color-accent)]/60"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        >
          <Sparkle className="h-full w-full" />
        </span>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
