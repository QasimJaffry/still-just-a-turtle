import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import IconPop from "../IconPop";
import { Envelope } from "../icons";
import { noteLetters } from "../../data/content";
import { useReadNotes } from "../../hooks/useReadNotes";
import type { Accent } from "../../data/objects";

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

// an inbox instead of one long block of text -- a short list of letters,
// tap one to open it, each tracked read/unread on this device (see
// useReadNotes.ts) so new letters can be added later without losing which
// ones she's already seen. same tone ceiling as before: joke-first
// everywhere else, this is the one place it's allowed to be genuinely
// soft, still understated.
export default function NoteFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const { isRead, markRead, readCount } = useReadNotes();

  const activeLetter = noteLetters.find((l) => l.id === activeLetterId) ?? null;
  const unreadCount = noteLetters.length - readCount;

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
          setActiveLetterId(null);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="note-title">
        <div className="flex flex-col gap-4 pt-1">
          <div className="flex flex-col items-center gap-2 text-center">
            <IconPop>
              <Envelope className="h-12 w-12 text-[var(--color-lav-deep)]" />
            </IconPop>
            <h2 id="note-title" className="font-display text-lg font-semibold text-[var(--color-lav-deep)]">
              a small note
            </h2>
            {!activeLetter && (
              <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                {unreadCount > 0 ? `${unreadCount} unread` : "all read"}
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!activeLetter ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col gap-2"
              >
                {noteLetters.map((letter) => {
                  const read = isRead(letter.id);
                  return (
                    <button
                      key={letter.id}
                      type="button"
                      onClick={() => {
                        setActiveLetterId(letter.id);
                        markRead(letter.id);
                      }}
                      className="flex items-center gap-3 rounded-2xl bg-[var(--color-panel)] px-4 py-3 text-left transition hover:bg-[var(--color-lav)]"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          read ? "bg-transparent" : "bg-[var(--color-accent)]"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-sm ${
                            read
                              ? "text-[var(--color-ink-soft)]"
                              : "font-semibold text-[var(--color-ink)]"
                          }`}
                        >
                          {letter.subject}
                        </span>
                        <span className="block truncate text-xs text-[var(--color-ink-soft)]">
                          {letter.lines[0]}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]"
                      >
                        {read ? "read" : "new"}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.16 }}
                className="flex flex-col gap-4"
              >
                <div className="space-y-3 text-left text-[15px] leading-relaxed text-[var(--color-ink)]">
                  {activeLetter.lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveLetterId(null)}
                  className="self-start rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
                >
                  ← back to notes
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Modal>
    </>
  );
}
