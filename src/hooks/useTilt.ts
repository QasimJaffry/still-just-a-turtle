import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

// a small "the room is aware of you" parallax signal -- on desktop, tracks
// the pointer position across the whole viewport and returns a spring-
// smoothed tilt; on touch devices (no fine pointer), falls back to
// scroll position instead, since there's no cursor to track. Either way
// it's a single shared value per zone section, not per-sticker, so it's
// cheap and never fights the sticker's own float/rotate/drag animations
// (which stay entirely on the sticker's own transform).
export function useTilt(strength = 8) {
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 60, damping: 20, mass: 0.6 });
  const tiltX = useTransform(smooth, (v) => v * strength);
  const hasFinePointer = useRef(
    typeof window !== "undefined" && window.matchMedia?.("(pointer: fine)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    if (hasFinePointer.current) {
      const onMove = (e: PointerEvent) => {
        const normalized = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
        raw.set(normalized);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }

    // touch fallback: gentle scroll-based sway instead of pointer tracking
    const onScroll = () => {
      const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      raw.set(progress * 2 - 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [raw]);

  return tiltX;
}
