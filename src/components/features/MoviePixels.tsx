import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

// Small animated pixel sprites for the movie-watchlist feature. These are
// original, abstracted pixel-art homages -- built from flat color blocks,
// front-facing, each keyed to ONE iconic silhouette cue that actually
// reads at a glance (big white lens-eyes on a red mask, an angular gold
// faceplate, two pointed mask-ears, curved horns) plus that character's
// color palette. Not a reproduction of any actual costume texture, suit
// panel-lines, or logo -- closer to how a simplified emoji or favicon
// gets the idea across with a handful of shapes. Deliberately a
// different visual register from the rest of the site's stroke-based
// line art (see icons/*.tsx) -- a little palette cleanser for the
// "watchlist" conceit. They pop in for a beat whenever you move between
// sections, matched loosely to that section's theme.

export type PixelCharacter = "spidery" | "armored" | "clawed" | "trickster";

const PX = 3; // one pixel-art "cell" in real px on a 16x16 grid

type Cell = [number, number, string];

const RED = "#D6393B";
const RED_DK = "#A82C2E";
const BLUE = "#2F4E9E";
const WHITE = "#FAF7FC";
const WEB_LINE = "#8C1F21";

const GOLD = "#E3B23C";
const GOLD_DK = "#B8862A";
const CRIMSON = "#8C2A2A";
const FACE_GLOW = "#F6D97A";

const NAVY = "#1F2A44";
const TAN = "#E8B96A";
const TAN_DK = "#C4934A";
const CLAW_STEEL = "#DCE0E6";

const EMERALD = "#2F6B4F";
const EMERALD_DK = "#1F4A36";
const LOKI_GOLD = "#C9A227";
const SKIN = "#E7C9A5";

// ---------------------------------------------------------------------
// SPIDER (red/blue mask, big white lens-eyes + web-line stitching --
// the single most recognizable cue for this character)
// ---------------------------------------------------------------------
const spideryFrameA: Cell[] = [
  [5, 1, RED], [6, 1, RED], [7, 1, RED], [8, 1, RED], [9, 1, RED], [10, 1, RED],
  [4, 2, RED], [5, 2, RED_DK], [6, 2, RED], [7, 2, RED], [8, 2, RED], [9, 2, RED_DK], [10, 2, RED], [11, 2, RED],
  [4, 3, RED], [5, 3, WHITE], [6, 3, WHITE], [7, 3, RED], [8, 3, RED], [9, 3, WHITE], [10, 3, WHITE], [11, 3, RED],
  [4, 4, RED], [5, 4, WHITE], [6, 4, WHITE], [7, 4, RED], [8, 4, RED], [9, 4, WHITE], [10, 4, WHITE], [11, 4, RED],
  [4, 5, RED], [5, 5, RED_DK], [6, 5, RED], [7, 5, RED], [8, 5, RED], [9, 5, RED_DK], [10, 5, RED], [11, 5, RED],
  [5, 6, RED], [6, 6, WEB_LINE], [7, 6, RED], [8, 6, RED], [9, 6, WEB_LINE], [10, 6, RED],
  [5, 7, RED], [10, 7, RED],
  [4, 8, BLUE], [5, 8, RED], [6, 8, RED], [9, 8, RED], [10, 8, RED], [11, 8, BLUE],
  [3, 9, BLUE], [4, 9, BLUE], [11, 9, BLUE], [12, 9, BLUE],
  [3, 10, BLUE], [12, 10, BLUE],
  [5, 11, RED], [10, 11, RED],
  [5, 12, RED], [10, 12, RED],
  [4, 13, BLUE], [5, 13, BLUE], [10, 13, BLUE], [11, 13, BLUE],
];
// mid-swing: head tilts, one lens narrows, web-line shoots from the wrist
const spideryFrameB: Cell[] = [
  [5, 1, RED], [6, 1, RED], [7, 1, RED], [8, 1, RED], [9, 1, RED], [10, 1, RED],
  [4, 2, RED], [5, 2, RED_DK], [6, 2, RED], [7, 2, RED], [8, 2, RED], [9, 2, RED_DK], [10, 2, RED], [11, 2, RED],
  [4, 3, RED], [5, 3, WHITE], [7, 3, RED], [8, 3, RED], [9, 3, WHITE], [10, 3, WHITE], [11, 3, RED],
  [4, 4, RED], [5, 4, WHITE], [6, 4, RED], [7, 4, RED], [8, 4, RED], [9, 4, WHITE], [10, 4, WHITE], [11, 4, RED],
  [4, 5, RED], [5, 5, RED_DK], [6, 5, RED], [7, 5, RED], [8, 5, RED], [9, 5, RED_DK], [10, 5, RED], [11, 5, RED],
  [5, 6, RED], [6, 6, WEB_LINE], [7, 6, RED], [8, 6, RED], [9, 6, WEB_LINE], [10, 6, RED],
  [5, 7, RED], [10, 7, RED],
  [2, 7, WHITE], [1, 6, WHITE], // web-line shooting from the raised wrist
  [3, 8, BLUE], [4, 8, RED], [5, 8, RED], [9, 8, RED], [10, 8, RED], [11, 8, BLUE],
  [2, 9, BLUE], [3, 9, BLUE], [11, 9, BLUE], [12, 9, BLUE],
  [12, 10, BLUE],
  [5, 11, RED], [10, 12, RED],
  [5, 12, RED], [11, 13, RED],
  [4, 13, BLUE], [5, 13, BLUE], [10, 14, BLUE], [11, 14, BLUE],
];

