import { useCallback, useEffect, useState } from "react";

// localStorage-backed "which letters has she opened" tracking -- same
// pattern as useDiscovery.ts (a Set of ids, JSON-stringified under a
// corner:-prefixed key, every read/write wrapped in try/catch since
// private browsing can throw). Persists across gate lock/unlock. Per
// device only, never sent anywhere.
const STORAGE_KEY = "corner:notes-read";

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

export function useReadNotes() {
  const [read, setRead] = useState<Set<string>>(() => new Set(readStored()));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(read)));
    } catch {
      // localStorage unavailable (private browsing etc.) — fail silently
    }
  }, [read]);

  const isRead = useCallback((noteId: string) => read.has(noteId), [read]);

  const markRead = useCallback((noteId: string) => {
    setRead((prev) => {
      if (prev.has(noteId)) return prev;
      const next = new Set(prev);
      next.add(noteId);
      return next;
    });
  }, []);

  return { isRead, markRead, readCount: read.size };
}
