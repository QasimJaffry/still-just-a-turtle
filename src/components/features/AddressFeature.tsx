import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import IconPop from "../IconPop";
import { Parcel } from "../icons";
import { addressStages } from "../../data/content";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function AddressFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);

  const advance = () => setStage((s) => (s + 1 < addressStages.length ? s + 1 : s));
  const isMax = stage === addressStages.length - 1;

  return (
    <>
      <Sticker
        icon={Parcel}
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
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="address-title">
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          <h2 id="address-title" className="sr-only">
            {label}
          </h2>
          <IconPop key={stage}>
            <Parcel className="h-14 w-14 text-[var(--color-lav-deep)]" />
          </IconPop>
          <AnimatePresence mode="wait">
            <motion.p
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="min-h-[2.5rem] text-[15px] leading-relaxed text-[var(--color-ink)]"
            >
              {addressStages[stage]}
            </motion.p>
          </AnimatePresence>
          <button
            type="button"
            onClick={advance}
            className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
          >
            {isMax ? "still no luck" : "try again"}
          </button>
        </div>
      </Modal>
    </>
  );
}
