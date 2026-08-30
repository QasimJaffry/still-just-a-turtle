import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "corner:discovered";

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

export function useDiscovery(totalCount: number) {
  const [discovered, setDiscovered] = useState<Set<string>>(
    () => new Set(readStored())
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(discovered))
      );
    } catch {
      // localStorage unavailable (private browsing etc.) — fail silently,
      // the site still works fine without persistence
    }
  }, [discovered]);

  const markFound = useCallback((id: string) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  return {
    foundCount: discovered.size,
    totalCount,
    hasFound: (id: string) => discovered.has(id),
    markFound,
    allFound: discovered.size >= totalCount,
  };
}
