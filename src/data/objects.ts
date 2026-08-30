import type { IconKey } from "../components/icons";
import {
  turtleMessages,
  catMessages,
  coffeeMessages,
  donutMessages,
  bookMessages,
} from "./content";

export type Accent = "lav" | "blush" | "gold" | "plain";

export type ObjectConfig =
  | {
      id: string;
      kind: "message";
      icon: IconKey;
      label: string;
      messages: string[];
      rotate: number;
      accent: Accent;
    }
  | {
      id: string;
      kind: "special";
      component: "macbook" | "bigini" | "chup" | "record" | "note" | "tamagotchi" | "address";
      icon: IconKey;
      label: string;
      rotate: number;
      accent: Accent;
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
    kind: "message",
    icon: "turtle",
    label: "turtle",
    messages: turtleMessages,
    rotate: -6,
    accent: "lav",
  },
  {
    id: "cat-1",
    kind: "message",
    icon: "cat",
    label: "cat",
    messages: catMessages,
    rotate: 5,
    accent: "plain",
  },
  {
    id: "coffee-1",
    kind: "message",
    icon: "coffee",
    label: "coffee",
    messages: coffeeMessages,
    rotate: -3,
    accent: "gold",
  },
  {
    id: "macbook-1",
    kind: "special",
    component: "macbook",
    icon: "macbook",
    label: "the mac",
    rotate: 4,
    accent: "lav",
  },
  {
    id: "bigini-1",
    kind: "special",
    component: "bigini",
    icon: "bigini",
    label: "???",
    rotate: -5,
    accent: "gold",
  },
  {
    id: "donut-1",
    kind: "message",
    icon: "donut",
    label: "donut",
    messages: donutMessages,
    rotate: 6,
    accent: "blush",
  },
  {
    id: "book-1",
    kind: "message",
    icon: "book",
    label: "book",
    messages: bookMessages,
    rotate: -4,
    accent: "lav",
  },
  {
    id: "record-1",
    kind: "special",
    component: "record",
    icon: "record",
    label: "our song",
    rotate: 3,
    accent: "plain",
  },
  {
    id: "chup-1",
    kind: "special",
    component: "chup",
    icon: "cat",
    label: "say something stupid",
    rotate: -2,
    accent: "lav",
  },
  {
    id: "turtle-2",
    kind: "message",
    icon: "turtle",
    label: "turtle again",
    messages: turtleMessages,
    rotate: 5,
    accent: "plain",
  },
  {
    id: "tamagotchi-1",
    kind: "special",
    component: "tamagotchi",
    icon: "tamagotchi",
    label: "little guy",
    rotate: 3,
    accent: "lav",
  },
  {
    id: "address-1",
    kind: "special",
    component: "address",
    icon: "parcel",
    label: "a package",
    rotate: -4,
    accent: "gold",
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
};
