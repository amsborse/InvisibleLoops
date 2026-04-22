import { motion } from "framer-motion";
import { Link2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { PremiumArticle } from "../../data/premiumArticle";
import { InsightCard } from "./InsightCard";

type ArticleSidePanelProps = {
  article: PremiumArticle;
  activeInsightIndex: number | null;
  activeSectionId?: string;
  onShare?: () => void;
};

/**
 * Right rail: editorial marginalia — rules and type, not dashboard cards.
 */
export function ArticleSidePanel({ article, activeInsightIndex, activeSectionId, onShare }: ArticleSidePanelProps) {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);

  const sectionIndex = activeSectionId
    ? article.sections.findIndex((s) => s.id === activeSectionId)
    : -1;
  const sectionDrivenInsightIndex =
    sectionIndex >= 0 && article.sections.length > 1 && article.keyInsights.length > 0
      ? Math.round((sectionIndex / (article.sections.length - 1)) * (article.keyInsights.length - 1))
      : null;
  const visualActiveInsightIndex = activeInsightIndex ?? sectionDrivenInsightIndex;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      onShare?.();
    } catch {
      /* ignore */
    }
  };

  return (
    <aside
      className="premium-article hidden w-full min-w-0 max-w-full flex-col self-start border-l pl-6 font-sans lg:fixed lg:top-[5.5rem] lg:right-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))] lg:flex lg:w-[17.5rem] xl:w-[18rem] xl:pl-7"
      style={{ borderColor: "var(--article-rule)" }}
    >
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--article-prose-faint)" }}
        >
          Read time
        </p>
        <p
          className="mt-2 font-display text-[2.1rem] font-medium leading-none tracking-[-0.03em] sm:text-[2.25rem]"
          style={{ color: "var(--text-primary)" }}
        >
          {article.readTimeMinutes}
          <span className="ml-0.5 font-sans text-sm font-medium opacity-50">min</span>
        </p>
        <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--article-prose-faint)" }}>
          Estimated length for focused reading.
        </p>
      </div>

      <div
        className="my-7 h-px w-full"
        style={{ background: "linear-gradient(90deg, var(--article-rule), transparent)" }}
        aria-hidden
      />

      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--article-prose-soft)" }}
        >
          Marginalia
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "var(--article-prose-faint)" }}>
          Phrases that anchor the essay. They glow in the main column as you read.
        </p>
        <ul className="mt-4 flex flex-col gap-4">
          {article.keyInsights.map((text, i) => (
            <InsightCard key={text} index={i} text={text} active={visualActiveInsightIndex === i} />
          ))}
        </ul>
      </div>

      <div
        className="my-7 h-px w-full"
        style={{ background: "linear-gradient(90deg, var(--article-rule), transparent)" }}
        aria-hidden
      />

      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "var(--article-prose-faint)" }}
        >
          Share
        </h2>
        <div className="mt-3 flex flex-col items-start gap-1">
          <motion.button
            type="button"
            onClick={copyLink}
            className="group inline-flex items-center gap-2 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
            style={{ color: "var(--article-prose)" }}
            whileHover={{ x: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Link2 className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden />
            <span className="border-b border-transparent [transition:border-color_0.2s] group-hover:border-[color:var(--article-prose-faint)]">
              Copy link
            </span>
          </motion.button>
          <motion.a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
            style={{ color: "var(--article-prose)" }}
            whileHover={{ x: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Share2 className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden />
            <span className="border-b border-transparent [transition:border-color_0.2s] group-hover:border-[color:var(--article-prose-faint)]">
              Post
            </span>
          </motion.a>
        </div>
      </div>
    </aside>
  );
}
