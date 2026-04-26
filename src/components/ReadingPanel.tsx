import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
import { PREMIUM_ARTICLE_HREF } from "../data/premiumArticle";
import type { ArticleScene } from "../data/articleScenes";

type ReadingPanelProps = {
  scene: ArticleScene;
};

export function ReadingPanel({ scene }: ReadingPanelProps) {
  const { currentTheme } = useTheme();

  return (
    <div role="tabpanel" id={`scene-panel-${scene.id}`} aria-labelledby={`scene-tab-${scene.id}`} className="min-h-[320px] sm:min-h-[360px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={scene.id}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: currentTheme.motion.medium, ease: currentTheme.motion.ease }}
          className="rounded-[2rem] border p-7 backdrop-blur-xl sm:p-10"
          style={{
            borderColor: currentTheme.colors.border,
            background: `linear-gradient(180deg, ${currentTheme.colors.surfaceStrong}, ${currentTheme.colors.surface})`,
            boxShadow: `0 24px 90px -44px ${currentTheme.colors.shadowColor}`,
          }}
        >
          <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: currentTheme.colors.textSecondary }}>
            {scene.eyebrow}
          </div>

          <h2 className="font-display max-w-2xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.65rem] sm:leading-[1.06]" style={{ color: currentTheme.colors.textPrimary }}>
            {scene.title}
          </h2>

          <p className="mt-5 max-w-xl text-pretty text-base leading-8 sm:text-lg sm:leading-9" style={{ color: currentTheme.colors.textSecondary }}>
            {scene.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to={PREMIUM_ARTICLE_HREF}
              className="rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:opacity-95"
              style={{
                borderColor: currentTheme.colors.border,
                background: currentTheme.colors.surfaceStrong,
                color: currentTheme.colors.textPrimary,
              }}
            >
              Continue reading
            </Link>
            <button type="button" className="rounded-full border border-transparent px-5 py-3 text-sm font-medium" style={{ color: currentTheme.colors.textSecondary }}>
              View article architecture
            </button>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}