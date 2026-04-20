import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function ThemeIconButton() {
  const { mode, currentTheme, toggleTheme, isDayThinking } = useTheme();
  const nextLabel = isDayThinking ? "Night Reading" : "Day Thinking";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel}`}
      title={currentTheme.label}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
      style={{
        background: isDayThinking ? "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))" : "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))",
        borderColor: currentTheme.colors.border,
        color: currentTheme.colors.textPrimary,
        boxShadow: isDayThinking
          ? `0 12px 28px -16px ${currentTheme.colors.shadowColor}`
          : `0 14px 36px -18px ${currentTheme.colors.shadowColor}, 0 0 30px -14px ${currentTheme.colors.heroGlow}`,
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: isDayThinking
            ? "linear-gradient(180deg, rgba(255,255,255,0.5), transparent)"
            : "linear-gradient(180deg, rgba(255,255,255,0.14), transparent)",
          opacity: 0.7,
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ opacity: 0, rotate: -currentTheme.motion.iconRotate, scale: 0.88 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: currentTheme.motion.iconRotate, scale: 0.88 }}
          transition={{ duration: currentTheme.motion.medium, ease: currentTheme.motion.ease }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDayThinking ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.7} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.7} />}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{currentTheme.label}</span>
    </motion.button>
  );
}