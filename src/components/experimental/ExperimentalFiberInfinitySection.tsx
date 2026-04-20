import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { FiberInfinityCanvas } from "./FiberInfinityCanvas";

export function ExperimentalFiberInfinitySection() {
  const { currentTheme } = useTheme();

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-24" aria-labelledby="fiber-infinity-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: currentTheme.motion.slow, ease: currentTheme.motion.ease }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: currentTheme.colors.textSecondary }}>
          Experimental
        </p>
        <h2
          id="fiber-infinity-heading"
          className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl lg:text-[2.8rem]"
          style={{ color: currentTheme.colors.textPrimary }}
        >
          Fiber Infinity Field
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: currentTheme.colors.textSecondary }}>
          A bundle of flowing strands forming a living infinity loop.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: currentTheme.motion.slow + 0.08, ease: currentTheme.motion.ease }}
        className="mt-8 sm:mt-10"
      >
        <FiberInfinityCanvas />
      </motion.div>

      <p className="mt-4 text-center text-xs tracking-[0.12em]" style={{ color: currentTheme.colors.textSecondary }}>
        Experimental showcase - real-time fiber field rendering.
      </p>
    </section>
  );
}