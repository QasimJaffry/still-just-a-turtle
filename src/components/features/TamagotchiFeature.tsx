import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { Tamagotchi } from "../icons";
import { tamagotchiCopy } from "../../data/content";
import type { Accent } from "../../data/objects";

type Stage = "hungry" | "happy" | "sleepy" | "content";

const STORAGE_KEY = "corner:tamagotchi";

interface PetState {
  stage: Stage;
  totalPets: number;
}

function readStored(): PetState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stage: "hungry", totalPets: 0 };
    const parsed = JSON.parse(raw);
    return { stage: parsed.stage ?? "hungry", totalPets: parsed.totalPets ?? 0 };
  } catch {
    return { stage: "hungry", totalPets: 0 };
  }
}

function pick(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

// a small self-contained face that changes with mood — deliberately simple
// geometric shapes, matching the line-art style of the other icons
function PetFace({ stage }: { stage: Stage }) {
  const eyes = {
    hungry: <><circle cx="24" cy="30" r="2.6" fill="currentColor" /><circle cx="40" cy="30" r="2.6" fill="currentColor" /></>,
    happy: <><path d="M20 29c1.5-2.5 6-2.5 7 0M37 29c1.5-2.5 6-2.5 7 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></>,
    sleepy: <><path d="M20 30h7M37 30h7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></>,
    content: <><path d="M20 29c1.5-2.5 6-2.5 7 0M37 29c1.5-2.5 6-2.5 7 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></>,
  }[stage];

  const mouth = {
    hungry: <circle cx="32" cy="39" r="2.4" stroke="currentColor" strokeWidth="1.8" />,
    happy: <path d="M25 38c3 3 11 3 14 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
    sleepy: <path d="M28 39h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
    content: <path d="M23 37c4 4 14 4 18 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  }[stage];

  return (
    <motion.svg
      key={stage}
      viewBox="0 0 64 64"
      fill="none"
      className="h-24 w-24 text-[var(--color-lav-deep)]"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
    >
      <path
        d="M32 6c12 0 19 9 19 22s-7 24-19 24-19-11-19-24S20 6 32 6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="19" y="17" width="26" height="20" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      {eyes}
      {mouth}
      {stage === "sleepy" && (
        <text x="45" y="16" fontSize="10" fill="currentColor" opacity="0.6">z</text>
      )}
      {stage === "content" && (
        <>
          <path d="M10 14l1 2 2 .3-1.5 1.4.3 2-1.8-1-1.8 1 .3-2L7 16.3 9 16Z" fill="currentColor" opacity="0.45" />
          <path d="M54 12l1 2 2 .3-1.5 1.4.3 2-1.8-1-1.8 1 .3-2-1.5-1.4 2-.3Z" fill="currentColor" opacity="0.45" />
        </>
      )}
    </motion.svg>
  );
}

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

export default function TamagotchiFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<PetState>(() => readStored());
  const [message, setMessage] = useState<string>(() => pick(tamagotchiCopy.hungry));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* fine without persistence */
    }
  }, [state]);

  const feed = () => {
    setState((s) => {
      if (s.stage === "content") {
        setMessage(pick(tamagotchiCopy.content));
        return s;
      }
      if (s.stage === "hungry" || s.stage === "sleepy") {
        setMessage(pick(tamagotchiCopy.happy));
        return { ...s, stage: "happy" };
      }
      setMessage(tamagotchiCopy.alreadyFull);
      return s;
    });
  };

  const pet = () => {
    setState((s) => {
      if (s.stage === "hungry") {
        setMessage(tamagotchiCopy.hungryPetResponse);
        return s;
      }
      if (s.stage === "content") {
        setMessage(pick(tamagotchiCopy.content));
        return { ...s, totalPets: s.totalPets + 1 };
      }
      const totalPets = s.totalPets + 1;
      if (totalPets >= 6) {
        setMessage(pick(tamagotchiCopy.content));
        return { stage: "content", totalPets };
      }
      if (s.stage === "happy" && totalPets % 3 === 0) {
        setMessage(pick(tamagotchiCopy.sleepy));
        return { ...s, stage: "sleepy", totalPets };
      }
      setMessage(pick(tamagotchiCopy[s.stage]));
      return { ...s, totalPets };
    });
  };

  return (
    <>
      <Sticker
        icon={Tamagotchi}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="pet-title">
        <div className="flex flex-col items-center gap-3 pt-1 text-center">
          <h2 id="pet-title" className="sr-only">
            {label}
          </h2>
          <AnimatePresence mode="wait">
            <PetFace stage={state.stage} />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="min-h-[2.5rem] text-[15px] leading-relaxed text-[var(--color-ink)]"
            >
              {message}
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-2 pt-1">
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={feed}
              className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
            >
              feed
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={pet}
              className="rounded-full bg-[var(--color-panel)] px-4 py-2 text-sm font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
            >
              pet
            </motion.button>
          </div>
        </div>
      </Modal>
    </>
  );
}
