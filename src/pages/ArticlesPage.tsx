import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArticlePreview } from "../components/landing/ArticlePreview";
import { SceneChipsRow } from "../components/landing/SceneChipsRow";
import { SceneSelector } from "../components/landing/SceneSelector";
import { articleScenes } from "../data/articleScenes";
import { premiumArticle, PREMIUM_ARTICLE_HREF } from "../data/premiumArticle";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ArticlesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScene = articleScenes[activeIndex] ?? articleScenes[0];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-10 lg:gap-14"
    >
      <header aria-labelledby="articles-heading">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] backdrop-blur"
            style={{
              borderColor: "var(--border)",
              background: "var(--panel-hover)",
              color: "var(--text-secondary)",
            }}
          >
            <BookOpen
              className="h-3.5 w-3.5"
              aria-hidden
              style={{ color: "var(--accent)" }}
            />
            Article experience
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors"
            style={{
              borderColor: "var(--border)",
              background: "var(--panel-hover)",
              color: "var(--text-tertiary)",
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to home
          </Link>
        </motion.div>

        <motion.h1
          id="articles-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          className="mt-6 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.2rem]"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--text-primary), var(--text-secondary))",
            }}
          >
            Enter the reading system.
          </span>{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            Select a scene, feel how it lands.
          </span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-5 max-w-2xl text-pretty text-base leading-8 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Articles here aren't walls of text — they're guided sequences. Pick a beat on the left; the right side composes that moment as it would appear in the full reading experience.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
          className="mt-10 rounded-[1.75rem] border p-5 sm:p-6"
          style={{
            borderColor: "var(--border-strong)",
            background: "var(--panel-strong-gradient)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Published essay
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2
                className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                {premiumArticle.title}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-7 sm:text-[15px]" style={{ color: "var(--text-secondary)" }}>
                {premiumArticle.subtitle}
              </p>
            </div>
            <Link
              to={PREMIUM_ARTICLE_HREF}
              className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 sm:self-center"
              style={{
                borderColor: "var(--border-strong)",
                background: "linear-gradient(180deg, var(--accent), var(--accent-strong))",
                color: "var(--on-accent)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Open full article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Scene strip — mirrors left panel; high-contrast active for instant scan */}
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.14 }}
          className="mt-10 max-w-4xl border-t pt-8 sm:mt-12 sm:pt-9"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Choose a scene
            </p>
            <p
              className="text-xs font-medium tabular-nums sm:text-[13px]"
              style={{ color: "var(--text-secondary)" }}
            >
              <span style={{ color: "var(--text-muted)" }}>Now previewing · </span>
              <span style={{ color: "var(--text-primary)" }}>{activeScene.eyebrow}</span>
            </p>
          </div>
          <SceneChipsRow
            variant="hero"
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            ariaLabel="Article scenes below hero"
            layoutGroupId="articles-hero"
          />
        </motion.div>
      </header>

      <motion.section
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        aria-label="Prototype preview"
        className="grid gap-6 lg:grid-cols-2 lg:gap-8"
      >
        <SceneSelector activeIndex={activeIndex} onSelect={setActiveIndex} />
        <ArticlePreview scene={activeScene} />
      </motion.section>

      <motion.section
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative overflow-hidden rounded-[2rem] border p-7 backdrop-blur-xl sm:p-10"
        style={{
          borderColor: "var(--border)",
          background: "var(--panel-strong-gradient)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Full article
            </p>
            <h2
              className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl"
              style={{ color: "var(--text-primary)" }}
            >
              Open the complete reading experience.
            </h2>
            <p
              className="mt-3 text-[15px] leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              The scene you selected is a single beat inside a longer, composed piece. Step into the full article to feel the pacing across all scenes.
            </p>
          </div>

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
            Open full article
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
