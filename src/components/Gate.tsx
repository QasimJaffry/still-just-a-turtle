import { useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cyrb53 } from "../lib/hash";
import Chibi, { type ChibiMood } from "./Chibi";
import Sparkle from "./icons/Sparkle";

const STORAGE_KEY = "corner:unlocked";

const wrongAnswerLines = [
  "nope.",
  "still no.",
  "not that either.",
  "getting creative, but no.",
];

function readUnlocked(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

interface GateProps {
  children: React.ReactNode;
}

export default function Gate({ children }: GateProps) {
  const [unlocked, setUnlocked] = useState(readUnlocked);
  const [value, setValue] = useState("");
  const [wrongCount, setWrongCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [mood, setMood] = useState<ChibiMood>("neutral");

  // Deliberately NOT a native <form onSubmit> -- when this file is opened
  // inside a sandboxed iframe without "allow-forms" (which is exactly how
  // some chat/file-preview UIs render an HTML file), browsers silently
  // block native form submission entirely. No error, no event, nothing.
  // Plain onClick + onKeyDown sidesteps that restriction completely since
  // it never touches the browser's form-submission machinery.
  const attempt = () => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return;

    if (cyrb53(normalized) === __GATE_HASH__) {
      setMood("happy");
      try {
        window.localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        /* still unlocks for this session even if storage fails */
      }
      // brief pause so the hug is actually visible before the page
      // transitions away, instead of unlocking instantly
      setTimeout(() => setUnlocked(true), 900);
    } else {
      setWrongCount((c) => c + 1);
      setShake(true);
      setMood("sad");
      setValue("");
      setTimeout(() => setShake(false), 400);
      setTimeout(() => setMood("neutral"), 1100);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      attempt();
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-6 text-center">
      <div className="relative mb-2 flex gap-3">
        <Chibi
          variant="girl"
          mood={mood}
          hug={mood === "happy"}
          className="h-20 w-20 text-[var(--color-lav-deep)]"
        />
        <Chibi
          variant="octopus"
          mood={mood}
          hug={mood === "happy"}
          className="h-20 w-20 text-[var(--color-lav-deep)]"
        />
        <AnimatePresence>
          {mood === "happy" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: 1, y: -14 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 text-[var(--color-accent)]"
            >
              <Sparkle className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
        this one's locked
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <motion.input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.35 }}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="password"
          className="w-56 rounded-full border-2 border-[var(--color-lav)] bg-[var(--color-card)] px-5 py-2.5 text-center text-[15px] text-[var(--color-ink)] outline-none focus-visible:border-[var(--color-lav-deep)]"
        />
        <button
          type="button"
          onClick={attempt}
          className="rounded-full bg-[var(--color-lav-deep)] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          enter
        </button>
      </div>
      <AnimatePresence mode="wait">
        {wrongCount > 0 && (
          <motion.p
            key={wrongCount}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-sm text-[var(--color-ink-soft)]"
          >
            {wrongAnswerLines[Math.min(wrongCount - 1, wrongAnswerLines.length - 1)]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
