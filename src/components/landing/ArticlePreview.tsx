import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { ArticleScene } from "../../data/articleScenes";
import { PREMIUM_ARTICLE_HREF } from "../../data/premiumArticle";

type ArticlePreviewProps = {
  scene: ArticleScene;
};

/** Editorial ease — calm deceleration, not a default ease-out */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.32, 0, 0.2, 1] as const;

const SPRING_CONTENT = {
  type: "spring" as const,
  stiffness: 240,
  damping: 38,
  mass: 0.88,
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.048,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    filter: "blur(3px)",
    transition: {
      duration: 0.26,
      ease: EASE_IN,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 9,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_CONTENT,
  },
};

export function ArticlePreview({ scene }: ArticlePreviewProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: EASE_OUT }}
      aria-labelledby={`scene-preview-${scene.id}`}
      className="relative rounded-[2rem] border p-6 backdrop-blur-xl sm:p-8"
      style={{
        borderColor: "var(--border)",
        background: "var(--panel-preview-gradient)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-secondary)",
          }}
        >
          <BookOpen className="h-3.5 w-3.5" aria-hidden />
          Article preview
        </div>
        <span
          className="text-[10px] font-medium uppercase tracking-[0.26em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Live concept
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={scene.id}
          id={`scene-preview-${scene.id}`}
          variants={contentVariants}
          initial={false}
          animate="visible"
          exit="exit"
          className="relative z-10 mt-8"
        >
          <motion.p
            variants={lineVariants}
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{
              color: "var(--accent)",
              opacity: 0.9,
            }}
          >
            {scene.eyebrow}
          </motion.p>
          <motion.h3
            variants={lineVariants}
            className="mt-3 max-w-xl text-balance font-display text-2xl font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[1.9rem] sm:leading-[1.08]"
            style={{ color: "var(--text-primary)" }}
          >
            {scene.title}
          </motion.h3>
          <motion.p
            variants={lineVariants}
            className="mt-5 max-w-xl text-pretty text-[15px] leading-8 sm:text-base sm:leading-9"
            style={{ color: "var(--text-secondary)" }}
          >
            {scene.body}
          </motion.p>

          <motion.div
            variants={lineVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to={PREMIUM_ARTICLE_HREF}
              className="group inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                borderColor: "var(--border-strong)",
                background: "linear-gradient(180deg, var(--accent), var(--accent-strong))",
                color: "var(--on-accent)",
                boxShadow: "var(--shadow-cta)",
              }}
            >
              Continue reading
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              className="rounded-full border px-5 py-3 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "var(--panel-hover)",
                color: "var(--text-secondary)",
              }}
            >
              View article architecture
            </button>
          </motion.div>
        </motion.article>
      </AnimatePresence>
    </motion.section>
  );
}
