import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import SparkleBurst from "../SparkleBurst";
import { Macbook, Turtle, Cat, Coffee, Bigini, Sparkle } from "../icons";
import { macbookStickerOptions, type MacbookStickerId } from "../../data/content";
import type { Accent } from "../../data/objects";

const STORAGE_KEY = "corner:macbook-stickers";

const slotIcons: Record<MacbookStickerId, typeof Turtle> = {
  star: Sparkle,
  cat: Cat,
  turtle: Turtle,
  "purple-blob": Sparkle,
  coffee: Coffee,
  bigini: Bigini,
};

// fixed slot positions on the lid, purely cosmetic
const slotPosition: Record<MacbookStickerId, string> = {
  star: "left-[14%] top-[20%]",
  cat: "right-[16%] top-[16%]",
  turtle: "left-[12%] bottom-[18%]",
  "purple-blob": "left-1/2 top-[12%] -translate-x-1/2",
  coffee: "right-[14%] bottom-[22%]",
  bigini: "left-1/2 bottom-[14%] -translate-x-1/2",
};

function readStored(): MacbookStickerId[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["star", "turtle"];
  } catch {
    return ["star", "turtle"];
  }
}

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function MacbookFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<MacbookStickerId[]>(() => readStored());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(active));
    } catch {
      /* fine without persistence */
    }
  }, [active]);

  const toggle = (sid: MacbookStickerId) => {
    setActive((prev) =>
      prev.includes(sid) ? prev.filter((s) => s !== sid) : [...prev, sid]
    );
  };

  return (
    <>
      <Sticker
        icon={Macbook}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="mac-title">
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          {open && <SparkleBurst />}
          <h2 id="mac-title" className="font-display text-xl font-semibold text-[var(--color-lav-deep)]">
            first mac unlocked.
          </h2>
          <p className="text-sm text-[var(--color-ink-soft)]">
            decorate it before you actually do it to the real one.
          </p>

          {/* the lid */}
          <div className="relative mt-1 h-40 w-56 rounded-[18px] border-2 border-[var(--color-lav-deep)]/40 bg-[var(--color-panel)]">
            <div className="absolute inset-x-6 top-3 h-2 rounded-full bg-[var(--color-lav-deep)]/15" />
            {macbookStickerOptions.map((opt) => {
              const Icon = slotIcons[opt.id];
              const isActive = active.includes(opt.id);
              return (
                <AnimatePresence key={opt.id}>
                  {isActive && (
                    <motion.span
                      className={`absolute ${slotPosition[opt.id]}`}
                      initial={{ scale: 0, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 16 }}
                      aria-hidden="true"
                    >
                      <Icon className="h-8 w-8 text-[var(--color-lav-deep)]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {macbookStickerOptions.map((opt) => {
              const isActive = active.includes(opt.id);
              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggle(opt.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-[var(--color-lav-deep)] text-white"
                      : "bg-[var(--color-panel)] text-[var(--color-lav-deep)] hover:bg-[var(--color-lav)]"
                  }`}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
          <p className="text-xs text-[var(--color-ink-soft)]">
            saved on this device. it'll be here next time you open this.
          </p>
        </div>
      </Modal>
    </>
  );
}
