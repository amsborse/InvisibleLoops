import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArticleContent } from "../components/article/ArticleContent";
import { ArticleNavbar } from "../components/article/ArticleNavbar";
import { ArticleSidePanel } from "../components/article/ArticleSidePanel";
import {
  ArticleTableOfContents,
  ArticleTableOfContentsMobile,
} from "../components/article/ArticleTableOfContents";
import { premiumArticle } from "../data/premiumArticle";

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_ANCHOR_OFFSET = 72;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function PremiumArticlePage() {
  const article = premiumArticle;
  const [progress, setProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(article.sections[0]?.id ?? "");
  const [activeInsightIndex, setActiveInsightIndex] = useState<number | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const insightRefs = useRef<Record<number, HTMLElement | null>>({});
  const scrollAnimationFrame = useRef<number | null>(null);
  const activeSectionIdRef = useRef(article.sections[0]?.id ?? "");

  const registerSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  const registerInsightRef = useCallback((index: number, el: HTMLElement | null) => {
    insightRefs.current[index] = el;
  }, []);

  useEffect(() => {
    activeSectionIdRef.current = activeSectionId;
  }, [activeSectionId]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? window.scrollY / max : 0;
      const clamped = clamp(next, 0, 1);
      setPageProgress(clamped);
      setProgress(clamped * 100);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = article.sections.map((s) => s.id);
    const sectionElements = sectionIds.map((id) => sectionRefs.current[id]).filter(Boolean) as HTMLElement[];
    if (sectionElements.length === 0) return;

    const visibility = new Map<string, number>();
    let raf = 0;

    const chooseBest = () => {
      let bestId = activeSectionIdRef.current;
      let bestScore = -Infinity;
      let currentScore = -Infinity;
      const focusLine = window.innerHeight * 0.26;

      for (const id of sectionIds) {
        const el = sectionRefs.current[id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const ratio = visibility.get(id) ?? 0;
        const topDistance = Math.abs(rect.top - focusLine);
        const inFocusBand = rect.top <= focusLine && rect.bottom >= focusLine;

        let score = ratio * 1000 - topDistance;
        if (inFocusBand) score += 180;
        if (id === activeSectionIdRef.current) score += 90;

        if (id === activeSectionIdRef.current) currentScore = score;
        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }

      const hysteresis = 72;
      if (bestId !== activeSectionIdRef.current && bestScore < currentScore + hysteresis) {
        bestId = activeSectionIdRef.current;
      }

      if (bestId !== activeSectionIdRef.current) {
        activeSectionIdRef.current = bestId;
        setActiveSectionId(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set((entry.target as HTMLElement).id, entry.intersectionRatio);
        }
        window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(chooseBest);
      },
      {
        root: null,
        threshold: [0, 0.08, 0.16, 0.24, 0.35, 0.5, 0.7, 1],
        rootMargin: "-18% 0px -52% 0px",
      },
    );

    sectionElements.forEach((el) => observer.observe(el));
    const onScroll = () => {
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(chooseBest);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    chooseBest();

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article.sections]);

  useEffect(() => {
    let insightObserver: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const insightObs = new IntersectionObserver(
        (entries) => {
          let best: { idx: number; r: number } | null = null;
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const raw = (e.target as HTMLElement).dataset.insightIndex;
            if (raw === undefined) continue;
            const idx = Number.parseInt(raw, 10);
            if (Number.isNaN(idx)) continue;
            const r = e.intersectionRatio;
            if (!best || r > best.r) best = { idx, r };
          }
          setActiveInsightIndex(best && best.r > 0.08 ? best.idx : null);
        },
        { threshold: [0, 0.06, 0.12, 0.2, 0.35, 0.5] },
      );
      insightObserver = insightObs;

      for (let i = 0; i < article.keyInsights.length; i += 1) {
        const el = insightRefs.current[i];
        if (el) insightObs.observe(el);
      }
    }, 50);

    return () => {
      window.clearTimeout(timer);
      insightObserver?.disconnect();
    };
  }, [article.keyInsights.length, focusMode]);

  useEffect(() => {
    return () => {
      if (scrollAnimationFrame.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrame.current);
      }
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = SECTION_ANCHOR_OFFSET;
    const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navOffset);
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    if (scrollAnimationFrame.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrame.current);
      scrollAnimationFrame.current = null;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    const duration = Math.min(700, Math.max(360, Math.abs(distance) * 0.42));
    const startTime = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(p);
      window.scrollTo({ top: startY + distance * eased, behavior: "auto" });
      if (p < 1) {
        scrollAnimationFrame.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimationFrame.current = null;
      }
    };

    scrollAnimationFrame.current = window.requestAnimationFrame(step);
  }, []);

  return (
    <div
      className="premium-article premium-article-shell relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 z-[1] hidden lg:block"
        style={{ top: "26vh", height: "18vh" }}
      >
        <div
          className="mx-auto h-full w-full max-w-[1440px]"
          style={{
            background:
              "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 7%, transparent) 25%, color-mix(in srgb, var(--accent) 10%, transparent) 50%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.9) 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.9) 80%, transparent 100%)",
            opacity: 0.88,
          }}
        />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55% 40% at 20% 0%, var(--glow-a), transparent 60%), radial-gradient(45% 35% at 85% 15%, var(--glow-b), transparent 55%), radial-gradient(50% 40% at 70% 90%, var(--glow-c), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(var(--grain) 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        />
      </div>

      <ArticleNavbar
        progress={progress}
        focusMode={focusMode}
        onToggleFocus={() => setFocusMode((v) => !v)}
      />

      <main className="relative mx-auto min-h-0 max-w-[1440px] px-4 pb-32 pt-6 sm:px-6 lg:px-10 lg:pt-12">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="mx-auto mb-16 max-w-[40rem] text-center sm:mb-20 lg:mb-24"
        >
          <p
            className="text-[10px] font-medium uppercase tracking-[0.35em] sm:text-[11px]"
            style={{ color: "var(--article-prose-faint)" }}
          >
            {article.published} · Long read
          </p>
          <h1
            className="mt-6 font-display text-[clamp(2.2rem,5.2vw,3.35rem)] font-medium leading-[1.04] tracking-[-0.034em] text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            {article.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-lg text-pretty text-[1.05rem] font-sans font-normal leading-[1.6] sm:max-w-xl sm:text-lg sm:leading-[1.62]"
            style={{ color: "var(--article-prose-soft)" }}
          >
            {article.subtitle}
          </p>
          <div
            className="mx-auto mt-11 flex items-center justify-center gap-4 border-t border-b py-5 sm:mt-12"
            style={{
              borderColor: "color-mix(in srgb, var(--border) 70%, transparent)",
            }}
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold"
              style={{
                borderColor: "var(--border-strong)",
                background: "color-mix(in srgb, var(--panel-hover) 60%, var(--bg))",
                color: "var(--text-primary)",
              }}
            >
              {article.author.initials}
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {article.author.name}
              </p>
              <p className="text-[12px] font-medium leading-tight" style={{ color: "var(--article-prose-faint)" }}>
                {article.author.role} · {article.readTimeMinutes} min read
              </p>
            </div>
          </div>
        </motion.header>

        <div
          className={`mx-auto grid min-h-0 items-start transition-[grid-template-columns,gap,max-width] duration-500 ${
            focusMode
              ? "max-w-[min(44rem,100%)] gap-0"
              : "max-w-[min(100%,1280px)] gap-x-6 gap-y-10 lg:grid-cols-[minmax(15.5rem,19.5rem)_minmax(0,48rem)_minmax(12rem,17.5rem)] lg:gap-x-10 lg:gap-y-0 xl:gap-x-12"
          }`}
        >
          {!focusMode ? (
            <div className="hidden min-h-0 lg:col-span-1 lg:block">
              <div className="fixed top-[5.5rem] left-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] h-[calc(100dvh-5.5rem-1.25rem)] w-[19.5rem] min-h-0">
                <ArticleTableOfContents
                  sections={article.sections}
                  activeId={activeSectionId}
                  pageProgress={pageProgress}
                  onNavigate={scrollToSection}
                />
              </div>
            </div>
          ) : null}

          <div
            className={`min-w-0 ${
              focusMode ? "w-full" : "max-w-[min(48rem,100%)] justify-self-center lg:col-start-2"
            }`}
          >
            <ArticleTableOfContentsMobile
              sections={article.sections}
              activeId={activeSectionId}
              onNavigate={scrollToSection}
            />
            <ArticleContent
              article={article}
              registerSectionRef={registerSectionRef}
              registerInsightRef={registerInsightRef}
              activeInsightIndex={activeInsightIndex}
            />
          </div>

          {!focusMode ? (
            <ArticleSidePanel
              article={article}
              activeInsightIndex={activeInsightIndex}
              activeSectionId={activeSectionId}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
