import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Cat } from "../icons";
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

const purrs = ["mrow.", "mrrp?", "...", "mrow!", "purrrr."];

// tap the cat for a little blink-and-squish reaction (with a tiny "mrow"
// pop) before it hands over the next judgment. same message pool as
// before, including the live birthday countdown baked into it.
export default function CatFeature({ id, label, messages, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [blinkKey, setBlinkKey] = useState(0);
  const [purr, setPurr] = useState<string | null>(null);

  const pet = () => {
    setBlinkKey((k) => k + 1);
    setPurr(purrs[Math.floor(Math.random() * purrs.length)]);
    setIndex((i) => (i + 1) % messages.length);
  };

  return (
    <>
      <Sticker
        icon={Cat}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
          setPurr(null);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>

          <div className="relative flex h-24 w-24 items-center justify-center">
            <motion.button
              type="button"
              onClick={pet}
              aria-label="pet the cat"
              key={blinkKey}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: [1, 0.15, 1], scaleX: [1, 1.08, 1] }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              whileTap={{ scale: 0.92 }}
            >
              <Cat className="h-20 w-20 text-[var(--color-lav-deep)]" />
            </motion.button>
            <AnimatePresence>
              {purr && (
                <motion.span
                  key={blinkKey}
                  initial={{ opacity: 0, y: 4, scale: 0.7 }}
                  animate={{ opacity: 1, y: -18, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute -top-1 right-0 rounded-full bg-[var(--color-panel)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-ink-soft)]"
                >
                  {purr}
                </motion.span>
              )}
            </AnimatePresence>
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
            onClick={pet}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            pet the cat →
          </button>
        </div>
      </Modal>
    </>
  );
}
