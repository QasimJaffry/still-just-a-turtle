import { motion } from "framer-motion";

export type ChibiMood = "neutral" | "sad" | "happy";
export type ChibiVariant = "girl" | "octopus";

interface ChibiProps {
  variant: ChibiVariant;
  mood: ChibiMood;
  hug?: boolean;
  className?: string;
}

function useFace(mood: ChibiMood) {
  const eyes = {
    neutral: (
      <>
        <circle cx="26" cy="34" r="2" fill="currentColor" />
        <circle cx="38" cy="34" r="2" fill="currentColor" />
      </>
    ),
    sad: <path d="M23 33l6 2M41 33l-6 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    happy: (
      <path
        d="M22 33c1.5-2.5 6-2.5 7.5 0M34.5 33c1.5-2.5 6-2.5 7.5 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    ),
  }[mood];

  const mouth = {
    neutral: <path d="M28 42h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    sad: <path d="M27 44c2-2.5 8-2.5 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    happy: <path d="M25 41c3 4 11 4 14 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  }[mood];

  const blush =
    mood === "happy" ? (
      <>
        <circle cx="20" cy="39" r="2" fill="currentColor" opacity="0.3" />
        <circle cx="44" cy="39" r="2" fill="currentColor" opacity="0.3" />
      </>
    ) : null;

  return { eyes, mouth, blush };
}

const tentacles = [
  { d: "M16 48c-3 5-1 9 -3 15", origin: "16px 48px", delay: 0 },
  { d: "M24 51c-2 5 1 9 -1 14", origin: "24px 51px", delay: 0.12 },
  { d: "M32 52c0 5 0 9 0 14", origin: "32px 52px", delay: 0.24 },
  { d: "M40 51c2 5 -1 9 1 14", origin: "40px 51px", delay: 0.12 },
  { d: "M48 48c3 5 1 9 3 15", origin: "48px 48px", delay: 0.24 },
];

function Octopus({ mood, hug, className }: { mood: ChibiMood; hug?: boolean; className?: string }) {
  const { eyes, mouth, blush } = useFace(mood);
  return (
    <motion.div
      className={className}
      animate={
        mood === "sad"
          ? { rotate: [0, -3, 3, -2, 0], x: 0 }
          : hug
            ? { x: -14, rotate: -4, y: 0, scale: 1.08 }
            : { y: [0, -3, 0], x: 0, rotate: 0 }
      }
      transition={
        mood === "sad"
          ? { duration: 0.4 }
          : hug
            ? { type: "spring", stiffness: 300, damping: 16 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {tentacles.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            style={{ transformOrigin: t.origin }}
            animate={hug ? { rotate: 6 } : { rotate: [-9, 9, -9] }}
            transition={
              hug
                ? { duration: 0.3 }
                : { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: t.delay }
            }
          />
        ))}
        {/* round plushie body */}
        <path
          d="M12 46c0-16 9-28 20-28s20 12 20 28c0 3-1 6-3 8-3-2-6-3-9-3H24c-3 0-6 1-9 3-2-2-3-5-3-8Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {eyes}
        {mouth}
        {blush}
      </svg>
    </motion.div>
  );
}

function Girl({ mood, hug, className }: { mood: ChibiMood; hug?: boolean; className?: string }) {
  const { eyes, mouth, blush } = useFace(mood);
  return (
    <motion.div
      className={className}
      style={{ zIndex: hug ? 10 : 0 }}
      animate={
        mood === "sad"
          ? { rotate: [0, -3, 3, -2, 0], x: 0 }
          : hug
            ? { x: 14, rotate: 4, y: 0, scale: 1.08 }
            : { rotate: [0, -2, 2, 0], x: 0 }
      }
      transition={
        mood === "sad"
          ? { duration: 0.4 }
          : hug
            ? { type: "spring", stiffness: 300, damping: 16 }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <svg viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M14 70c0-10 8-16 18-16s18 6 18 16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* arm, reaches out to the right when hugging */}
        <motion.path
          d="M30 58c4 1 10 2 13 1"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
          initial={false}
          animate={
            hug
              ? { d: "M26 54c10 8 22 10 32 4", opacity: 1 }
              : { d: "M30 58c4 1 10 2 13 1", opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
        {hug && (
          <motion.circle
            initial={{ opacity: 0, cx: 43, cy: 63 }}
            animate={{ opacity: 1, cx: 58, cy: 62 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            r="2.6"
            fill="currentColor"
          />
        )}
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M13 28c-1-11 8-19 19-19s20 8 19 19c-5-4-12-6-19-6s-14 2-19 6Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M14 27c-4 3-6 9-4 15 1.5 4.5 4 8 6.5 10-1-4-2-10-2-14 0-4 0-8 1-12z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M50 27c4 3 6 9 4 15-1.5 4.5-4 8-6.5 10 1-4 2-10 2-14 0-4 0-8-1-12z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {eyes}
        {mouth}
        {blush}
      </svg>
    </motion.div>
  );
}

export default function Chibi({ variant, mood, hug, className }: ChibiProps) {
  return variant === "girl" ? (
    <Girl mood={mood} hug={hug} className={className} />
  ) : (
    <Octopus mood={mood} hug={hug} className={className} />
  );
}
