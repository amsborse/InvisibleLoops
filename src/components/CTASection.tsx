import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export function CTASection() {
  const { currentTheme } = useTheme();

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 lg:px-10 lg:pb-28" aria-labelledby="cta-heading">
      <motion.div
        whileHover={{ y: currentTheme.motion.hoverLift * 0.35 }}
        transition={{ duration: currentTheme.motion.medium, ease: currentTheme.motion.ease }}
        className="relative overflow-hidden rounded-[2.2rem] border px-7 py-10 sm:px-10 sm:py-12"
        style={{
          borderColor: currentTheme.colors.border,
          background: `linear-gradient(140deg, ${currentTheme.colors.surfaceStrong}, ${currentTheme.colors.surface})`,
          boxShadow: `0 32px 90px -50px ${currentTheme.colors.shadowColor}`,
        }}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl" style={{ background: currentTheme.colors.heroGlow }} />

        <p className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: currentTheme.colors.textSecondary }}>
          Next step
        </p>
        <h2 id="cta-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl" style={{ color: currentTheme.colors.textPrimary }}>
          Design your first immersive article loop.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: currentTheme.colors.textSecondary }}>
          Turn concept-heavy writing into a reading sequence with cinematic timing, visual scaffolding, and emotional pacing.
        </p>

        <motion.button
          type="button"
          whileHover={{ y: currentTheme.motion.hoverLift * 0.4, scale: 1.01 }}
          transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold text-white"
          style={{
            borderColor: currentTheme.colors.border,
            background: `linear-gradient(180deg, ${currentTheme.colors.accentA}, ${currentTheme.colors.accentB})`,
            boxShadow: `0 16px 38px -22px ${currentTheme.colors.shadowColor}`,
          }}
        >
          Start with a sample article
          <ArrowRight className="h-4 w-4" aria-hidden />
        </motion.button>
      </motion.div>
    </section>
  );
}