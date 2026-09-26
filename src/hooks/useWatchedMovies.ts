import { useCallback, useEffect, useState } from "react";

// localStorage-backed "which movies has she checked off the watchlist"
// tracking -- same pattern as useDiscovery.ts (a Set of ids, JSON-stringified
// under a corner:-prefixed key, every read/write wrapped in try/catch since
// private browsing can throw). Persists across gate lock/unlock since it's
// localStorage, not sessionStorage -- logging out and back in keeps it.
// Per-device only, never sent anywhere: no backend, no network calls, same
// as everything else this site persists.
const STORAGE_KEY = "corner:movies-watched";

function readStored(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useWatchedMovies() {
  const [watched, setWatched] = useState<Set<string>>(() => new Set(readStored()));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(watched)));
    } catch {
      // localStorage unavailable (private browsing etc.) — fail silently,
      // the feature still works fine for this session without persistence
    }
  }, [watched]);

  const isWatched = useCallback((movieId: string) => watched.has(movieId), [watched]);

  const toggleWatched = useCallback((movieId: string) => {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(movieId)) next.delete(movieId);
      else next.add(movieId);
      return next;
    });
  }, []);

  return { isWatched, toggleWatched, watchedCount: watched.size };
}
