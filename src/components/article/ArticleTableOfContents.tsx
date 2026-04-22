import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ArticleSection } from "../../data/premiumArticle";

const EASE = [0.22, 1, 0.36, 1] as const;
const MOTION_PRESET: "luxury" | "crisp" = "luxury";

const MOTION_TUNING = {
  luxury: {
    rail: { stiffness: 210, damping: 32, mass: 0.62 },
    indicator: { stiffness: 260, damping: 30, mass: 0.62 },
    hoverX: 1.25,
    hoverDuration: 0.24,
  },
  crisp: {
    rail: { stiffness: 300, damping: 36, mass: 0.46 },
    indicator: { stiffness: 360, damping: 36, mass: 0.5 },
    hoverX: 1.5,
    hoverDuration: 0.18,
  },
} as const;

type ArticleTableOfContentsProps = {
  sections: ArticleSection[];
  activeId: string;
  pageProgress?: number;
  onNavigate: (id: string) => void;
};

/**
 * Editorial table of contents: typography-first, high contrast, no “widget card” chrome.
 * Receives sticky/position behavior from the page layout wrapper.
 * This component focuses on TOC rendering and internal scrolling.
 */
export function ArticleTableOfContents({
  sections,
  activeId,
  pageProgress = 0,
  onNavigate,
}: ArticleTableOfContentsProps) {
  const motionConfig = MOTION_TUNING[MOTION_PRESET];
  const clampedPageProgress = Math.min(1, Math.max(0, pageProgress));
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const railContentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 52, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const idx = sections.findIndex((s) => s.id === activeId);
      const activeEl = idx >= 0 ? itemRefs.current[idx] : null;
      const contentEl = railContentRef.current;
      if (!activeEl || !contentEl) return;

      const itemRect = activeEl.getBoundingClientRect();
      const contentRect = contentEl.getBoundingClientRect();
      const top = itemRect.top - contentRect.top;
      setIndicator({ top, height: itemRect.height, opacity: 1 });
    };

    const raf = window.requestAnimationFrame(updateIndicator);
    const onResize = () => updateIndicator();
    const scrollEl = scrollWrapRef.current;
    scrollEl?.addEventListener("scroll", onResize, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      scrollEl?.removeEventListener("scroll", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [activeId, sections]);

  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === activeId);
    const activeEl = idx >= 0 ? itemRefs.current[idx] : null;
    const scrollEl = scrollWrapRef.current;
    if (!activeEl || !scrollEl) return;

    // Keep the active TOC row near center for long jumps.
    activeEl.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }, [activeId, sections]);

  return (
    <nav
      aria-label="Table of contents"
      className="premium-article hidden h-full w-full min-w-0 min-h-0 flex-col overflow-hidden font-sans lg:flex"
    >
      <div
        className="relative mb-5 h-[3px] w-full overflow-hidden rounded-full"
        style={{ background: "color-mix(in srgb, var(--border) 75%, transparent)" }}
      >
        <div
          className="absolute inset-0 origin-left [transition:transform_180ms_linear]"
          style={{
            transform: `scaleX(${clampedPageProgress})`,
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--accent) 92%, #93c5fd), color-mix(in srgb, var(--accent) 76%, #c4b5fd))",
            boxShadow: "0 0 14px color-mix(in srgb, var(--accent) 42%, transparent)",
          }}
          aria-hidden
        />
      </div>
      <div className="shrink-0 pr-1">
        <h2
          className="text-xs font-semibold uppercase tracking-[0.22em] sm:text-[13px] sm:tracking-[0.2em]"
          style={{ color: "var(--article-prose-soft)" }}
        >
          In this article
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--article-prose-faint)" }}>
          Sections update as you scroll.
        </p>
      </div>

      <div
        ref={scrollWrapRef}
        className="relative mt-7 min-h-0 flex-1 basis-0 overflow-y-auto overflow-x-hidden overscroll-y-contain pr-1 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:color-mix(in_srgb,var(--article-rail-dim)_70%,var(--bg))_transparent]"
      >
        <div ref={railContentRef} className="relative min-h-full">
          <motion.div
            className="pointer-events-none absolute left-5 right-0 z-0 rounded-[10px] will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 86%)",
              boxShadow:
                "inset 0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent), 0 0 18px color-mix(in srgb, var(--accent) 20%, transparent)",
            }}
            animate={{
              y: indicator.top,
              height: indicator.height,
              opacity: indicator.opacity,
            }}
            transition={{
              type: "spring",
              ...motionConfig.indicator,
            }}
            aria-hidden
          />

          <ol className="relative z-[1] list-none space-y-0.5 pl-5">
            {sections.map((s, i) => {
              const active = activeId === s.id;
              return (
                <li key={s.id} className="m-0 p-0">
                  <motion.button
                    type="button"
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onClick={() => onNavigate(s.id)}
                    className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-[var(--bg)]"
                    whileHover={!active ? { x: motionConfig.hoverX } : undefined}
                    transition={{ duration: motionConfig.hoverDuration, ease: EASE }}
                  >
                    <div
                      className="relative flex items-baseline gap-3 border-l-[3px] py-2.5 pl-4 pr-1 transition-all duration-200 ease-out"
                      style={{
                        borderColor: active ? "var(--accent)" : "transparent",
                        background: "transparent",
                      }}
                    >
                      <span
                        className="w-7 shrink-0 text-[13px] font-semibold tabular-nums sm:text-sm"
                        style={{ color: active ? "var(--accent-ink)" : "var(--article-nav-dim)" }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="min-w-0 flex-1 text-[15px] font-medium leading-[1.35] tracking-[-0.015em] sm:text-base sm:leading-snug"
                        style={{
                          color: active ? "var(--text-primary)" : "var(--article-nav)",
                          fontWeight: active ? 600 : 500,
                        }}
                      >
                        {s.title}
                      </span>
                    </div>
                  </motion.button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
}

export function ArticleTableOfContentsMobile({
  sections,
  activeId,
  onNavigate,
}: ArticleTableOfContentsProps) {
  return (
    <div className="premium-article -mx-1 mb-10 border-b pb-8 font-sans lg:hidden" style={{ borderColor: "var(--article-rule)" }}>
      <h2
        className="text-xs font-semibold uppercase tracking-[0.22em]"
        style={{ color: "var(--article-prose-soft)" }}
      >
        Sections
      </h2>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onNavigate(s.id)}
              className="min-h-[2.5rem] rounded-md px-3.5 py-2 text-left text-[14px] font-medium leading-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
              style={{
                color: active ? "var(--text-primary)" : "var(--article-nav)",
                background: active ? "color-mix(in srgb, var(--accent) 9%, transparent)" : "transparent",
                boxShadow: active ? "inset 0 0 0 1.5px color-mix(in srgb, var(--accent) 35%, var(--border))" : "none",
              }}
            >
              {s.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
