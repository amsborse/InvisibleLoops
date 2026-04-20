import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import type { ArticleScene } from "../data/articleScenes";

type SceneRailProps = {
  scenes: ArticleScene[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SceneRail({ scenes, activeIndex, onSelect }: SceneRailProps) {
  const { currentTheme } = useTheme();

  return (
    <div role="tablist" aria-label="Article scenes" className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      {scenes.map((scene, index) => {
        const active = index === activeIndex;
        return (
          <motion.button
            key={scene.id}
            type="button"
            role="tab"
            id={`scene-tab-${scene.id}`}
            aria-selected={active}
            aria-controls={`scene-panel-${scene.id}`}
            tabIndex={0}
            onClick={() => onSelect(index)}
            whileHover={{ y: currentTheme.motion.hoverLift * 0.28 }}
            transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
            className="group relative overflow-hidden rounded-full border px-4 py-2 text-left text-sm font-medium"
            style={{
              borderColor: currentTheme.colors.border,
              background: active ? currentTheme.colors.surfaceStrong : currentTheme.colors.surface,
              color: active ? currentTheme.colors.textPrimary : currentTheme.colors.textSecondary,
              transition: `all ${currentTheme.motion.fast}s ease`,
            }}
          >
            <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="absolute inset-0 bg-gradient-to-r from-[color:color-mix(in_oklab,var(--theme-accent-a)_20%,transparent)] via-transparent to-[color:color-mix(in_oklab,var(--theme-accent-c)_20%,transparent)]" />
            </span>
            <span className="relative z-10 flex items-center gap-2">
              <CircleDot className="h-4 w-4" style={{ color: active ? currentTheme.colors.accentC : currentTheme.colors.textSecondary }} aria-hidden />
              {scene.eyebrow}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}