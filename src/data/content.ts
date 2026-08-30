// -----------------------------------------------------------------------
// ALL THE WORDS LIVE HERE.
// If you want to add a joke, tweak a line, or add a whole new message pool,
// this is the only file you need to touch for text changes.
// -----------------------------------------------------------------------

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

// the one genuine message. short. no big declarations.
export const noteMessage = [
  "okay, real talk for one second, then back to the stupid stuff.",
  "I know it's been a lot lately. you don't have to reply to this, or think about it, or do anything with it at all.",
  "I just wanted to make you a dumb little corner of the internet out of all the random things that remind me of you.",
  "that's it. that's the whole thing. go click on the donut again.",
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

// the running joke where he keeps asking for her address so he can send
// her things, and she never tells him. escalates each click, same
// mechanic as the chup button. the joke is aimed at him losing, not at
// her for not answering.
export const addressStages: string[] = [
  "requested address. response: none. as expected.",
  "tried again. still nothing. persistence levels: concerning.",
  "drafted a package with genuinely nowhere to send it.",
  "at this point I've mostly accepted defeat.",
  "started to suspect the address doesn't exist. it's fine. this is fine.",
  "okay, real talk: if you ever do want to tell me, I'm around. no pressure — this website definitely won't remember either way.",
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
