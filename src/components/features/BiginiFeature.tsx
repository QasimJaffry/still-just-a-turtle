import { useState } from "react";
import Sticker from "../Sticker";
import Modal from "../Modal";
import IconPop from "../IconPop";
import SparkleBurst from "../SparkleBurst";
import { Bigini } from "../icons";
import { biginiCopy } from "../../data/content";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function BiginiFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sticker
        icon={Bigini}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="bigini-title">
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          {open && <SparkleBurst />}
          <span className="rounded-full bg-[var(--color-accent)]/25 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-ink-soft)]">
            limited &quot;availability&quot;
          </span>
          <IconPop>
            <Bigini className="h-20 w-20 text-[var(--color-lav-deep)]" />
          </IconPop>
          <h2 id="bigini-title" className="font-display text-2xl text-[var(--color-lav-deep)]">
            {biginiCopy.brand}
          </h2>
          <p className="text-sm italic text-[var(--color-ink-soft)]">{biginiCopy.tagline}</p>
          <p className="font-mono text-xl text-[var(--color-ink)]">{biginiCopy.price}</p>
          <p className="text-xs text-[var(--color-ink-soft)]">{biginiCopy.priceNote}</p>
          <ul className="mt-1 space-y-1 text-left text-sm text-[var(--color-ink)]">
            {biginiCopy.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span aria-hidden="true">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled
            className="mt-2 w-full cursor-not-allowed rounded-full bg-[var(--color-panel)] px-4 py-2.5 text-sm font-semibold text-[var(--color-ink-soft)]"
          >
            add to cart (disabled, mercifully)
          </button>
          <p className="text-xs text-[var(--color-ink-soft)]">{biginiCopy.footer}</p>
        </div>
      </Modal>
    </>
  );
}