// ---------------------------------------------------------------------
// ARMORED (red/gold faceplate helmet -- angular eye-slits + chin, the
// arc-reactor glow at the chest)
// ---------------------------------------------------------------------
const armoredFrameA: Cell[] = [
  [5, 1, GOLD], [6, 1, GOLD], [9, 1, GOLD], [10, 1, GOLD],
  [4, 2, CRIMSON], [5, 2, GOLD], [6, 2, GOLD], [7, 2, CRIMSON], [8, 2, CRIMSON], [9, 2, GOLD], [10, 2, GOLD], [11, 2, CRIMSON],
  [4, 3, CRIMSON], [5, 3, FACE_GLOW], [6, 3, GOLD_DK], [7, 3, CRIMSON], [8, 3, CRIMSON], [9, 3, GOLD_DK], [10, 3, FACE_GLOW], [11, 3, CRIMSON],
  [4, 4, CRIMSON], [5, 4, FACE_GLOW], [6, 4, CRIMSON], [7, 4, CRIMSON], [8, 4, CRIMSON], [9, 4, CRIMSON], [10, 4, FACE_GLOW], [11, 4, CRIMSON],
  [4, 5, CRIMSON], [5, 5, CRIMSON], [6, 5, GOLD], [7, 5, GOLD], [8, 5, GOLD], [9, 5, GOLD], [10, 5, CRIMSON], [11, 5, CRIMSON],
  [4, 6, GOLD], [5, 6, CRIMSON], [6, 6, CRIMSON], [7, 6, GOLD_DK], [8, 6, GOLD_DK], [9, 6, CRIMSON], [10, 6, CRIMSON], [11, 6, GOLD],
  [3, 7, CRIMSON], [4, 7, CRIMSON], [11, 7, CRIMSON], [12, 7, CRIMSON],
  [3, 8, CRIMSON], [4, 8, GOLD], [5, 8, CRIMSON], [6, 8, CRIMSON], [7, 8, FACE_GLOW], [8, 8, FACE_GLOW], [9, 8, CRIMSON], [10, 8, CRIMSON], [11, 8, GOLD], [12, 8, CRIMSON],
  [3, 9, CRIMSON], [4, 9, CRIMSON], [7, 9, FACE_GLOW], [8, 9, FACE_GLOW], [11, 9, CRIMSON], [12, 9, CRIMSON],
  [4, 10, CRIMSON], [5, 10, CRIMSON], [10, 10, CRIMSON], [11, 10, CRIMSON],
  [4, 11, GOLD], [5, 11, GOLD], [10, 11, GOLD], [11, 11, GOLD],
  [4, 12, GOLD_DK], [10, 12, GOLD_DK],
];
// repulsors fire -- palms glow bright, shoulders lift
const armoredFrameB: Cell[] = [
  [5, 0, GOLD], [6, 0, GOLD], [9, 0, GOLD], [10, 0, GOLD],
  [4, 1, CRIMSON], [5, 1, GOLD], [6, 1, GOLD], [7, 1, CRIMSON], [8, 1, CRIMSON], [9, 1, GOLD], [10, 1, GOLD], [11, 1, CRIMSON],
  [4, 2, CRIMSON], [5, 2, FACE_GLOW], [6, 2, GOLD_DK], [7, 2, CRIMSON], [8, 2, CRIMSON], [9, 2, GOLD_DK], [10, 2, FACE_GLOW], [11, 2, CRIMSON],
  [4, 3, CRIMSON], [5, 3, FACE_GLOW], [6, 3, CRIMSON], [7, 3, CRIMSON], [8, 3, CRIMSON], [9, 3, CRIMSON], [10, 3, FACE_GLOW], [11, 3, CRIMSON],
  [4, 4, CRIMSON], [5, 4, CRIMSON], [6, 4, GOLD], [7, 4, GOLD], [8, 4, GOLD], [9, 4, GOLD], [10, 4, CRIMSON], [11, 4, CRIMSON],
  [2, 5, FACE_GLOW], [3, 5, GOLD], [4, 5, CRIMSON], [5, 5, CRIMSON], [10, 5, CRIMSON], [11, 5, CRIMSON], [12, 5, GOLD], [13, 5, FACE_GLOW],
  [1, 6, FACE_GLOW], [3, 6, CRIMSON], [4, 6, CRIMSON], [11, 6, CRIMSON], [12, 6, CRIMSON], [14, 6, FACE_GLOW],
  [3, 7, CRIMSON], [4, 7, GOLD], [5, 7, CRIMSON], [6, 7, CRIMSON], [7, 7, FACE_GLOW], [8, 7, FACE_GLOW], [9, 7, CRIMSON], [10, 7, CRIMSON], [11, 7, GOLD], [12, 7, CRIMSON],
  [3, 8, CRIMSON], [4, 8, CRIMSON], [7, 8, FACE_GLOW], [8, 8, FACE_GLOW], [11, 8, CRIMSON], [12, 8, CRIMSON],
  [4, 9, CRIMSON], [5, 9, CRIMSON], [10, 9, CRIMSON], [11, 9, CRIMSON],
  [4, 10, GOLD], [5, 10, GOLD], [10, 10, GOLD], [11, 10, GOLD],
  [4, 11, GOLD_DK], [10, 11, GOLD_DK],
];

