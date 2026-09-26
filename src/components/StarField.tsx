import Sparkle from "./icons/Sparkle";

// mostly decorative twinkling stars — no click interactivity here (the one
// real clickable star lives in WishStar.tsx as its own element, since
// anything nested inside this -z-10 layer can never actually receive
// clicks). Each star now also drifts very slowly along its own lazy orbit,
// so the background reads as a quietly alive room rather than a static
// backdrop -- barely perceptible on its own, but it's what keeps the page
// from ever looking frozen even when nothing's being tapped.
const stars = [
  { top: "6%", left: "8%", size: 14, delay: "0s", driftX: 10, driftY: 14, driftDur: 22 },
  { top: "14%", left: "82%", size: 10, delay: "1.1s", driftX: -8, driftY: 10, driftDur: 26 },
  { top: "38%", left: "4%", size: 9, delay: "2.2s", driftX: 12, driftY: -8, driftDur: 19 },
  { top: "52%", left: "92%", size: 13, delay: "0.6s", driftX: -10, driftY: -12, driftDur: 24 },
  { top: "74%", left: "10%", size: 11, delay: "1.8s", driftX: 9, driftY: 11, driftDur: 21 },
  { top: "22%", left: "48%", size: 8, delay: "2.6s", driftX: -11, driftY: 9, driftDur: 28 },
  { top: "64%", left: "50%", size: 10, delay: "1.4s", driftX: 8, driftY: -10, driftDur: 25 },
];

export default function StarField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute text-[var(--color-accent)]/60"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            // two independent animations layered: the drift (translate, on
            // the outer span) and the twinkle (opacity/scale, on the inner
            // span) -- CSS can't animate two different transform-based
            // keyframes on one element without one clobbering the other
            animation: `star-drift-${i % 4} ${s.driftDur}s ease-in-out infinite`,
            // @ts-expect-error -- custom properties aren't in CSSProperties
            "--drift-x": `${s.driftX}px`,
            "--drift-y": `${s.driftY}px`,
          }}
        >
          <span
            className="block h-full w-full animate-[twinkle_4s_ease-in-out_infinite]"
            style={{ animationDelay: s.delay }}
          >
            <Sparkle className="h-full w-full" />
          </span>
        </span>
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes star-drift-0 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--drift-x), var(--drift-y)); }
        }
        @keyframes star-drift-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(calc(var(--drift-x) * -1), var(--drift-y)); }
        }
        @keyframes star-drift-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--drift-x), calc(var(--drift-y) * -1)); }
        }
        @keyframes star-drift-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(calc(var(--drift-x) * -1), calc(var(--drift-y) * -1)); }
        }
      `}</style>
    </div>
  );
}
