import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Sticker from "../Sticker";
import Modal from "../Modal";
import { PixelReaction, type PixelCharacter } from "./MoviePixels";
import { Ticket, Shield, Spiral, Team, Claw, Filmstrip, Burst } from "../icons";
import { moviesCopy, movieSections, movieReactionLines, movieFinaleReactionLine } from "../../data/content";
import type { MovieSection, MovieEntry } from "../../data/content";
import type { Accent } from "../../data/objects";
import { useWatchedMovies } from "../../hooks/useWatchedMovies";

// a stable id per movie card, independent of array position -- used as the
// localStorage key for the watched-toggle, same shape as the key already
// used for React's own list rendering below.
function movieId(sectionId: string, title: string): string {
  return `${sectionId}-${title}`;
}

const waypointIcon: Record<MovieSection["waypoint"], typeof Shield> = {
  shield: Shield,
  spiral: Spiral,
  team: Team,
  claw: Claw,
  filmstrip: Filmstrip,
  burst: Burst,
};

// which pixel sprite reacts for each section -- loosely matched to that
// section's theme.
const sectionCharacter: Record<string, PixelCharacter> = {
  spiderman: "spidery",
  "avengers-core": "armored",
  multiverse: "trickster",
  "new-team": "armored",
  xmen: "clawed",
  backstory: "trickster",
  finale: "spidery",
};

// -----------------------------------------------------------------------
// Redesigned as a one-card-at-a-time flip deck instead of a scrolling
// list inside a chrome-heavy shell. A scrolling list needs its container
// to budget height for header + stepper + N cards + footer all at once,
// which breaks on short viewports no matter how the max-height is tuned.
// Flattening every section into a single sequence of small flip-cards
// (one divider card per section, one card per movie) means only ONE card
// is ever on screen at a time -- the content height is now bounded by a
// single card's height, not by how many movies happen to be in a
// section, so it can never overflow regardless of viewport size.
// -----------------------------------------------------------------------

type FlipCard =
  | { kind: "section"; section: MovieSection }
  | { kind: "movie"; section: MovieSection; movie: MovieEntry };

function buildDeck(): FlipCard[] {
  const deck: FlipCard[] = [];
  for (const section of movieSections) {
    deck.push({ kind: "section", section });
    for (const movie of section.movies) {
      deck.push({ kind: "movie", section, movie });
    }
  }
  return deck;
}

interface Props {
  id: string;
  label: string;
  rotate: number;
  accent: Accent;
  found: boolean;
  onOpen: (id: string) => void;
}

function useCountdown(target: Date) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const update = () => {
      const msPerDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.ceil((target.getTime() - Date.now()) / msPerDay);
      if (diffDays > 1) setLabel(`${diffDays} days out`);
      else if (diffDays === 1) setLabel("1 day out");
      else if (diffDays === 0) setLabel("it's today");
      else setLabel("already out — go watch it");
    };
    update();
    const t = setInterval(update, 1000 * 60 * 30);
    return () => clearInterval(t);
  }, [target]);

  return label;
}

function pick(pool: string[]): string {
  return pool[Math.floor(Math.random() * pool.length)];
}

const SWIPE_THRESHOLD = 60;

