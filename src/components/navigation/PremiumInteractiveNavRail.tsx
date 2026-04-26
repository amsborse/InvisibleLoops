import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type PremiumInteractiveNavRailProps<T> = {
  items: readonly T[];
  activeIndex: number;
  itemHeight: number;
  itemCenterOffset: number;
  className?: string;
  railClassName?: string;
  renderItem: (args: {
    item: T;
    index: number;
    isActive: boolean;
    pull: number;
  }) => ReactNode;
};

/**
 * Shared premium interactive rail used by sidebar and article TOC.
 * Keeps pointer-reactive pull + active glow bar consistent across pages.
 */
export function PremiumInteractiveNavRail<T>({
  items,
  activeIndex,
  itemHeight,
  itemCenterOffset,
  className,
  railClassName = "left-0 h-16 w-full rounded-2xl",
  renderItem,
}: PremiumInteractiveNavRailProps<T>) {
  const [cursorY, setCursorY] = useState(0);
  const [isInside, setIsInside] = useState(false);

  const top = activeIndex * itemHeight;
  const cursorOffset = isInside ? Math.max(-18, Math.min(18, cursorY - (top + itemCenterOffset))) : 0;

  return (
    <div
      className={["relative", className].filter(Boolean).join(" ")}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setCursorY(event.clientY - rect.top);
      }}
    >
      <motion.div
        className={["pointer-events-none absolute z-0", railClassName].filter(Boolean).join(" ")}
        animate={{ y: top }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 rounded-[inherit]"
          animate={{ opacity: isInside ? 1 : 0.8 }}
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent), color-mix(in srgb, var(--accent) 7%, transparent), transparent 82%)",
          }}
        />
        <motion.div
          className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full"
          animate={{
            scaleY: isInside ? 1.12 : 1,
            boxShadow: isInside
              ? "0 0 16px color-mix(in srgb, var(--accent) 72%, transparent), 0 0 36px color-mix(in srgb, var(--glow-b) 34%, transparent)"
              : "0 0 10px color-mix(in srgb, var(--accent-glow) 64%, transparent)",
          }}
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, white 84%, var(--accent)) 0%, var(--accent) 52%, color-mix(in srgb, var(--glow-b) 88%, var(--accent)) 100%)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
        <motion.div
          className="absolute -left-[3px] h-4 w-[9px] rounded-full"
          animate={{ top: isInside ? 21 + cursorOffset * 0.5 : 24 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{
            background: "color-mix(in srgb, white 88%, var(--accent))",
            boxShadow:
              "0 0 14px color-mix(in srgb, white 90%, transparent), 0 0 30px color-mix(in srgb, var(--glow-b) 45%, transparent)",
          }}
        />
        <motion.div
          className="absolute bottom-1 left-3 right-2 top-1 rounded-[inherit]"
          animate={{ opacity: isInside ? 0.84 : 0.5 }}
          style={{
            background:
              "radial-gradient(circle at 8% 50%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 64%)",
          }}
        />
      </motion.div>

      {items.map((item, index) => {
        const itemCenter = index * itemHeight + itemCenterOffset;
        const distance = isInside ? Math.abs(cursorY - itemCenter) : 999;
        const pull = isInside ? Math.max(0, 1 - distance / 135) : 0;
        return renderItem({ item, index, isActive: index === activeIndex, pull });
      })}
    </div>
  );
}