// ---------------------------------------------------------------------
// CLAWED (yellow/navy mask with two pointed mask-ears standing up -- the
// single most iconic silhouette cue -- plus three claws per hand)
// ---------------------------------------------------------------------
const clawedFrameA: Cell[] = [
  [4, 0, NAVY], [10, 0, NAVY], // pointed mask-ears
  [4, 1, NAVY], [10, 1, NAVY],
  [5, 2, NAVY], [6, 2, TAN], [7, 2, TAN], [8, 2, TAN], [9, 2, NAVY],
  [4, 3, NAVY], [5, 3, TAN], [6, 3, NAVY], [7, 3, TAN_DK], [8, 3, NAVY], [9, 3, TAN], [10, 3, NAVY],
  [4, 4, NAVY], [5, 4, TAN], [6, 4, TAN], [7, 4, TAN], [8, 4, TAN], [9, 4, TAN], [10, 4, NAVY],
  [4, 5, NAVY], [5, 5, TAN], [9, 5, TAN], [10, 5, NAVY],
  [5, 6, TAN_DK], [6, 6, TAN_DK], [7, 6, TAN_DK], [8, 6, TAN_DK], [9, 6, TAN_DK],
  [3, 7, TAN], [4, 7, NAVY], [5, 7, NAVY], [9, 7, NAVY], [10, 7, NAVY], [11, 7, TAN],
  [3, 8, NAVY], [4, 8, NAVY], [10, 8, NAVY], [11, 8, NAVY],
  [2, 9, CLAW_STEEL], [3, 9, TAN], [11, 9, TAN], [12, 9, CLAW_STEEL],
  [1, 10, CLAW_STEEL], [12, 10, CLAW_STEEL],
  [5, 10, NAVY], [6, 10, NAVY], [9, 10, NAVY], [10, 10, NAVY],
  [5, 11, TAN_DK], [10, 11, TAN_DK],
];
// claws swipe forward, head lowers -- a lunge, not a stand
const clawedFrameB: Cell[] = [
  [3, 1, NAVY], [9, 1, NAVY],
  [3, 2, NAVY], [9, 2, NAVY],
  [4, 3, NAVY], [5, 3, TAN], [6, 3, TAN], [7, 3, TAN], [8, 3, NAVY],
  [3, 4, NAVY], [4, 4, TAN], [5, 4, NAVY], [6, 4, TAN_DK], [7, 4, NAVY], [8, 4, TAN], [9, 4, NAVY],
  [3, 5, NAVY], [4, 5, TAN], [5, 5, TAN], [6, 5, TAN], [7, 5, TAN], [8, 5, TAN], [9, 5, NAVY],
  [3, 6, NAVY], [4, 6, TAN], [8, 6, TAN], [9, 6, NAVY],
  [4, 7, TAN_DK], [5, 7, TAN_DK], [6, 7, TAN_DK], [7, 7, TAN_DK], [8, 7, TAN_DK],
  [2, 8, TAN], [3, 8, NAVY], [4, 8, NAVY], [8, 8, NAVY], [9, 8, NAVY], [10, 8, TAN],
  [12, 7, CLAW_STEEL], [13, 6, CLAW_STEEL], [14, 5, CLAW_STEEL], // claws swiped out to the side
  [2, 9, NAVY], [3, 9, NAVY], [9, 9, NAVY], [10, 9, NAVY],
  [1, 10, CLAW_STEEL], [10, 10, TAN],
  [4, 10, NAVY], [5, 10, NAVY], [8, 10, NAVY], [9, 10, NAVY],
  [4, 11, TAN_DK], [9, 11, TAN_DK],
];

