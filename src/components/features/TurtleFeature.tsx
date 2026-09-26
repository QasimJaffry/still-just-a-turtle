import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Turtle, Sparkle } from "../icons";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  messages: string[];
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

const NUDGE_DISTANCE = 22; // px per tap
const MAX_TRAVEL = 92; // px before it loops back, keeps it inside the card

// tap the turtle to nudge it a little further across the card -- "turtle
// status: still going, slowly" made literal. it leaves a tiny dust-puff
// behind each nudge and loops back once it reaches the far edge.
export default function TurtleFeature({ id, label, messages, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [travel, setTravel] = useState(0);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [puffKey, setPuffKey] = useState(0);

  const nudge = () => {
    setTravel((t) => (t + NUDGE_DISTANCE > MAX_TRAVEL ? 0 : t + NUDGE_DISTANCE));
    setNudgeCount((n) => n + 1);
    setPuffKey((k) => k + 1);
    setIndex((i) => (i + 1) % messages.length);
  };

  return (
    <>
      <Sticker
        icon={Turtle}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
          setTravel(0);
          setNudgeCount(0);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>

          {/* the crawl lane */}
          <div className="relative h-20 w-full overflow-hidden rounded-2xl bg-[var(--color-panel)]">
            {/* a faint dashed "path" the turtle is crawling along */}
            <div
              aria-hidden="true"
              className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 border-t-2 border-dashed border-[var(--color-lav-deep)]/20"
            />
            <motion.button
              type="button"
              onClick={nudge}
              aria-label="nudge the turtle"
              className="absolute top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center"
              animate={{ left: 16 + travel }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              whileTap={{ scale: 0.88, rotate: -8 }}
            >
              <AnimatePresence>
                <motion.span
                  key={puffKey}
                  initial={{ opacity: 0.5, scale: 0.4, x: -6 }}
                  animate={{ opacity: 0, scale: 1.1, x: -16 }}
                  transition={{ duration: 0.4 }}
                  className="pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 text-[var(--color-lav-deep)]/40"
                >
                  <Sparkle className="h-3 w-3" />
                </motion.span>
              </AnimatePresence>
              <Turtle className="h-11 w-11 text-[var(--color-lav-deep)]" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="min-h-[3.5rem] text-[15px] leading-relaxed text-[var(--color-ink)]"
            >
              {messages[index]}
            </motion.p>
          </AnimatePresence>

          <button
            type="button"
            onClick={nudge}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {nudgeCount === 0 ? "nudge it →" : "nudge again →"}
          </button>
        </div>
      </Modal>
    </>
  );
}
