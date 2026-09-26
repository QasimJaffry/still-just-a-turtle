import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { applyUpdate } from "../lib/registerSW";

// a small "something new, tap to refresh" pill -- shown when a new service
// worker version has installed while the page is open. this stands in for
// a real push notification, which would need server infrastructure this
// site deliberately doesn't have.
export default function UpdateBadge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onUpdate = () => setVisible(true);
    window.addEventListener("corner:update-available", onUpdate);
    return () => window.removeEventListener("corner:update-available", onUpdate);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={applyUpdate}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-[var(--color-lav-deep)] px-4 py-2 text-xs font-medium text-white shadow-[0_10px_30px_rgba(61,51,87,0.3)]"
        >
          something new — tap to refresh
        </motion.button>
      )}
    </AnimatePresence>
  );
}
