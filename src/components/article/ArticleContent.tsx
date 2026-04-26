import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import type { ArticleBlock, ArticleSection, PremiumArticle } from "../../data/premiumArticle";
import { ArticleFigure } from "./ArticleFigure";

const EASE = [0.22, 1, 0.36, 1] as const;

function buildInsightKeyMap(article: PremiumArticle) {
  let c = 0;
  const m = new Map<string, number>();
  article.sections.forEach((s) => {
    s.blocks.forEach((b, i) => {
      if (b.type === "paragraph" && b.insight) {
        m.set(`${s.id}-${i}`, c++);
      }
    });
  });
  return m;
}

type ArticleContentProps = {
  article: PremiumArticle;
  registerSectionRef: (id: string, el: HTMLElement | null) => void;
  registerInsightRef: (index: number, el: HTMLElement | null) => void;
  activeInsightIndex: number | null;
};

function BlockParagraph({
  text,
  dropCap,
  isOpeningLead,
  insightIndex,
  registerInsightRef,
  activeInsightIndex,
}: {
  text: string;
  dropCap?: boolean;
  isOpeningLead?: boolean;
  insightIndex: number | undefined;
  registerInsightRef: (index: number, el: HTMLElement | null) => void;
  activeInsightIndex: number | null;
}) {
  const isInsight = insightIndex !== undefined;
  const glowActive = isInsight && activeInsightIndex === insightIndex;

  const pClasses = [
    isOpeningLead
      ? "mb-8 text-[1.06rem] leading-[1.9] sm:text-[1.12rem] sm:leading-[1.88] tracking-[-0.01em] text-balance"
      : "mb-7 text-[1.08rem] leading-[1.85] sm:text-[1.1rem] sm:leading-[1.86] tracking-[-0.01em] font-sans",
    dropCap
      ? "first-letter:float-left first-letter:mr-[0.55rem] first-letter:mt-0.5 first-letter:font-display first-letter:font-medium first-letter:text-[3.4rem] first-letter:leading-[0.9] first-letter:tracking-[-0.04em] first-letter:text-[color:var(--text-primary)]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <p
      ref={(el) => {
        if (isInsight && insightIndex !== undefined) registerInsightRef(insightIndex, el);
      }}
      data-insight-index={insightIndex !== undefined ? String(insightIndex) : undefined}
      className={pClasses}
      style={{ color: "var(--article-prose)" }}
    >
      {text}
    </p>
  );

  const insightRule = (child: ReactNode) => (
    <motion.div
      initial={false}
      className="pl-1"
      animate={{
        borderLeftColor: glowActive
          ? "color-mix(in srgb, var(--accent) 88%, #c7d2fe)"
          : "color-mix(in srgb, var(--border-strong) 70%, var(--text-tertiary) 4%)",
      }}
      style={{
        borderLeftWidth: 2,
        borderLeftStyle: "solid",
        paddingLeft: "1.15rem",
        marginLeft: "-0.1rem",
        background: glowActive
          ? "linear-gradient(90deg, color-mix(in srgb, var(--accent) 6%, transparent), transparent 72%)"
          : "transparent",
      }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {child}
    </motion.div>
  );

  const withInsight = isInsight && !isOpeningLead ? insightRule(inner) : inner;

  if (isOpeningLead) {
    if (isInsight) {
      return (
        <motion.div
          initial={false}
          className="relative -mx-0.5 mb-8 border-l-2 pl-0 pt-0.5"
          style={{
            borderLeftStyle: "solid",
            borderLeftWidth: 2,
            borderRadius: "0 0.2rem 0.2rem 0",
            background:
              "linear-gradient(90deg, var(--article-lead-glow), color-mix(in srgb, var(--bg) 0%, transparent) 50%)",
          }}
          animate={{
            borderLeftColor: glowActive
              ? "color-mix(in srgb, var(--accent) 78%, #a5b4fc)"
              : "color-mix(in srgb, var(--accent) 28%, var(--border))",
          }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="pl-5 pr-0">{inner}</div>
        </motion.div>
      );
    }
    return (
      <div
        className="article-lead relative -mx-0.5 mb-8 border-l-2 pl-5 pr-0 pt-0.5"
        style={{
          borderColor: "color-mix(in srgb, var(--accent) 28%, var(--border))",
          background:
            "linear-gradient(90deg, var(--article-lead-glow), color-mix(in srgb, var(--bg) 0%, transparent) 50%)",
          borderRadius: "0 0.2rem 0.2rem 0",
        }}
      >
        {inner}
      </div>
    );
  }

  return withInsight;
}

function BlockHeading({ level, text }: { level: 2 | 3; text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px -55% 0px", amount: 0.35 });
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      ref={ref}
      className={`scroll-mt-28 font-display font-semibold tracking-[-0.02em] transition-all duration-500 ${
        level === 2 ? "mb-3 mt-16 sm:mb-4 sm:mt-20" : "mb-3 mt-10 sm:mt-12"
      }`}
      style={{
        color: "var(--text-primary)",
        fontSize: level === 2 ? "clamp(1.4rem, 3.2vw, 1.7rem)" : "1.125rem",
        fontWeight: level === 2 ? 600 : 600,
        letterSpacing: level === 3 ? "-0.01em" : undefined,
        opacity: inView ? 1 : 0.55,
        transform: inView ? "translateY(0)" : "translateY(6px)",
      }}
    >
      {text}
    </Tag>
  );
}

function BlockQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <motion.figure
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: -2 }}
      className="my-10 rounded-2xl border px-6 py-8 sm:px-9"
      style={{
        borderColor: "color-mix(in srgb, var(--border-strong) 70%, var(--border))",
        background: "color-mix(in srgb, var(--panel) 50%, var(--bg))",
        boxShadow: "inset 0 1px 0 var(--highlight), 0 20px 50px -40px color-mix(in srgb, var(--accent-glow) 35%, transparent)",
      }}
    >
      <blockquote
        className="font-display text-[1.2rem] font-medium leading-[1.4] sm:text-2xl sm:leading-snug"
        style={{ color: "var(--text-primary)" }}
      >
        “{text}”
      </blockquote>
      {attribution ? (
        <figcaption
          className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {attribution}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function BlockCallout({ title, text }: { title: string; text: string }) {
  return (
    <motion.aside
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: EASE }}
      whileHover={{ y: -1, transition: { duration: 0.2 } }}
      className="my-8 rounded-2xl border p-5 backdrop-blur-md sm:p-6"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--panel) 78%, transparent)",
        boxShadow: "inset 0 1px 0 var(--highlight)",
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "var(--accent)" }}>
        {title}
      </p>
      <p className="mt-2.5 text-[0.95rem] leading-[1.65] sm:text-base sm:leading-[1.66]" style={{ color: "var(--article-prose-soft)" }}>
        {text}
      </p>
    </motion.aside>
  );
}

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="mb-8 space-y-3 pl-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-[1.04rem] leading-[1.78] sm:text-[1.06rem] sm:leading-[1.8]"
          style={{ color: "var(--article-prose)" }}
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)" }}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function BlockCode({ language, code }: { language: string; code: string }) {
  return (
    <figure className="mb-8">
      <figcaption className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--text-tertiary)" }}>
        {language}
      </figcaption>
      <pre
        className="overflow-x-auto rounded-2xl border p-4 text-[13px] leading-relaxed sm:p-5"
        style={{
          borderColor: "var(--border)",
          background: "var(--panel-strong)",
          color: "var(--article-prose-soft)",
        }}
      >
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export function ArticleContent({
  article,
  registerSectionRef,
  registerInsightRef,
  activeInsightIndex,
}: ArticleContentProps) {
  const insightMap = useMemo(() => buildInsightKeyMap(article), [article]);

  function renderBlock(sectionId: string, blockIndex: number, block: ArticleBlock) {
    const key = `${sectionId}-${blockIndex}`;
    const insightIndex = insightMap.get(key);

    switch (block.type) {
      case "paragraph": {
        const isOpeningLead =
          sectionId === article.sections[0]?.id && blockIndex === 0 && Boolean(block.dropCap);
        return (
          <BlockParagraph
            key={key}
            text={block.text}
            dropCap={block.dropCap}
            isOpeningLead={isOpeningLead}
            insightIndex={insightIndex}
            registerInsightRef={registerInsightRef}
            activeInsightIndex={activeInsightIndex}
          />
        );
      }
      case "heading":
        return <BlockHeading key={key} level={block.level} text={block.text} />;
      case "quote":
        return <BlockQuote key={key} text={block.text} attribution={block.attribution} />;
      case "callout":
        return <BlockCallout key={key} title={block.title} text={block.text} />;
      case "list":
        return <BlockList key={key} items={block.items} />;
      case "code":
        return <BlockCode key={key} language={block.language} code={block.code} />;
      case "figure":
        return (
          <ArticleFigure key={key} src={block.src} alt={block.alt} caption={block.caption} />
        );
      default:
        return null;
    }
  }

  return (
    <div className="premium-article">
      {article.sections.map((section: ArticleSection) => (
        <section
          key={section.id}
          id={section.id}
          ref={(el) => registerSectionRef(section.id, el)}
          data-article-section={section.id}
          className="scroll-mt-28"
        >
          {section.kicker ? (
            <p
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              {section.kicker}
            </p>
          ) : null}
          {section.blocks.map((block, i) => renderBlock(section.id, i, block))}
        </section>
      ))}
    </div>
  );
}