export default function MoviesFeature({ id, label, rotate, accent, found, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  // null until the first section-crossing nav -- the reaction only ever
  // pops in as a response to a real action, never pre-shown on open.
  const [reactionKey, setReactionKey] = useState<number | null>(null);
  const [reactionLine, setReactionLine] = useState(() => pick(movieReactionLines));
  const dragX = useMotionValue(0);
  const { isWatched, toggleWatched, watchedCount } = useWatchedMovies();

  const deck = useMemo(() => buildDeck(), []);
  const totalMovies = useMemo(
    () => movieSections.reduce((sum, s) => sum + s.movies.length, 0),
    []
  );
  const permanentlyWatchedCount = useMemo(
    () =>
      movieSections.reduce(
        (sum, s) => sum + s.movies.filter((m) => m.watched).length,
        0
      ),
    []
  );
  // permanently-watched movies (her Spider-Man run) are never stored in
  // the toggle set, so these two counts never double up
  const combinedWatchedCount = permanentlyWatchedCount + watchedCount;

  const card = deck[cardIndex];
  const section = card.section;
  const isFinale = section.id === "finale";
  const WaypointIcon = waypointIcon[section.waypoint];
  const character = sectionCharacter[section.id] ?? "spidery";
  const countdown = useCountdown(moviesCopy.targetDate);

  const movieNumberInSection =
    card.kind === "movie" ? section.movies.indexOf(card.movie) + 1 : 0;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(deck.length - 1, next));
    if (clamped === cardIndex) return;
    const crossedSection = deck[clamped].section.id !== deck[cardIndex].section.id;
    setCardIndex(clamped);
    if (crossedSection) {
      setReactionKey((k) => (k === null ? 0 : k + 1));
      const isNextFinale = deck[clamped].section.id === "finale";
      setReactionLine(isNextFinale ? movieFinaleReactionLine : pick(movieReactionLines));
    }
  };

  return (
    <>
      <Sticker
        icon={Ticket}
        label={label}
        rotate={rotate}
        accent={accent}
        found={found}
        onClick={() => {
          onOpen(id);
          setOpen(true);
          setCardIndex(0);
          setReactionKey(null);
        }}
      />
      <Modal open={open} onClose={() => setOpen(false)} labelledBy="movies-title">
        {/* fixed-height shell (no scrolling needed) -- only ever one card
            of content on screen at a time, so nothing can overflow a
            short viewport no matter how many movies are in a section. */}
        <div className="flex flex-col text-center">
          <h2 id="movies-title" className="sr-only">
            {moviesCopy.label}
          </h2>

          {/* compact top bar: waypoint stamp, section name, progress --
              replaces the old icon + title + 3-line intro + 7-icon
              stepper block, which alone was eating most of the modal's
              vertical budget before any content could render. */}
          <div className="mb-3 flex items-center gap-2.5">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isFinale ? "bg-[var(--color-accent)]/25" : "bg-[var(--color-panel)]"
              }`}
            >
              <WaypointIcon
                className={`h-5 w-5 ${
                  isFinale ? "text-[var(--color-accent)]" : "text-[var(--color-lav-deep)]"
                }`}
              />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-display text-sm font-semibold text-[var(--color-ink)]">
                {section.heading}
              </p>
              <p className="font-mono text-[10px] text-[var(--color-ink-soft)]">
                card {cardIndex + 1}/{deck.length}
                {card.kind === "movie" ? ` · ${movieNumberInSection}/${section.movies.length} this stretch` : ""}
              </p>
            </div>
          </div>

          {/* thin progress rail across the whole deck */}
          <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-[var(--color-panel)]">
            <motion.div
              className="h-full rounded-full bg-[var(--color-lav-deep)]"
              animate={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {/* the single card on screen -- swipeable left/right, or use
              the prev/next buttons below */}
          <div className="relative min-h-[190px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cardIndex}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                style={{ x: dragX }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) goTo(cardIndex + 1);
                  else if (info.offset.x > SWIPE_THRESHOLD) goTo(cardIndex - 1);
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.18 }}
                className="relative w-full cursor-grab touch-pan-y overflow-hidden rounded-[18px] border-2 border-dashed border-[var(--color-lav-deep)]/25 bg-[var(--color-card)] px-5 py-6 text-left active:cursor-grabbing"
              >
                {/* ticket notch */}
                <span
                  aria-hidden="true"
                  className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--color-bg)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--color-bg)]"
                />

                {card.kind === "section" ? (
                  <div className="flex flex-col items-center gap-2 py-4 text-center">
                    <WaypointIcon
                      className={`h-9 w-9 ${
                        isFinale ? "text-[var(--color-accent)]" : "text-[var(--color-lav-deep)]"
                      }`}
                    />
                    <p className="font-display text-base font-semibold text-[var(--color-ink)]">
                      {card.section.heading}
                    </p>
                    <p className="text-xs leading-relaxed text-[var(--color-ink-soft)]">
                      {card.section.intro}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]/70">
                      {card.section.movies.length} title{card.section.movies.length === 1 ? "" : "s"} up next →
                    </p>
                  </div>
                ) : (
                  (() => {
                    const mid = movieId(card.section.id, card.movie.title);
                    // she already watched her Spider-Man run before this
                    // page existed -- that stays permanently marked and
                    // isn't a togglable checklist item. everything else is
                    // hers to check off, saved on this device.
                    const permanentlyWatched = card.movie.watched;
                    const checkedOff = permanentlyWatched || isWatched(mid);
                    return (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[15px] font-semibold leading-snug text-[var(--color-ink)]">
                            {card.movie.title}
                          </p>
                          {card.movie.skippable && (
                            <span className="shrink-0 rounded-full bg-[var(--color-ink-soft)]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                              optional
                            </span>
                          )}
                        </div>
                        <p className="text-xs italic text-[var(--color-ink-soft)]">{card.movie.hook}</p>
                        <p className="text-[13px] leading-relaxed text-[var(--color-ink)]">
                          {card.movie.blurb}
                        </p>
                        {isFinale && (
                          <motion.p
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-1 font-mono text-xs uppercase tracking-wide text-[var(--color-accent)]"
                          >
                            {countdown}
                          </motion.p>
                        )}

                        {/* tap to check it off -- saved on this device, so
                            it's still checked next time she opens the site
                            (logging out and back in doesn't lose it) */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!permanentlyWatched) toggleWatched(mid);
                          }}
                          onPointerDown={(e) => e.stopPropagation()}
                          disabled={permanentlyWatched}
                          aria-pressed={checkedOff}
                          className={`mt-1 flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide transition ${
                            checkedOff
                              ? "bg-[var(--color-lav-deep)] text-white"
                              : "bg-[var(--color-panel)] text-[var(--color-lav-deep)] hover:bg-[var(--color-lav)]"
                          } ${permanentlyWatched ? "cursor-default opacity-80" : ""}`}
                        >
                          <span aria-hidden="true">{checkedOff ? "✓" : "○"}</span>
                          {permanentlyWatched ? "watched" : checkedOff ? "watched" : "mark watched"}
                        </button>
                      </div>
                    );
                  })()
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* pixel-sprite reaction, pops in for a beat when crossing into
              a new section -- absent entirely until the first real nav,
              never pre-shown on a fresh open */}
          <div className="flex min-h-[40px] items-center justify-center pt-3">
            {reactionKey !== null && (
              <PixelReaction character={character} reactionKey={reactionKey} line={reactionLine} />
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => goTo(cardIndex - 1)}
              disabled={cardIndex === 0}
              className="rounded-full bg-[var(--color-panel)] px-3 py-1.5 text-xs font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)] disabled:opacity-30"
            >
              ← back
            </button>
            <span className="font-mono text-[10px] text-[var(--color-ink-soft)]">
              {combinedWatchedCount}/{totalMovies} watched
            </span>
            <button
              type="button"
              onClick={() => goTo(cardIndex + 1)}
              disabled={cardIndex === deck.length - 1}
              className="rounded-full bg-[var(--color-panel)] px-3 py-1.5 text-xs font-medium text-[var(--color-lav-deep)] transition hover:bg-[var(--color-lav)] disabled:opacity-30"
            >
              next →
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
