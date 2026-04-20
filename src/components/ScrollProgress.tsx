import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export function ScrollProgress() {
  const { currentTheme, isDayThinking } = useTheme();
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-[2px]"
      style={{ background: isDayThinking ? "rgba(15,23,42,0.06)" : "rgba(255,255,255,0.05)" }}
      aria-hidden
    >
      <motion.div
        className="h-full"
        style={{
          width,
          background: `linear-gradient(90deg, ${currentTheme.colors.accentA}, ${currentTheme.colors.accentB}, ${currentTheme.colors.accentC})`,
          opacity: isDayThinking ? 0.72 : 0.86,
        }}
      />
    </div>
  );
}