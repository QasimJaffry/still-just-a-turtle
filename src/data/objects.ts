import type { IconKey } from "../components/icons";
import {
  turtleMessages,
  catMessages,
  coffeeMessages,
  donutMessages,
  bookMessages,
} from "./content";

export type Accent = "lav" | "blush" | "gold" | "plain";

// loose visual grouping only -- purely presentational (a section heading
// + subtle divider in Scene.tsx), not a data model change anywhere else.
// every sticker still behaves exactly the same regardless of zone.
export type Zone = "rituals" | "watching" | "bits" | "just-her";

export type ObjectConfig =
  | {
      id: string;
      kind: "message";
      icon: IconKey;
      label: string;
      messages: string[];
      rotate: number;
      accent: Accent;
      zone: Zone;
    }
  | {
      id: string;
      kind: "special";
      component:
        | "macbook"
        | "bigini"
        | "chup"
        | "record"
        | "note"
        | "tamagotchi"
        | "address"
        | "movies"
        | "turtle"
        | "cat"
        | "coffee"
        | "donut"
        | "book";
      icon: IconKey;
      label: string;
      rotate: number;
      accent: Accent;
      zone: Zone;
      // only used by the message-driven special components above
      // (turtle/cat/coffee/donut/book) -- each has its own bespoke mini
      // interaction but still cycles through a plain message pool.
      messages?: string[];
    };

export const zoneCopy: Record<Zone, { label: string; sub: string }> = {
  rituals: { label: "little rituals", sub: "the daily stuff" },
  watching: { label: "stuff we watch", sub: "movies, shows, one song" },
  bits: { label: "the bits", sub: "running jokes, mostly at his expense" },
  "just-her": { label: "just for her", sub: "no notes, just vibes" },
};

// -----------------------------------------------------------------------
// To add a new simple "click it, see a message" sticker: add a "message"
// entry below with its own icon + message pool (define the pool in
// content.ts). To add a new bespoke interactive piece (like the MacBook
// or Bigini), build the component under components/features/, register it
// in components/Scene.tsx's switch, then add a "special" entry here.
// -----------------------------------------------------------------------
export const sceneObjects: ObjectConfig[] = [
  {
    id: "turtle-1",
    kind: "special",
    component: "turtle",
    icon: "turtle",
    label: "turtle",
    messages: turtleMessages,
    rotate: -6,
    accent: "lav",
    zone: "rituals",
  },
  {
    id: "coffee-1",
    kind: "special",
    component: "coffee",
    icon: "coffee",
    label: "coffee",
    messages: coffeeMessages,
    rotate: -3,
    accent: "gold",
    zone: "rituals",
  },
  {
    id: "donut-1",
    kind: "special",
    component: "donut",
    icon: "donut",
    label: "donut",
    messages: donutMessages,
    rotate: 6,
    accent: "blush",
    zone: "rituals",
  },
  {
    id: "turtle-2",
    kind: "special",
    component: "turtle",
    icon: "turtle",
    label: "turtle again",
    messages: turtleMessages,
    rotate: 5,
    accent: "plain",
    zone: "rituals",
  },
  {
    id: "book-1",
    kind: "special",
    component: "book",
    icon: "book",
    label: "book",
    messages: bookMessages,
    rotate: -4,
    accent: "lav",
    zone: "watching",
  },
  {
    id: "record-1",
    kind: "special",
    component: "record",
    icon: "record",
    label: "our song",
    rotate: 3,
    accent: "plain",
    zone: "watching",
  },
  {
    id: "movies-1",
    kind: "special",
    component: "movies",
    icon: "ticket",
    label: "doomsday watchlist",
    rotate: 5,
    accent: "gold",
    zone: "watching",
  },
  {
    id: "chup-1",
    kind: "special",
    component: "chup",
    icon: "cat",
    label: "say something stupid",
    rotate: -2,
    accent: "lav",
    zone: "bits",
  },
  {
    id: "bigini-1",
    kind: "special",
    component: "bigini",
    icon: "bigini",
    label: "???",
    rotate: -5,
    accent: "gold",
    zone: "bits",
  },
  {
    id: "address-1",
    kind: "special",
    component: "address",
    icon: "parcel",
    label: "mission: accomplished",
    rotate: -4,
    accent: "gold",
    zone: "bits",
  },
  {
    id: "cat-1",
    kind: "special",
    component: "cat",
    icon: "cat",
    label: "cat",
    messages: catMessages,
    rotate: 5,
    accent: "plain",
    zone: "just-her",
  },
  {
    id: "macbook-1",
    kind: "special",
    component: "macbook",
    icon: "macbook",
    label: "the mac",
    rotate: 4,
    accent: "lav",
    zone: "just-her",
  },
  {
    id: "tamagotchi-1",
    kind: "special",
    component: "tamagotchi",
    icon: "tamagotchi",
    label: "little guy",
    rotate: 3,
    accent: "lav",
    zone: "just-her",
  },
];

// the sincere note is rendered separately, at the end of the scene, so it
// never competes visually with the joke objects
export const noteObject: ObjectConfig = {
  id: "note-1",
  kind: "special",
  component: "note",
  icon: "envelope",
  label: "a small note",
  rotate: -2,
  accent: "plain",
  zone: "just-her",
};
