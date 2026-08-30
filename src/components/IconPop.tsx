import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function IconPop({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.05 }}
    >
      {children}
    </motion.div>
  );
}
