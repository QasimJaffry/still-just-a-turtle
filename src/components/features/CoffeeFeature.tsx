import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Coffee } from "../icons";
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

const SIPS_TO_EMPTY = 4;

// a little fill meter under the cup -- tap "sip" to drink it down, the
// steam gets fainter as it empties, and a fresh (full) cup pours itself
// back in once it's gone. cycles through the message pool per sip.
export default function CoffeeFeature({ id, label, messages, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [sips, setSips] = useState(0);
  const level = Math.max(0, SIPS_TO_EMPTY - sips) / SIPS_TO_EMPTY;
  const isEmpty = sips >= SIPS_TO_EMPTY;

  const sip = () => {
    setSips((s) => (s >= SIPS_TO_EMPTY ? 0 : s + 1));
    setIndex((i) => (i + 1) % messages.length);
  };

  return (
    <>
      <Sticker
        icon={Coffee}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
          setSips(0);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>

          <div className="relative flex h-24 w-24 items-center justify-center">
            <motion.div
              animate={{ opacity: isEmpty ? 0.25 : 0.5 + level * 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Coffee className="h-20 w-20 text-[var(--color-lav-deep)]" />
            </motion.div>
          </div>

          {/* fill meter */}
          <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--color-panel)]">
            <motion.div
              className={`h-full rounded-full ${isEmpty ? "bg-[var(--color-ink-soft)]/40" : "bg-[var(--color-accent)]"}`}
              animate={{ width: `${level * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]">
            {isEmpty ? "empty. tragic. refilling..." : `${Math.round(level * 100)}% left`}
          </p>

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
            onClick={sip}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {isEmpty ? "pour a new one →" : "take a sip →"}
          </button>
        </div>
      </Modal>
    </>
  );
}
