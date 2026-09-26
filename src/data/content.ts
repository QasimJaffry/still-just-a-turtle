// -----------------------------------------------------------------------
// ALL THE WORDS LIVE HERE.
// If you want to add a joke, tweak a line, or add a whole new message pool,
// this is the only file you need to touch for text changes.
// -----------------------------------------------------------------------

// time-of-day flavor for the header subline -- purely computed from the
// browser's local clock, no new joke content invented, just a little life.
export function timeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "click things. that's the whole website. (it's very late, go to sleep after this.)";
  if (hour < 12) return "click things. that's the whole website. good morning, by the way.";
  if (hour < 17) return "click things. that's the whole website.";
  if (hour < 22) return "click things. that's the whole website. evening shift, huh.";
  return "click things. that's the whole website. (it's very late, go to sleep after this.)";
}

// footer streak note -- shown only once there's something to say. no
// pressure framing, matches the site's "no notifications, no guilt" rule.
export function streakMessage(streak: number): string | null {
  if (streak <= 1) return null;
  if (streak === 2) return "back two days in a row. building a habit, apparently.";
  if (streak < 7) return `day ${streak} in a row. no idea why you keep coming back, but here we are.`;
  return `day ${streak} in a row?? okay this is officially a bit now.`;
}

// shown only on her actual birthday (Oct 27), computed live from Date --
// same pattern as the countdown, never hardcoded to a specific year.
export const birthdayMessage =
  "happy birthday. the whole site is still just the same dumb little corner, but today it's dressed up a bit. go click on something.";

export function isHerBirthdayToday(): boolean {
  const now = new Date();
  return now.getMonth() === 9 && now.getDate() === 27; // Oct 27, 0-indexed month
}

export const turtleMessages: string[] = [
  "turtle has arrived.",
  "this is a formal WhatsApp turtle sticker, delivered late and out of context, as tradition demands.",
  "no reason. just a turtle.",
  "turtle status: still going. slowly. correctly.",
  "you would've sent this one back to me by now.",
  "there is no lesson here. it's just a turtle.",
];

// computed once when the page loads — real date math, not a hardcoded
// string that goes stale. Sept 8, 2026 is the specific birthday in
// question (the 30th one); after that date this permanently reports 30.
function ageStatusMessage(): string {
  const target = new Date(2026, 8, 8); // month is 0-indexed: 8 = September
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.ceil((target.getTime() - now.getTime()) / msPerDay);

  if (diffDays > 1) {
    return `SYSTEM STATUS: age 29... ${diffDays} days until 30... no rush.`;
  }
  if (diffDays === 1) {
    return "SYSTEM STATUS: age 29... 1 day until 30... no rush.";
  }
  if (diffDays === 0) {
    return "SYSTEM STATUS: today's the day. 30, unfortunately.";
  }
  return "SYSTEM STATUS: 30, confirmed. the countdown has been retired.";
}

export const catMessages: string[] = [
  "cat has judged you and found you acceptable.",
  ageStatusMessage(),
  "cat sensors detect recent thoughts of Jude Bellingham. I see you.",
  "cat sensors detect recent thoughts of Zayn. noted. filed under 'ongoing issue.'",
  "this cat has more chill than either of us on a Monday.",
  "the cat would like you to know it is, in fact, superior to a dog.",
  "SYSTEM STATUS: ran the diagnostic three times to be sure. baddie confirmed, no notes.",
];

export const coffeeMessages: string[] = [
  "mushroom coffee detected. jury's still out on this one.",
  "still don't fully understand mushroom coffee. but I support the bit.",
  "coffee status: essential. mushroom coffee status: under investigation.",
  "one (1) coffee, for the person who runs on it more than sleep.",
  "if caffeine were a personality trait, you'd have several.",
];

export const donutMessages: string[] = [
  "a donut. no further explanation needed.",
  "you would eat this one first and think about it later.",
  "confirmed: donuts remain undefeated.",
  "this donut has trained for years for this moment.",
];