// ---------------------------------------------------------------------
// TRICKSTER (green/gold with tall curved horns -- the single most
// iconic cue -- plus a slight smirk)
// ---------------------------------------------------------------------
const tricksterFrameA: Cell[] = [
  [3, 0, LOKI_GOLD], [11, 0, LOKI_GOLD], // horn tips
  [3, 1, LOKI_GOLD], [4, 1, LOKI_GOLD], [10, 1, LOKI_GOLD], [11, 1, LOKI_GOLD],
  [4, 2, LOKI_GOLD], [5, 2, LOKI_GOLD], [9, 2, LOKI_GOLD], [10, 2, LOKI_GOLD],
  [5, 3, EMERALD_DK], [6, 3, SKIN], [7, 3, SKIN], [8, 3, SKIN], [9, 3, EMERALD_DK],
  [5, 4, EMERALD_DK], [6, 4, SKIN], [7, 4, SKIN], [8, 4, SKIN], [9, 4, EMERALD_DK],
  [5, 5, EMERALD_DK], [6, 5, NAVY], [7, 5, SKIN], [8, 5, NAVY], [9, 5, EMERALD_DK],
  [6, 6, SKIN], [7, 6, SKIN], [8, 6, SKIN],
  [6, 7, SKIN], [8, 7, SKIN], // faint smirk, mouth line implied by the gap
  [4, 8, LOKI_GOLD], [5, 8, EMERALD], [6, 8, EMERALD], [7, 8, EMERALD], [8, 8, EMERALD], [9, 8, EMERALD], [10, 8, LOKI_GOLD],
  [3, 9, EMERALD_DK], [4, 9, EMERALD], [10, 9, EMERALD], [11, 9, EMERALD_DK],
  [3, 10, EMERALD_DK], [11, 10, EMERALD_DK],
  [3, 11, EMERALD_DK], [11, 11, EMERALD_DK],
  [5, 12, EMERALD], [6, 12, EMERALD], [8, 12, EMERALD], [9, 12, EMERALD],
  [5, 13, LOKI_GOLD], [9, 13, LOKI_GOLD],
];
// head tilts into a conjuring smirk, cape billows wide, sparkle at the hand
const tricksterFrameB: Cell[] = [
  [4, 0, LOKI_GOLD], [12, 0, LOKI_GOLD],
  [4, 1, LOKI_GOLD], [5, 1, LOKI_GOLD], [11, 1, LOKI_GOLD], [12, 1, LOKI_GOLD],
  [5, 2, LOKI_GOLD], [6, 2, LOKI_GOLD], [10, 2, LOKI_GOLD], [11, 2, LOKI_GOLD],
  [6, 3, EMERALD_DK], [7, 3, SKIN], [8, 3, SKIN], [9, 3, SKIN], [10, 3, EMERALD_DK],
  [6, 4, EMERALD_DK], [7, 4, SKIN], [8, 4, SKIN], [9, 4, SKIN], [10, 4, EMERALD_DK],
  [6, 5, EMERALD_DK], [7, 5, NAVY], [8, 5, SKIN], [9, 5, LOKI_GOLD], [10, 5, EMERALD_DK], // one brow raised, smirking
  [7, 6, SKIN], [8, 6, SKIN], [9, 6, SKIN],
  [8, 7, SKIN],
  [13, 4, LOKI_GOLD], [14, 3, LOKI_GOLD], // sparkle at the raised hand
  [1, 8, EMERALD_DK], [2, 8, EMERALD], [3, 8, EMERALD], [5, 8, LOKI_GOLD], [6, 8, EMERALD], [7, 8, EMERALD], [8, 8, EMERALD], [9, 8, EMERALD], [10, 8, EMERALD], [11, 8, LOKI_GOLD],
  [0, 9, EMERALD_DK], [1, 9, EMERALD_DK], [11, 9, EMERALD], [12, 9, EMERALD_DK],
  [0, 10, EMERALD_DK], [12, 10, EMERALD_DK],
  [1, 11, EMERALD_DK], [11, 11, EMERALD_DK],
  [6, 12, EMERALD], [7, 12, EMERALD], [9, 12, EMERALD],
  [6, 13, LOKI_GOLD], [10, 13, LOKI_GOLD],
];

