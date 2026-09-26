import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}

// Every feature (turtle, coffee, macbook, movies, ...) owns its own local
// open/onClose state and renders its own <Modal>. That's fine for each one
// individually, but nothing previously stopped two of them from being open
// at once -- tapping a second sticker while the first one's modal was
// still showing opened a second modal right on top of it, both fixed
// inset-0, stacking visibly.
//
// Fixing that properly in every feature would mean lifting "which modal
// is open" into Scene and threading it through 13 components. Instead,
// this module keeps a single top-level registry keyed by a stable
// per-instance id (useId, not the onClose closure itself -- every feature
// passes a fresh inline arrow like onClose={() => setOpen(false)} on
// every render, so comparing closures by reference is never reliable).
// Whichever Modal instance last opened becomes "active"; if a different
// instance opens next, the previously-active one's onClose fires first.
let activeId: string | null = null;
let activeCloseFn: (() => void) | null = null;

export default function Modal({ open, onClose, children, labelledBy }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const onCloseRef = useRef(onClose);

  // keeps the ref in sync with the latest onClose without mutating it
  // during render (refs are read/write-outside-render only)
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    // a different modal instance is already open -- close it before this
    // one takes over the single "active modal" slot
    if (activeId && activeId !== id && activeCloseFn) {
      activeCloseFn();
    }
    activeId = id;
    activeCloseFn = () => onCloseRef.current();
    return () => {
      if (activeId === id) {
        activeId = null;
        activeCloseFn = null;
      }
    };
  }, [open, id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Rendered via a portal straight onto <body>, deliberately outside
  // wherever this Modal happens to be mounted in the component tree.
  // Several features live inside Framer Motion's Reorder.Item (the
  // drag-to-rearrange grid) or other transformed wrappers, and CSS makes
  // `position: fixed` inside anything with a `transform` applied fix
  // itself to THAT ancestor instead of the viewport -- so without the
  // portal, a modal opened from a draggable sticker would render pinned
  // near that sticker's own position/stacking context instead of
  // centered above the whole page, letting neighboring stickers (and
  // their grip handles / found-dots) show through or overlap it.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--color-ink)]/25 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 22, scale: 0.82, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 420, damping: 20, mass: 0.7 }}
            className="relative flex max-h-[min(720px,90svh)] w-full max-w-sm flex-col overflow-y-auto rounded-[28px] bg-[var(--color-card)] p-6 text-[var(--color-ink)] shadow-[0_20px_50px_rgba(61,51,87,0.25)] sm:p-7"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-panel)] text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
              aria-label="Close"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
