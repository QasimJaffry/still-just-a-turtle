import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Cat } from "../icons";
import { chupStages } from "../../data/content";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function ChupFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);

  const advance = () => setStage((s) => (s + 1 < chupStages.length ? s + 1 : s));
  const isMax = stage === chupStages.length - 1;

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
          setStage(0);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="chup-title">
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          <h2 id="chup-title" className="sr-only">
            say something stupid
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.15 }}
              className="min-h-[2.5rem] text-xl font-semibold text-[var(--color-ink)]"
            >
              {chupStages[stage]}
            </motion.p>
          </AnimatePresence>
          <button
            type="button"
            onClick={advance}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {isMax ? "keep clicking, I have nothing left" : "say something else stupid"}
          </button>
        </div>
      </Modal>
    </>
  );
}
