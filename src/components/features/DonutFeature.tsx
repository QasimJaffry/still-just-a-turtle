import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Donut } from "../icons";
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

const BITES_TO_FINISH = 3;

// take a bite each tap -- a little wedge-shaped notch chips off the donut
// (a clipPath cutout, not a different icon) until it's gone, then a fresh
// one appears. cycles through the message pool per bite.
export default function DonutFeature({ id, label, messages, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [bites, setBites] = useState(0);
  const isGone = bites >= BITES_TO_FINISH;

  const takeBite = () => {
    setBites((b) => (b >= BITES_TO_FINISH ? 0 : b + 1));
    setIndex((i) => (i + 1) % messages.length);
  };

  // each bite carves a wedge out of one side, rotating around the donut
  const biteClip =
    bites === 0
      ? "none"
      : `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${
          [
            "38% 0%, 62% 0%, 50% 38%",
            "100% 34%, 100% 62%, 60% 45%",
            "38% 100%, 62% 100%, 50% 62%",
          ][Math.min(bites, 3) - 1]
        })`;

  return (
    <>
      <Sticker
        icon={Donut}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
          setBites(0);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>

          <div className="relative flex h-24 w-24 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={isGone ? "gone" : bites}
                initial={{ scale: isGone ? 0 : 1, rotate: 0 }}
                animate={{ scale: 1, rotate: bites * 6 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ clipPath: isGone ? undefined : biteClip }}
              >
                <Donut className={`h-20 w-20 ${isGone ? "text-[var(--color-ink-soft)]/30" : "text-[var(--color-lav-deep)]"}`} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* bite tally */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: BITES_TO_FINISH }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  i < bites ? "bg-[var(--color-accent)]" : "bg-[var(--color-panel)]"
                }`}
              />
            ))}
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
              {isGone ? "gone. no survivors. a fresh one appears out of narrative necessity." : messages[index]}
            </motion.p>
          </AnimatePresence>

          <button
            type="button"
            onClick={takeBite}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {isGone ? "get a new one →" : "take a bite →"}
          </button>
        </div>
      </Modal>
    </>
  );
}
