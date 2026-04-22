import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InfinityGraphic } from "@amsborse/cosmic-ui";
import { PREMIUM_ARTICLE_HREF } from "../data/premiumArticle";
import { useTheme } from "../hooks/useTheme";

export function Hero() {
  const { currentTheme, isNightReading } = useTheme();

  return (
    <section id="experience" className="mx-auto grid w-full max-w-[88rem] gap-10 px-5 pb-16 pt-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: currentTheme.motion.medium, ease: currentTheme.motion.ease }}
          className="inline-flex items-center rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em]"
          style={{
            borderColor: currentTheme.colors.border,
            background: currentTheme.colors.surface,
            color: currentTheme.colors.textSecondary,
          }}
        >
          The article platform for this century
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: currentTheme.motion.slow, ease: currentTheme.motion.ease }}
          className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]"
          style={{ color: currentTheme.colors.textPrimary }}
        >
          <Link
            to={PREMIUM_ARTICLE_HREF}
            className="underline-offset-8 transition-colors hover:underline"
            style={{ color: currentTheme.colors.accentA }}
            aria-label="Open article: No one is coming to save you"
          >
            No one is coming to save you.
          </Link>{" "}
          Build a reading experience that makes ideas unforgettable.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: currentTheme.motion.slow + 0.08, ease: currentTheme.motion.ease }}
          className="mt-6 max-w-2xl text-pretty text-base leading-8 sm:text-lg"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Ideas you do not just read—you see them unfold. A premium reading experience for concept-heavy writing, visual revelation, emotional timing, and calm high-clarity motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: currentTheme.motion.slow + 0.12, ease: currentTheme.motion.ease }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            to={PREMIUM_ARTICLE_HREF}
            className="group inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold"
            style={{
              borderColor: currentTheme.colors.border,
              background: `linear-gradient(180deg, ${currentTheme.colors.accentA}, ${currentTheme.colors.accentB})`,
              color: "#ffffff",
              boxShadow: `0 16px 40px -22px ${currentTheme.colors.shadowColor}`,
            }}
          >
            Read first article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            to="/articles"
            className="rounded-full border px-6 py-3.5 text-sm font-medium"
            style={{
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.textPrimary,
              background: currentTheme.colors.surfaceStrong,
            }}
          >
            Explore reading system
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: currentTheme.motion.slow + 0.2, ease: currentTheme.motion.ease }}
        className="relative"
      >
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2.5rem] blur-2xl"
          style={{
            background: `linear-gradient(180deg, ${currentTheme.colors.heroGlow}, transparent)`,
          }}
        />
        <div className="relative overflow-hidden rounded-[2.2rem] border" style={{ borderColor: currentTheme.colors.border }}>
          <InfinityGraphic mode={isNightReading ? "dark" : "light"} />
        </div>
      </motion.div>
    </section>
  );
}