import { useEffect, useState } from "react";

// tracks consecutive-day visits, purely for a little "day 3 in a row"
// footer note. localStorage-backed like everything else, per device,
// computed live from real dates -- never hardcoded, resets naturally if
// a day gets skipped instead of ever going stale.
const STORAGE_KEY = "corner:visit-log";

interface VisitLog {
  lastVisit: string; // YYYY-MM-DD
  streak: number;
}

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad);
  return Math.round(diff / msPerDay);
}

function readStored(): VisitLog | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.lastVisit === "string" && typeof parsed.streak === "number") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function computeNextLog(prev: VisitLog | null): VisitLog {
  const today = todayKey();
  if (!prev) return { lastVisit: today, streak: 1 };
  const gap = daysBetween(prev.lastVisit, today);
  if (gap === 0) return prev; // already logged today, no change
  if (gap === 1) return { lastVisit: today, streak: prev.streak + 1 };
  return { lastVisit: today, streak: 1 }; // skipped a day (or time-traveled) -- restart
}

export function useVisitStreak() {
  // computed once, synchronously, on first render -- no need for an
  // effect just to derive today's streak from what's already stored
  const [log] = useState<VisitLog>(() => computeNextLog(readStored()));

  // writing to localStorage is the actual side effect; only runs once,
  // and only if today's visit actually changed anything
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    } catch {
      // localStorage unavailable — fail silently, streak just won't persist
    }
  }, [log]);

  const streak = log.streak;

  return streak;
}
