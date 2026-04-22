import { motion } from "framer-motion";
import { InfinityGraphic } from "@amsborse/cosmic-ui";

/**
 * The infinity visual is intentionally kept dark in both themes —
 * in light mode it becomes a luxurious "cinematic window" on the page,
 * ensuring the glow never disappears into a white background.
 */
export function HeroInfinityVisual() {
  return (
    <div className="relative">
      {/* Ambient glow behind the panel */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[3rem] blur-3xl"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, var(--accent-glow), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(34,211,238,0.18), transparent 72%)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[2.2rem] border"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background:
            "linear-gradient(180deg, rgba(9,11,22,0.95), rgba(4,6,14,0.95))",
          boxShadow:
            "0 50px 140px -72px rgba(10,14,30,0.9), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Top light line */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <InfinityGraphic mode="dark" />

        {/* Inner corner highlights */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/[0.04]" />
      </div>
    </div>
  );
}
