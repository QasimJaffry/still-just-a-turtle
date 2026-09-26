import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sceneObjects, noteObject, zoneCopy } from "../data/objects";
import type { Zone } from "../data/objects";
import { useDiscovery } from "../hooks/useDiscovery";
import { useVisitStreak } from "../hooks/useVisitStreak";
import { useStickerOrder } from "../hooks/useStickerOrder";
import StickerZone from "./StickerZone";
import {
  allFoundMessage,
  typedChupEasterEgg,
  typedMushroomEasterEgg,
  wishStarMessages,
  timeOfDayGreeting,
  streakMessage,
  birthdayMessage,
  isHerBirthdayToday,
} from "../data/content";
import MessageSticker from "./MessageSticker";
import MacbookFeature from "./features/MacbookFeature";
import BiginiFeature from "./features/BiginiFeature";
import ChupFeature from "./features/ChupFeature";
import RecordFeature from "./features/RecordFeature";
import NoteFeature from "./features/NoteFeature";
import TamagotchiFeature from "./features/TamagotchiFeature";
import AddressFeature from "./features/AddressFeature";
import MoviesFeature from "./features/MoviesFeature";
import TurtleFeature from "./features/TurtleFeature";
import CatFeature from "./features/CatFeature";
import CoffeeFeature from "./features/CoffeeFeature";
import DonutFeature from "./features/DonutFeature";
import BookFeature from "./features/BookFeature";
import StarField from "./StarField";
import WishStar from "./WishStar";
import Sparkle from "./icons/Sparkle";

const WISH_STAR_ID = "wish-star";
const TOTAL = sceneObjects.length + 2; // + the note + the hidden wish star

// display order for the zone sections -- rituals first (the stuff she'll
// recognize instantly), just-her last before the note, since that's the
// most personal cluster
const ZONE_ORDER: Zone[] = ["rituals", "watching", "bits", "just-her"];

function pick(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function Scene() {
  const { foundCount, hasFound, markFound, allFound } = useDiscovery(TOTAL);
  const [toast, setToast] = useState<string | null>(null);
  const [shownAllFoundToast, setShownAllFoundToast] = useState(false);
  const streak = useVisitStreak();
  const isBirthday = useMemo(() => isHerBirthdayToday(), []);
  const { applyOrder, setZoneOrder, resetOrder } = useStickerOrder();

  // shuffle: a little jitter map layered on top of each sticker's base
  // rotation, regenerated on demand, plus a reset of any custom drag
  // order back to the designed layout -- shuffle is meant to feel like a
  // genuine "reset the room", not just a rotation tweak
  const [jitter, setJitter] = useState<Record<string, number> | null>(null);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffle = () => {
    const next: Record<string, number> = {};
    for (const obj of sceneObjects) {
      next[obj.id] = Math.round((Math.random() - 0.5) * 24);
    }
    setJitter(next);
    resetOrder();
    setShuffleKey((k) => k + 1);
  };

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

  const objectById = useMemo(() => {
    const map = new Map<string, (typeof sceneObjects)[number]>();
    for (const obj of sceneObjects) map.set(obj.id, obj);
    return map;
  }, []);

  const zoneDefaultIds = useMemo(() => {
    const groups = new Map<Zone, string[]>();
    for (const zone of ZONE_ORDER) groups.set(zone, []);
    for (const obj of sceneObjects) {
      const list = groups.get(obj.zone);
      if (list) list.push(obj.id);
    }
    return groups;
  }, []);

  const streakNote = streak ? streakMessage(streak) : null;

  const renderObjectById = (id: string) => {
    const obj = objectById.get(id);
    if (!obj) return null;
    const rotate = jitter?.[obj.id] ?? obj.rotate;

    if (obj.kind === "message") {
      return (
        <MessageSticker
          key={obj.id}
          id={obj.id}
          icon={obj.icon}
          label={obj.label}
          messages={obj.messages}
          rotate={rotate}
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
            rotate={rotate}
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
            rotate={rotate}
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
            rotate={rotate}
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
            rotate={rotate}
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
            rotate={rotate}
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
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "movies":
        return (
          <MoviesFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "turtle":
        return (
          <TurtleFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            messages={obj.messages ?? []}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "cat":
        return (
          <CatFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            messages={obj.messages ?? []}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "coffee":
        return (
          <CoffeeFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            messages={obj.messages ?? []}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "donut":
        return (
          <DonutFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            messages={obj.messages ?? []}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      case "book":
        return (
          <BookFeature
            key={obj.id}
            id={obj.id}
            label={obj.label}
            messages={obj.messages ?? []}
            rotate={rotate}
            accent={obj.accent}
            found={hasFound(obj.id)}
            onOpen={markFound}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden px-5 pb-24 pt-14 sm:px-10 ${
        isBirthday ? "birthday-mode" : ""
      }`}
    >
      <StarField />
      <WishStar
        onClick={() => {
          if (!hasFound(WISH_STAR_ID)) markFound(WISH_STAR_ID);
          setToast(pick(wishStarMessages));
        }}
      />

      <header className="relative mx-auto mb-12 max-w-xl text-center">
        {isBirthday && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)]/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]"
          >
            <Sparkle className="h-3 w-3 text-[var(--color-accent)]" />
            happy birthday
            <Sparkle className="h-3 w-3 text-[var(--color-accent)]" />
          </motion.div>
        )}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-soft)]">
          est. slowly, 2021
        </p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-[var(--color-ink)] sm:text-4xl">
          fatima&apos;s extremely
          <br />
          important department
        </h1>
        <p className="mt-4 text-sm text-[var(--color-ink-soft)] sm:text-base">
          {isBirthday ? birthdayMessage : timeOfDayGreeting()}
        </p>
      </header>

      <div className="mx-auto mb-6 flex max-w-3xl justify-center">
        <button
          type="button"
          onClick={shuffle}
          className="rounded-full bg-[var(--color-panel)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)]"
        >
          ↻ shuffle the room
        </button>
      </div>

      <main className="mx-auto flex max-w-3xl flex-col gap-10">
        {ZONE_ORDER.map((zone, zoneIndex) => {
          const defaultIds = zoneDefaultIds.get(zone) ?? [];
          if (defaultIds.length === 0) return null;
          const ids = applyOrder(zone, defaultIds);
          const copy = zoneCopy[zone];
          return (
            <StickerZone
              key={zone}
              heading={copy.label}
              sub={copy.sub}
              ids={ids}
              onReorder={(nextIds) => setZoneOrder(zone, nextIds)}
              renderItem={renderObjectById}
              entranceKey={shuffleKey}
              sectionDelay={0.15 + zoneIndex * 0.12}
            />
          );
        })}
      </main>

      <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-3 border-t border-[var(--color-lav-deep)]/10 pt-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
          one more thing
        </p>
        <NoteFeature
          id={noteObject.id}
          label={noteObject.label}
          rotate={jitter?.[noteObject.id] ?? noteObject.rotate}
          accent={noteObject.accent}
          found={hasFound(noteObject.id)}
          onOpen={markFound}
        />
      </div>

      <footer className="mx-auto mt-16 max-w-xl text-center">
        <p className="font-mono text-[11px] tracking-tight text-[var(--color-ink-soft)]">
          {foundCount}/{TOTAL} found
        </p>
        {streakNote && (
          <p className="mt-2 font-mono text-[11px] tracking-tight text-[var(--color-ink-soft)]">
            {streakNote}
          </p>
        )}
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
