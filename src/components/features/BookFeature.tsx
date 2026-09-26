import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Book } from "../icons";
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

// each "page" flips like a real page turning (a 3D-ish rotateY, pivoting
// from the spine) instead of a flat crossfade -- matches the book icon
// and makes flipping through the fake titles feel like flipping a book.
export default function BookFeature({ id, label, messages, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const [pageNumber, setPageNumber] = useState(1);

  const turnPage = () => {
    setIndex((i) => (i + 1) % messages.length);
    setPageNumber((p) => p + 1);
  };

  return (
    <>
      <Sticker
        icon={Book}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>

          <div className="flex h-20 w-20 items-center justify-center">
            <Book className="h-16 w-16 text-[var(--color-lav-deep)]" />
          </div>

          {/* the "page" itself, with a spine shadow that shifts as pages turn */}
          <div className="relative w-full" style={{ perspective: 800 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "left center" }}
                className="relative rounded-lg border border-[var(--color-lav-deep)]/15 bg-[var(--color-panel)] px-4 py-4"
              >
                <p className="min-h-[3.5rem] text-[14px] italic leading-relaxed text-[var(--color-ink)]">
                  {messages[index]}
                </p>
                <p className="mt-2 text-right font-mono text-[10px] text-[var(--color-ink-soft)]">
                  — page {pageNumber}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={turnPage}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            turn the page →
          </button>
        </div>
      </Modal>
    </>
  );
}