// fake book titles, drawn only from things we've actually joked about
export const bookMessages: string[] = [
  "\"You Are Suspiciously Good At Chopsticks: A Memoir\"",
  "\"Dexter: A Comfort Show About A Serial Killer, Somehow\" — a review, by us, laughing",
  "\"Dubai Bling: Reality TV As Performance Art\" — annotated, heavily",
  "\"Correlation, Causation, And Other Things You Explain To Me At 1am\"",
  "\"Field Notes On A Girl Who Reads Faster Than She Admits\"",
];

// the "chup" button — escalates each click, loops after the end
export const chupStages: string[] = [
  "hi",
  "just checking in",
  "...",
  "chup",
  "CHUP",
  "CHUP.",
  "ok you clearly want to keep doing this",
  "fine. chup indefinitely.",
];

export const biginiCopy = {
  brand: "BIGINI™",
  tagline: "for when a normal bag simply isn't enough.",
  price: "$999,999",
  priceNote: "(plus tax, plus your dignity, plus mine)",
  bullets: [
    "handcrafted from absolutely nothing",
    "holds up to zero (0) items",
    "comes with a certificate of authenticity signed by no one",
    "not available in stores. not available anywhere, actually.",
  ],
  footer: "unfortunately still out of budget. maybe next quarter.",
};

export const recordCopy = {
  label: "our song",
  sub: "\"One Of The Girls\" — The Weeknd",
  note: "not playing it here, obviously. but you know exactly which part I mean.",
};

// the genuine notes -- a small, growing list of letters instead of one
// block of text. each is its own read/unread entry (tracked in
// localStorage, see useReadNotes.ts), so new ones can be added later
// without disturbing what's already there. short, no big declarations,
// same tone ceiling as everywhere else -- this is just the one place it's
// allowed to be genuinely soft rather than joke-first.
export interface NoteLetter {
  id: string;
  subject: string;
  lines: string[];
}

export const noteLetters: NoteLetter[] = [
  {
    id: "note-1",
    subject: "the first one",
    lines: [
      "okay, real talk for one second, then back to the stupid stuff.",
      "I know it's been a lot lately. you don't have to reply to this, or think about it, or do anything with it at all.",
      "I just wanted to make you a dumb little corner of the internet out of all the random things that remind me of you.",
      "that's it. that's the whole thing. go click on the donut again.",
    ],
  },
  {
    id: "note-2",
    subject: "one more",
    lines: [
      "for what it's worth: I care about you a lot, and I'm genuinely proud of you — not for one specific thing, just generally, all the time.",
      "be easy on yourself. you're allowed to not have it all figured out right now. I'm here regardless, whenever you need it.",
      "okay. back to the turtles.",
    ],
  },
];

// stickers available in the MacBook decorator — matches what she's actually
// planning to do to her real one
export const macbookStickerOptions = [
  { id: "star", label: "star" },
  { id: "cat", label: "cat" },
  { id: "turtle", label: "turtle" },
  { id: "purple-blob", label: "purple blob" },
  { id: "coffee", label: "tiny coffee" },
  { id: "bigini", label: "tiny bigini (aspirational)" },
] as const;

export type MacbookStickerId = (typeof macbookStickerOptions)[number]["id"];

// shown once, quietly, if she finds every sticker on the page — no fireworks,
// just an acknowledgment
export const allFoundMessage =
  "you found all of them. that's genuinely more attention than this deserved. thank you for humoring me.";

// hidden global easter egg: typing "chup" anywhere on the page
export const typedChupEasterEgg =
  "you typed it. I don't know what you expected to happen. here's a turtle. 🐢";

// hidden global easter egg: typing "mushroom" anywhere on the page
export const typedMushroomEasterEgg =
  "you typed mushroom. respect for the commitment to the bit. here's a fake mushroom coffee. ☕🍄";

// the hidden wish star tucked into the background — a small pool so it
// doesn't say the same thing every time
export const wishStarMessages: string[] = [
  "you found the one star that does something. congratulations on paying attention.",
  "make a wish. or don't. it's just a star I drew.",
  "this star has no powers. it just wanted to be found.",
  "okay fine, one real wish: that today gets a little easier.",
];

