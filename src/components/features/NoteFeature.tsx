import { useState } from "react";
import Sticker from "../Sticker";
import Modal from "../Modal";
import IconPop from "../IconPop";
import { Envelope } from "../icons";
import { noteMessage } from "../../data/content";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function NoteFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sticker
        icon={Envelope}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="note-title">
        <div className="flex flex-col items-center gap-4 pt-1 text-center">
          <IconPop>
            <Envelope className="h-12 w-12 text-[var(--color-lav-deep)]" />
          </IconPop>
          <h2 id="note-title" className="sr-only">
            a small note
          </h2>
          <div className="space-y-3 text-left text-[15px] leading-relaxed text-[var(--color-ink)]">
            {noteMessage.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
