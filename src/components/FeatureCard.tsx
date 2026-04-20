import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

type FeatureCardProps = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export function FeatureCard({ title, text, icon: Icon }: FeatureCardProps) {
  const { currentTheme, isNightReading } = useTheme();

  return (
    <motion.div
      whileHover={{ y: currentTheme.motion.hoverLift, scale: 1.01 }}
      transition={{ duration: currentTheme.motion.medium, ease: currentTheme.motion.ease }}
      className="group relative overflow-hidden rounded-[1.6rem] border p-6 sm:p-7"
      style={{
        background: `linear-gradient(180deg, ${currentTheme.colors.surfaceStrong}, ${currentTheme.colors.surface})`,
        borderColor: currentTheme.colors.border,
        boxShadow: isNightReading
          ? `0 28px 90px -44px ${currentTheme.colors.shadowColor}, 0 0 34px -18px ${currentTheme.colors.heroGlow}`
          : `0 22px 70px -40px ${currentTheme.colors.shadowColor}`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-1/3 top-0 h-full w-2/3 rotate-12 bg-gradient-to-r from-transparent via-[color:color-mix(in_oklab,var(--theme-accent-a)_20%,transparent)] to-transparent blur-xl" />
      </div>

      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.1, rotate: currentTheme.motion.iconRotate / 20 }}
          transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border"
          style={{
            borderColor: currentTheme.colors.border,
            background: currentTheme.colors.surface,
            boxShadow: `0 12px 26px -16px ${currentTheme.colors.shadowColor}, 0 0 18px -12px color-mix(in oklab, ${currentTheme.colors.accentC} 42%, transparent)`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: currentTheme.colors.textPrimary }} aria-hidden />
        </motion.div>

        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em]" style={{ color: currentTheme.colors.textPrimary }}>
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7" style={{ color: currentTheme.colors.textSecondary }}>
          {text}
        </p>
      </div>
    </motion.div>
  );
}