// the running joke where he kept asking for her address so he could send
// her things, and she never told him -- until she finally did. this is
// the "mission accomplished" arc: no actual address anywhere in here,
// just the bit closing out. escalates each click, same mechanic as the
// chup button, but building up to a win instead of a loss.
export const addressStages: string[] = [
  "PATCH NOTES: the address embargo has officially ended.",
  "months of asking. one (1) successful mission.",
  "a package is now theoretically possible. groundbreaking.",
  "still deciding what to send first. the options are limitless and also mostly bad ideas.",
  "filed under: things I did not think would actually happen.",
  "okay, real talk: thank you for trusting me with it. something's coming. no pressure on when you have to like it.",
];

// the "doomsday watchlist" — grouped so it reads as a mixtape/ticket-stack
// rather than one long list. each section gets a waypoint icon (see
// icons/index.ts: shield/spiral/team/claw/filmstrip/burst) and a short
// hook line, cards expand for the fuller blurb. last entry is the finale,
// with a live-computed countdown rendered by the component itself.
export interface MovieEntry {
  title: string;
  hook: string;
  blurb: string;
  skippable?: boolean;
  watched?: boolean;
}

export interface MovieSection {
  id: string;
  waypoint: "shield" | "spiral" | "team" | "claw" | "filmstrip" | "burst";
  heading: string;
  intro: string;
  movies: MovieEntry[];
}

export const moviesCopy = {
  label: "the doomsday watchlist",
  intro:
    "you're in it for Tom Holland's Spider-Man run and Brand New Day. here's what's actually worth watching to get the full picture before Doomsday — grouped, not padded.",
  targetDate: new Date(2026, 11, 18), // Dec 18, 2026 — Avengers: Doomsday
};

// tiny reaction lines the pixel sprites "say" for a beat after you move
// between sections in the watchlist -- kept short, kept light.
export const movieReactionLines: string[] = [
  "onward.",
  "more watching to do.",
  "loading the next batch.",
  "keep going.",
  "almost through the list.",
  "there's more.",
];

export const movieFinaleReactionLine = "this is the one. big finish.";

