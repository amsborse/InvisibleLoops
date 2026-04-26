import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { PremiumInteractiveNavRail } from "../navigation";
import type { ArticleSection } from "../../data/premiumArticle";

type ArticleTableOfContentsProps = {
  sections: ArticleSection[];
  activeId: string;
  pageProgress?: number;
  onNavigate: (id: string) => void;
};

const ARTICLE_TOC_ROW_HEIGHT = 60;

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
  const clampedPageProgress = Math.min(1, Math.max(0, pageProgress));
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = Math.max(sections.findIndex((s) => s.id === activeId), 0);

  useEffect(() => {
    const idx = sections.findIndex((s) => s.id === activeId);
    const activeEl = idx >= 0 ? itemRefs.current[idx] : null;
    const scrollEl = scrollWrapRef.current;
    if (!activeEl || !scrollEl) return;

    // Prevent jank while scrolling the page: only adjust when row is outside the visible rail.
    const rowTop = activeEl.offsetTop;
    const rowBottom = rowTop + activeEl.offsetHeight;
    const viewTop = scrollEl.scrollTop;
    const viewBottom = viewTop + scrollEl.clientHeight;
    const pad = 14;

    if (rowTop < viewTop + pad) {
      scrollEl.scrollTo({ top: Math.max(0, rowTop - pad), behavior: "auto" });
    } else if (rowBottom > viewBottom - pad) {
      scrollEl.scrollTo({ top: rowBottom - scrollEl.clientHeight + pad, behavior: "auto" });
    }
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
        <PremiumInteractiveNavRail
          items={sections}
          activeIndex={activeIndex}
          itemHeight={ARTICLE_TOC_ROW_HEIGHT}
          itemCenterOffset={30}
          railClassName="left-5 h-[3.75rem] w-[calc(100%-1.25rem)] rounded-xl"
          className="min-h-full"
          renderItem={({ item: s, index: i, isActive, pull }) => (
            <div key={s.id} className="relative z-[1] pl-5">
              <motion.button
                type="button"
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => onNavigate(s.id)}
                className="group w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-[var(--bg)]"
                whileTap={{ scale: 0.995 }}
                animate={{
                  x: isActive ? 5 : pull * 2.5,
                  scale: isActive ? 1.015 : 1 + pull * 0.01,
                  opacity: isActive ? 1 : 0.58 + pull * 0.3,
                }}
                whileHover={!isActive ? { x: 3.5, opacity: 0.94 } : { x: 5.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <div
                  className="relative flex h-[3.75rem] items-center gap-3 pl-4 pr-1 transition-all duration-200 ease-out"
                  style={{ background: "transparent" }}
                >
                  <span
                    className="w-7 shrink-0 text-[13px] font-semibold tabular-nums sm:text-sm"
                    style={{ color: isActive ? "var(--accent-ink)" : "var(--article-nav-dim)" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="min-w-0 flex-1 text-[15px] font-medium leading-[1.35] tracking-[-0.015em] sm:text-base sm:leading-snug"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--article-nav)",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {s.title}
                  </span>
                </div>
              </motion.button>
            </div>
          )}
        />
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
