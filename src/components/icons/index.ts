import Turtle from "./Turtle";
import Cat from "./Cat";
import Coffee from "./Coffee";
import Macbook from "./Macbook";
import Book from "./Book";
import Donut from "./Donut";
import Record from "./Record";
import Envelope from "./Envelope";
import Bigini from "./Bigini";
import Sparkle from "./Sparkle";
import Tamagotchi from "./Tamagotchi";
import Parcel from "./Parcel";
import Ticket from "./Ticket";
import Shield from "./Shield";
import Spiral from "./Spiral";
import Team from "./Team";
import Claw from "./Claw";
import Filmstrip from "./Filmstrip";
import Burst from "./Burst";
import type { IconProps } from "./types";
import type { ComponentType } from "react";

export const iconRegistry: Record<string, ComponentType<IconProps>> = {
  turtle: Turtle,
  cat: Cat,
  coffee: Coffee,
  macbook: Macbook,
  book: Book,
  donut: Donut,
  record: Record,
  envelope: Envelope,
  bigini: Bigini,
  sparkle: Sparkle,
  tamagotchi: Tamagotchi,
  parcel: Parcel,
  ticket: Ticket,
  shield: Shield,
  spiral: Spiral,
  team: Team,
  claw: Claw,
  filmstrip: Filmstrip,
  burst: Burst,
};

export type IconKey = keyof typeof iconRegistry;

export {
  Turtle,
  Cat,
  Coffee,
  Macbook,
  Book,
  Donut,
  Record,
  Envelope,
  Bigini,
  Sparkle,
  Tamagotchi,
  Parcel,
  Ticket,
  Shield,
  Spiral,
  Team,
  Claw,
  Filmstrip,
  Burst,
};