export const movieSections: MovieSection[] = [
  {
    id: "spiderman",
    waypoint: "filmstrip",
    heading: "already yours",
    intro: "the run you started with.",
    movies: [
      {
        title: "Spider-Man: Homecoming",
        hook: "the one where he's just a kid with a suit that's too big for him.",
        blurb: "watched already — the starting point for the whole Holland run.",
        watched: true,
      },
      {
        title: "Spider-Man: Far From Home",
        hook: "European field trip, but make it a superhero movie.",
        blurb: "watched already. sets up a lot of what the multiverse stuff pays off later.",
        watched: true,
      },
      {
        title: "Spider-Man: No Way Home",
        hook: "the one that broke the internet.",
        blurb: "watched already — the multiverse door officially opens here.",
        watched: true,
      },
    ],
  },
  {
    id: "avengers-core",
    waypoint: "shield",
    heading: "the core arc",
    intro: "the actual Avengers story, start to finish.",
    movies: [
      {
        title: "The Avengers",
        hook: "the original team-up. everyone meets for the first time.",
        blurb: "the foundation — every later team-up owes this one something.",
      },
      {
        title: "Avengers: Infinity War",
        hook: "the one that ends badly on purpose.",
        blurb: "half the universe, gone. essential setup for Endgame.",
      },
      {
        title: "Avengers: Endgame",
        hook: "three hours, no notes.",
        blurb: "the payoff to everything before it. required viewing before Doomsday.",
      },
    ],
  },
  {
    id: "multiverse",
    waypoint: "spiral",
    heading: "why the multiverse is breaking",
    intro: "the part where reality gets messy.",
    movies: [
      {
        title: "Doctor Strange in the Multiverse of Madness",
        hook: "the multiverse, but make it a horror movie for twenty minutes.",
        blurb: "explains a lot of the multiverse rules the later movies assume you know.",
      },
      {
        title: "Loki (Season 1)",
        hook: "time cops. a variant with your face. it's a whole thing.",
        blurb: "quietly the most important show for understanding why the timeline is breaking.",
      },
      {
        title: "Loki (Season 2)",
        hook: "closes out the sacred timeline plot properly.",
        blurb: "the direct setup for how the multiverse ends up in the state it's in for Doomsday.",
      },
    ],
  },
  {
    id: "new-team",
    waypoint: "team",
    heading: "the new team assembling",
    intro: "who's actually in the room for Doomsday.",
    movies: [
      {
        title: "Fantastic Four: First Steps",
        hook: "new team, new universe, first real introduction.",
        blurb: "brings the Fantastic Four properly into the fold ahead of Doomsday.",
      },
      {
        title: "Thunderbolts*",
        hook: "the found-family of morally gray B-listers.",
        blurb: "a messier, funnier team that ends up mattering more than expected.",
      },
      {
        title: "Captain America: Brave New World",
        hook: "new Cap, same shield energy.",
        blurb: "sets up the current state of leadership going into the finale.",
      },
    ],
  },
  {
    id: "xmen",
    waypoint: "claw",
    heading: "x-men crossing over",
    intro: "how mutants enter the picture.",
    movies: [
      {
        title: "Deadpool & Wolverine",
        hook: "the one that's mostly jokes, and also somehow the multiverse's hinge point.",
        blurb: "the direct bridge that brings the X-Men universe into this one.",
      },
      {
        title: "X-Men: Days of Future Past",
        hook: "time travel to undo a bad future. very on-brand for this franchise.",
        blurb: "useful context for the version of the X-Men timeline getting referenced.",
      },
      {
        title: "the rest of the X-Men catalog",
        hook: "the deep cuts.",
        blurb: "genuinely optional — nice backstory, not required to follow Doomsday.",
        skippable: true,
      },
    ],
  },
  {
    id: "backstory",
    waypoint: "team",
    heading: "optional character backstory",
    intro: "nice to have, not required.",
    movies: [
      {
        title: "Black Panther: Wakanda Forever",
        hook: "Wakanda's story after Chadwick Boseman's passing.",
        blurb: "good character context, not strictly required for the main plot.",
        skippable: true,
      },
      {
        title: "Shang-Chi and the Legend of the Ten Rings",
        hook: "family drama with dragons.",
        blurb: "fun on its own, low priority for the Doomsday throughline.",
        skippable: true,
      },
      {
        title: "Ant-Man and the Wasp",
        hook: "the small one. literally.",
        blurb: "background flavor, easy to skip.",
        skippable: true,
      },
      {
        title: "Ant-Man and the Wasp: Quantumania",
        hook: "the Quantum Realm, properly explored.",
        blurb: "some quantum-realm lore, optional but adds color.",
        skippable: true,
      },
      {
        title: "The Falcon and the Winter Soldier",
        hook: "Sam Wilson picks up the shield.",
        blurb: "good context for the new Captain America, but skippable if short on time.",
        skippable: true,
      },
    ],
  },
  {
    id: "finale",
    waypoint: "burst",
    heading: "the finale",
    intro: "the whole reason for the list.",
    movies: [
      {
        title: "Avengers: Doomsday",
        hook: "everything above, collapsing into one movie.",
        blurb: "December 18, 2026. the point of the entire watchlist.",
      },
    ],
  },
];

// the tamagotchi — a tiny state machine, not a real pet, please don't worry
// about its wellbeing
export const tamagotchiCopy = {
  hungry: [
    "it's hungry. feed it before it starts making noises.",
    "staring at you. clearly wants food.",
  ],
  happy: [
    "look at this little guy go.",
    "content. for now. this never lasts.",
    "genuinely thriving, which is more than either of us can say most days.",
  ],
  sleepy: [
    "getting sleepy. maybe give it a minute.",
    "eyes half closed. still technically awake. probably.",
  ],
  content: [
    "officially the most spoiled tamagotchi on the internet.",
    "achieved maximum contentment. you may stop now. (please don't.)",
    "this is what peak performance looks like, apparently.",
  ],
  hungryPetResponse:
    "it would prefer food to affection right now, but it'll allow the pet.",
  alreadyFull:
    "it's already fed. it appreciates the thought regardless.",
};
