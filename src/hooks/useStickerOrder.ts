import { useCallback, useEffect, useState } from "react";

// localStorage-backed custom ordering, per zone, so she can actually
// rearrange the room and it stays that way next visit -- same pattern as
// every other piece of persisted state on this site (try/catch wrapped,
// corner:-prefixed key). Stores an array of ids per zone; any id not in
// the site's own data just gets ignored on read (handles content
// changing between visits without breaking).
const STORAGE_KEY = "corner:sticker-order";

type OrderMap = Record<string, string[]>; // zone -> ordered ids

function readStored(): OrderMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function useStickerOrder() {
  const [orderMap, setOrderMap] = useState<OrderMap>(() => readStored());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orderMap));
    } catch {
      // localStorage unavailable — fail silently, ordering just won't persist
    }
  }, [orderMap]);

  // applies any saved custom order to a zone's default id list, keeping
  // ids that aren't in the saved order at the end in their original spot
  // (handles new stickers being added later without losing her ordering)
  const applyOrder = useCallback(
    (zone: string, defaultIds: string[]): string[] => {
      const saved = orderMap[zone];
      if (!saved) return defaultIds;
      const savedValid = saved.filter((id) => defaultIds.includes(id));
      const missing = defaultIds.filter((id) => !savedValid.includes(id));
      return [...savedValid, ...missing];
    },
    [orderMap]
  );

  const setZoneOrder = useCallback((zone: string, ids: string[]) => {
    setOrderMap((prev) => ({ ...prev, [zone]: ids }));
  }, []);

  const resetOrder = useCallback(() => {
    setOrderMap({});
  }, []);

  return { applyOrder, setZoneOrder, resetOrder };
}
