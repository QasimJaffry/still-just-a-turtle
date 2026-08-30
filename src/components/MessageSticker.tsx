import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "./Sticker";
import Modal from "./Modal";
import IconPop from "./IconPop";
import { iconRegistry, type IconKey } from "./icons";
import type { Accent } from "../data/objects";

interface MessageStickerProps {
  id: string;
  icon: IconKey;
  label: string;
  messages: string[];
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function MessageSticker({
  id,
  icon,
  label,
  messages,
  rotate,
  accent,
  found,
  onOpen,
}: MessageStickerProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const Icon = iconRegistry[icon];

  const handleOpen = () => {
    onOpen(id);
    setOpen(true);
  };

  const next = () => setIndex((i) => (i + 1) % messages.length);

  return (
    <>
      <Sticker
        icon={Icon}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={handleOpen}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={`${id}-title`}>
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          <IconPop key={`icon-${index}`}>
            <Icon className="h-16 w-16 text-[var(--color-lav-deep)]" />
          </IconPop>
          <h2 id={`${id}-title`} className="sr-only">
            {label}
          </h2>
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
          {messages.length > 1 && (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
            >
              again →
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
