import { useState } from "react";
import { motion } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import IconPop from "../IconPop";
import { Record } from "../icons";
import { recordCopy } from "../../data/content";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function RecordFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  return (
    <>
      <Sticker
        icon={Record}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="record-title">
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <IconPop>
            <motion.div
              animate={spinning ? { rotate: 360 } : { rotate: 0 }}
              transition={
                spinning
                  ? { repeat: Infinity, ease: "linear", duration: 2.4 }
                  : { duration: 0.3 }
              }
            >
              <Record className="h-24 w-24 text-[var(--color-lav-deep)]" />
            </motion.div>
          </IconPop>
          <h2 id="record-title" className="font-display text-xl font-semibold text-[var(--color-lav-deep)]">
            {recordCopy.label}
          </h2>
          <p className="text-sm text-[var(--color-ink-soft)]">{recordCopy.sub}</p>
          <button
            type="button"
            onClick={() => setSpinning((s) => !s)}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {spinning ? "pause" : "play"}
          </button>
          <p className="max-w-[220px] text-xs text-[var(--color-ink-soft)]">{recordCopy.note}</p>
        </div>
      </Modal>
    </>
  );
}
