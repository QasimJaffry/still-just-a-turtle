import { Reorder, motion, useDragControls } from "framer-motion";
import type { ReactNode } from "react";
import { useTilt } from "../hooks/useTilt";

interface StickerZoneProps {
  heading: string;
  sub: string;
  ids: string[];
  onReorder: (ids: string[]) => void;
  renderItem: (id: string) => ReactNode;
  /** bumps to replay the entrance stagger after a shuffle */
  entranceKey: number;
  /** delays the whole section's entrance so zones cascade in top to bottom */
  sectionDelay: number;
}

// each zone is its own drag-to-reorder list (Framer Motion's Reorder
// primitives, built for exactly this: free reordering inside a wrapping
// flex layout, without fighting flexbox for absolute positions) plus a
// shared subtle parallax tilt and a staggered "settling into place"
// entrance. The tilt and reorder-drag both live on this outer wrapper,
// never on Sticker.tsx itself, so they can't conflict with the sticker's
// own float/rotate/tap animations.
export default function StickerZone({
  heading,
  sub,
  ids,
  onReorder,
  renderItem,
  entranceKey,
  sectionDelay,
}: StickerZoneProps) {
  const tiltX = useTilt(6);

  return (
    <section className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: sectionDelay }}
        className="flex flex-col items-center gap-0.5 text-center"
      >
        <p className="font-display text-sm font-semibold text-[var(--color-lav-deep)]">
          {heading}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]/70">
          {sub}
        </p>
      </motion.div>

      <Reorder.Group
        as="div"
        axis="x"
        values={ids}
        onReorder={onReorder}
        className="flex flex-wrap justify-center gap-4 sm:gap-6"
        style={{ x: tiltX }}
      >
        {ids.map((id, i) => (
          <DraggableSlot
            key={`${id}-${entranceKey}`}
            id={id}
            index={i}
            sectionDelay={sectionDelay}
          >
            {renderItem(id)}
          </DraggableSlot>
        ))}
      </Reorder.Group>
    </section>
  );
}

interface DraggableSlotProps {
  id: string;
  index: number;
  sectionDelay: number;
  children: ReactNode;
}

// dragListener={false} + an explicit small grip handle means an ordinary
// tap on the sticker itself is never at risk of being swallowed as a drag
// gesture -- dragging only starts from the grip, which stays faintly
// visible at all times (see the button below) so it's discoverable on
// touch too, not just on hover.
function DraggableSlot({ id, index, sectionDelay, children }: DraggableSlotProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={id}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, y: 18, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 340,
        damping: 22,
        delay: sectionDelay + index * 0.06,
      }}
      whileDrag={{ scale: 1.08, zIndex: 20, cursor: "grabbing" }}
      className="relative touch-none"
    >
      {children}
      {/* always faintly visible (not hover-only) so it's discoverable on
          touch devices, which have no hover state -- brightens on
          hover/focus for pointer users as a bonus, not a requirement */}
      <button
        type="button"
        aria-label="drag to rearrange"
        onPointerDown={(e) => controls.start(e)}
        className="absolute -top-2 left-1/2 flex h-6 w-8 -translate-x-1/2 cursor-grab touch-none items-center justify-center rounded-full bg-[var(--color-lav-deep)] text-[var(--color-bg)] opacity-40 shadow-sm transition-opacity duration-150 hover:opacity-90 focus-visible:opacity-100 active:opacity-100"
      >
        <span aria-hidden="true" className="text-[10px] tracking-[2px]">
          ⠿
        </span>
      </button>
    </Reorder.Item>
  );
}
