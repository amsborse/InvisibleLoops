import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { Grain } from "./Grain";

export function SiteBackground() {
  const { currentTheme, isDayThinking } = useTheme();

  const dayBackground = `radial-gradient(circle at 30% 20%, color-mix(in oklab, ${currentTheme.colors.accentA} 16%, transparent), transparent 28%), radial-gradient(circle at 80% 20%, color-mix(in oklab, ${currentTheme.colors.accentC} 12%, transparent), transparent 22%), linear-gradient(180deg, ${currentTheme.colors.bgPrimary} 0%, color-mix(in oklab, ${currentTheme.colors.bgPrimary} 84%, ${currentTheme.colors.accentB}) 100%)`;

  const nightBackground = `radial-gradient(circle at 30% 20%, color-mix(in oklab, ${currentTheme.colors.accentA} 32%, transparent), transparent 34%), radial-gradient(circle at 80% 20%, color-mix(in oklab, ${currentTheme.colors.accentC} 24%, transparent), transparent 24%), linear-gradient(180deg, ${currentTheme.colors.bgPrimary} 0%, ${currentTheme.colors.bgSecondary} 100%)`;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: isDayThinking ? dayBackground : nightBackground }}
        animate={{
          x: [0, currentTheme.motion.backgroundDrift, 0],
          y: [0, -currentTheme.motion.backgroundDrift * 0.5, 0],
          scale: [1, isDayThinking ? 1.003 : 1.012, 1],
        }}
        transition={{
          duration: isDayThinking ? 26 : 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: isDayThinking
            ? "radial-gradient(100% 80% at 50% 120%, rgba(15,23,42,0.05), transparent 68%)"
            : "radial-gradient(90% 70% at 50% 125%, rgba(0,0,0,0.46), transparent 68%)",
        }}
      />

      <div className="absolute inset-x-0 top-[38vh] mx-auto h-px max-w-6xl" style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.colors.border}, transparent)` }} />
      <Grain variant={isDayThinking ? "light" : "dark"} />
    </div>
  );
}