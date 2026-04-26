import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { HomeHeroFluidNav } from "../components/landing/HomeHeroFluidNav";
import { HeroInfinityVisual } from "../components/landing/HeroInfinityVisual";
import { PREMIUM_ARTICLE_HREF } from "../data/premiumArticle";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  return (
    <section
      id="home-hero"
      aria-labelledby="home-hero-heading"
      className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14"
    >
      <div>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] backdrop-blur"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-secondary)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden style={{ color: "var(--accent)" }} />
          The article platform for this century
        </motion.div>

        <motion.h1
          id="home-hero-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.04 }}
          className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, var(--text-primary), var(--text-secondary))",
            }}
          >
            No one is coming to save you.
          </span>{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            Build a reading experience that makes ideas unforgettable.
          </span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-6 max-w-xl text-pretty text-base leading-8 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Ideas you do not just read — you see them unfold. A calm, cinematic reading system for concept-heavy
          writing: visual revelation, emotional timing, high-clarity motion.
        </motion.p>

        <HomeHeroFluidNav />

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to={PREMIUM_ARTICLE_HREF}
            className="group inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border-strong)",
              background: "linear-gradient(180deg, var(--accent), var(--accent-strong))",
              color: "var(--on-accent)",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            Read first article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/articles"
            className="rounded-full border px-6 py-3.5 text-sm font-medium transition-colors"
            style={{
              borderColor: "var(--border)",
              background: "var(--panel-hover)",
              color: "var(--text-secondary)",
            }}
          >
            Explore reading system
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
      >
        <HeroInfinityVisual />
      </motion.div>
    </section>
  );
}