const grids: Record<PixelCharacter, { a: Cell[]; b: Cell[] }> = {
  spidery: { a: spideryFrameA, b: spideryFrameB },
  armored: { a: armoredFrameA, b: armoredFrameB },
  clawed: { a: clawedFrameA, b: clawedFrameB },
  trickster: { a: tricksterFrameA, b: tricksterFrameB },
};

// each character gets its own motion signature, not a shared bounce --
// this is what actually makes them read as different sprites in motion,
// more than the palette does.
const motionByCharacter: Record<PixelCharacter, Variants> = {
  // quick, springy hops -- always about to move
  spidery: {
    active: {
      y: [0, -7, 0, -3, 0],
      rotate: [0, -3, 0, 3, 0],
      transition: { duration: 1.1, repeat: Infinity, ease: "easeOut" },
    },
  },
  // heavy, grounded, barely moves except a slow settle -- weight over speed
  armored: {
    active: {
      y: [0, -1.5, 0],
      scale: [1, 1.03, 1],
      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    },
  },
  // low side-to-side prowl, no vertical bounce at all
  clawed: {
    active: {
      x: [0, -3, 0, 3, 0],
      rotate: [0, -2, 0, 2, 0],
      transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
  // slow drift + gentle sway, cape-like, no bounce -- floaty and unhurried
  trickster: {
    active: {
      y: [0, -3, 0],
      rotate: [-2, 2, -2],
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

// how each character's two frames swap -- timing differs too, so the
// "flicker" itself doesn't look identical across characters.
const frameTimingByCharacter: Record<PixelCharacter, { duration: number; times: number[] }> = {
  spidery: { duration: 1.1, times: [0, 0.35, 0.4, 0.85, 1] },
  armored: { duration: 2.2, times: [0, 0.6, 0.65, 0.95, 1] },
  clawed: { duration: 1.6, times: [0, 0.45, 0.5, 0.9, 1] },
  trickster: { duration: 2.6, times: [0, 0.5, 0.58, 0.92, 1] },
};

interface PixelPalProps {
  character: PixelCharacter;
  bounceKey: number;
  className?: string;
}

const SPRITE_SIZE = 64;
const GRID = 16;

// idles in its own signature motion, then flips briefly into its second
// frame and back -- a tiny two-frame sprite animation, not a full walk
// cycle, kept intentionally simple so it reads clearly at small size.
// Sits on a soft rounded chip so the flat pixel colors separate cleanly
// from the card background instead of floating directly on white.
export function PixelPal({ character, bounceKey, className }: PixelPalProps) {
  const { a, b } = grids[character];
  const motion_ = motionByCharacter[character];
  const frameTiming = frameTimingByCharacter[character];
  const viewBoxSize = GRID * PX;

  return (
    <motion.div
      key={bounceKey}
      className={`relative flex items-center justify-center rounded-xl bg-[var(--color-panel)] ${className ?? ""}`}
      initial={{ scale: 0.4, opacity: 0, rotate: -6 }}
      animate="active"
      variants={{
        active: {
          scale: 1,
          opacity: 1,
          transition: { scale: { type: "spring", stiffness: 420, damping: 14 }, opacity: { duration: 0.15 } },
        },
      }}
    >
      <motion.div variants={motion_} animate="active" className="relative" style={{ width: SPRITE_SIZE, height: SPRITE_SIZE }}>
        <motion.svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          width={SPRITE_SIZE}
          height={SPRITE_SIZE}
          shapeRendering="crispEdges"
          aria-hidden="true"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{ duration: frameTiming.duration, repeat: Infinity, times: frameTiming.times }}
        >
          {a.map(([x, y, color], i) => (
            <rect key={`a-${i}`} x={x * PX} y={y * PX} width={PX} height={PX} fill={color} />
          ))}
        </motion.svg>
        <motion.svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          width={SPRITE_SIZE}
          height={SPRITE_SIZE}
          shapeRendering="crispEdges"
          aria-hidden="true"
          className="absolute inset-0"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: frameTiming.duration, repeat: Infinity, times: frameTiming.times }}
        >
          {b.map(([x, y, color], i) => (
            <rect key={`b-${i}`} x={x * PX} y={y * PX} width={PX} height={PX} fill={color} />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

interface PixelReactionProps {
  character: PixelCharacter;
  reactionKey: number;
  line: string;
}

// the little speech-bubble pop that appears next to the nav buttons for a
// beat after moving between sections, then fades back out on its own.
export function PixelReaction({ character, reactionKey, line }: PixelReactionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={reactionKey}
        initial={{ opacity: 0, y: 6, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.9 }}
        transition={{ duration: 0.18 }}
        className="flex items-center gap-2"
      >
        <PixelPal character={character} bounceKey={reactionKey} className="h-16 w-16 shrink-0" />
        <span className="rounded-xl bg-[var(--color-panel)] px-2.5 py-1.5 text-left text-[10.5px] leading-snug text-[var(--color-ink-soft)]">
          {line}
        </span>
      </motion.div>
    </AnimatePresence>
  );
}
