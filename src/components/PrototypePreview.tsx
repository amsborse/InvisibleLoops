import { useState } from "react";
import { Focus } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { articleScenes } from "../data/articleScenes";
import { ReadingPanel } from "./ReadingPanel";
import { SceneRail } from "./SceneRail";

export function PrototypePreview() {
  const { currentTheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScene = articleScenes[activeIndex] ?? articleScenes[0];

  return (
    <section id="prototype" className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10 lg:py-14" aria-labelledby="prototype-heading">
      <h2 id="prototype-heading" className="sr-only">Article experience preview</h2>
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-10">
        <div
          className="rounded-[2rem] border p-6 backdrop-blur-xl sm:p-8"
          style={{
            borderColor: currentTheme.colors.border,
            background: `linear-gradient(180deg, ${currentTheme.colors.surfaceStrong}, ${currentTheme.colors.surface})`,
            boxShadow: `0 20px 60px -34px ${currentTheme.colors.shadowColor}`,
          }}
        >
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: currentTheme.colors.textSecondary }}>
            Prototype scenes
          </div>
          <SceneRail scenes={articleScenes} activeIndex={activeIndex} onSelect={setActiveIndex} />
          <div
            className="mt-8 rounded-[1.5rem] border p-5 sm:p-6"
            style={{ borderColor: currentTheme.colors.border, background: currentTheme.colors.surface }}
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-medium" style={{ color: currentTheme.colors.textSecondary }}>
              <Focus className="h-4 w-4" aria-hidden />
              Live concept framing
            </div>
            <p className="text-sm leading-7" style={{ color: currentTheme.colors.textSecondary }}>
              Click through scenes to preview how a single article becomes a guided visual experience instead of a static essay page.
            </p>
          </div>
        </div>

        <ReadingPanel scene={activeScene} />
      </div>
    </section>
  );
}