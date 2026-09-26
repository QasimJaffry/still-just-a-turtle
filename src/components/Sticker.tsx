import { motion } from "framer-motion";
import type { ComponentType } from "react";
import type { IconProps } from "./icons/types";
import type { Accent } from "../data/objects";

const accentBg: Record<Accent, string> = {
  lav: "bg-panel",
  blush: "bg-[var(--color-blush)]/40",
  gold: "bg-[var(--color-accent)]/20",
  plain: "bg-card",
};

interface StickerProps {
  icon: ComponentType<IconProps>;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onClick: () => void;
}

export default function Sticker({
  icon: Icon,
  label,
  rotate,
  accent,
  found,
  onClick,
}: StickerProps) {
  // deterministic per-sticker variation so the float feels organic without
  // being random on every render
  const floatDuration = 3 + (Math.abs(rotate) % 3) * 0.5;
  const floatDelay = (Math.abs(rotate * 7) % 10) / 10;

  return (
    <div className="relative">
      {/* a soft blurred ground shadow, animated opposite to the float --
          shrinks and lightens as the card lifts, brightens and widens as
          it settles, like it's actually catching light off a surface
          below it. lives outside the button so it never interferes with
          the button's own rotate/scale/tap transforms. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-0 h-3 rounded-full bg-[var(--color-lav-deep)]/20 blur-md"
        animate={{ scaleX: [1, 0.75, 1], opacity: [0.35, 0.15, 0.35] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      />
      <motion.button
        type="button"
        onClick={onClick}
        initial={{ rotate, y: 0 }}
        animate={{ rotate, y: [0, -5, 0] }}
        transition={{
          rotate: { type: "spring", stiffness: 260, damping: 18 },
          y: {
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: floatDelay,
          },
        }}
        whileHover={{ rotate: rotate + (rotate >= 0 ? 6 : -6), y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.94, rotate: rotate + (rotate >= 0 ? -4 : 4) }}
        className={`group relative flex w-[132px] shrink-0 flex-col items-center gap-2 rounded-[22px] ${accentBg[accent]} px-4 pb-3 pt-5 shadow-[0_6px_0_rgba(142,116,184,0.18)] ring-1 ring-[var(--color-lav-deep)]/10 sm:w-[150px]`}
        aria-label={`${label}${found ? " (already opened)" : ""}`}
      >
        {/* peel corner */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 origin-top-right rounded-bl-[16px] rounded-tr-[20px] bg-[var(--color-bg)] opacity-0 shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:rotate-[8deg]"
        />
        <motion.span whileHover={{ rotate: [0, -6, 6, -3, 0] }} transition={{ duration: 0.5 }}>
          <Icon className="h-14 w-14 text-[var(--color-lav-deep)] sm:h-16 sm:w-16" />
        </motion.span>
        <span className="font-mono text-[11px] tracking-tight text-[var(--color-ink-soft)]">
          {label}
        </span>
        {found && (
          <span
            aria-hidden="true"
            className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
          />
        )}
      </motion.button>
    </div>
  );
}
