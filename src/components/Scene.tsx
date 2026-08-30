import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sceneObjects, noteObject } from "../data/objects";
import { useDiscovery } from "../hooks/useDiscovery";
import {
  allFoundMessage,
  typedChupEasterEgg,
  typedMushroomEasterEgg,
  wishStarMessages,
} from "../data/content";
import MessageSticker from "./MessageSticker";
import MacbookFeature from "./features/MacbookFeature";
import BiginiFeature from "./features/BiginiFeature";
import ChupFeature from "./features/ChupFeature";
import RecordFeature from "./features/RecordFeature";
import NoteFeature from "./features/NoteFeature";
import TamagotchiFeature from "./features/TamagotchiFeature";
import AddressFeature from "./features/AddressFeature";
import StarField from "./StarField";
import WishStar from "./WishStar";

const WISH_STAR_ID = "wish-star";
const TOTAL = sceneObjects.length + 2; // + the note + the hidden wish star

function pick(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function Scene() {
  const { foundCount, hasFound, markFound, allFound } = useDiscovery(TOTAL);
  const [toast, setToast] = useState<string | null>(null);
  const [shownAllFoundToast, setShownAllFoundToast] = useState(false);

  // hidden global easter eggs: type certain words anywhere on the page
  useEffect(() => {
    const eggs: { word: string; message: string }[] = [
      { word: "chup", message: typedChupEasterEgg },
      { word: "mushroom", message: typedMushroomEasterEgg },
    ];
    const maxLen = Math.max(...eggs.map((e) => e.word.length));
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-maxLen);
      const hit = eggs.find((egg) => buffer.endsWith(egg.word));
      if (hit) {
        setToast(hit.message);
        buffer = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (allFound && !shownAllFoundToast) {
      setShownAllFoundToast(true);
      setToast(allFoundMessage);
    }
  }, [allFound, shownAllFoundToast]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="relative min-h-screen overflow-x-hidden px-5 pb-24 pt-14 sm:px-10">
      <StarField />
      <WishStar
        onClick={() => {
          if (!hasFound(WISH_STAR_ID)) markFound(WISH_STAR_ID);
          setToast(pick(wishStarMessages));
        }}
      />

      <header className="mx-auto mb-12 max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
          est. slowly, 2021
        </p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-[var(--color-ink)] sm:text-4xl">
          fatima&apos;s extremely
          <br />
          important department
        </h1>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)] sm:text-base">
          click things. that&apos;s the whole website.
        </p>
      </header>

      <main className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4 sm:gap-6">
        {sceneObjects.map((obj) => {
          if (obj.kind === "message") {
            return (
              <MessageSticker
                key={obj.id}
                id={obj.id}
                icon={obj.icon}
                label={obj.label}
                messages={obj.messages}
                rotate={obj.rotate}
                accent={obj.accent}
                found={hasFound(obj.id)}
                onOpen={markFound}
              />
            );
          }

          switch (obj.component) {
            case "macbook":
              return (
                <MacbookFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            case "bigini":
              return (
                <BiginiFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            case "chup":
              return (
                <ChupFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            case "record":
              return (
                <RecordFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            case "tamagotchi":
              return (
                <TamagotchiFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            case "address":
              return (
                <AddressFeature
                  key={obj.id}
                  id={obj.id}
                  label={obj.label}
                  rotate={obj.rotate}
                  accent={obj.accent}
                  found={hasFound(obj.id)}
                  onOpen={markFound}
                />
              );
            default:
              return null;
          }
        })}
      </main>

      <div className="mx-auto mt-20 flex max-w-xl flex-col items-center gap-3 border-t border-[var(--color-lav-deep)]/10 pt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
          one more thing
        </p>
        <NoteFeature
          id={noteObject.id}
          label={noteObject.label}
          rotate={noteObject.rotate}
          accent={noteObject.accent}
          found={hasFound(noteObject.id)}
          onOpen={markFound}
        />
      </div>

      <footer className="mx-auto mt-16 max-w-xl text-center">
        <p className="font-mono text-[11px] tracking-tight text-[var(--color-ink-soft)]">
          {foundCount}/{TOTAL} found
        </p>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 font-display text-sm text-[var(--color-ink-soft)]"
        >
          more to come, cutie patootie fatumatu 🐢
        </motion.p>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed inset-x-4 bottom-6 z-40 mx-auto max-w-sm rounded-2xl bg-[var(--color-ink)] px-4 py-3 text-center text-sm text-[var(--color-bg)] shadow-lg sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
