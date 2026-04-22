import type { ArticleBlock, PremiumArticle } from "./premiumArticle";

/** Close to Medium’s published read speed (~260–275 wpm for English). */
const WORDS_PER_MINUTE = 265;

function blockToText(block: ArticleBlock): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
      return block.text;
    case "callout":
      return `${block.title} ${block.text}`;
    case "list":
      return block.items.join(" ");
    case "code":
      return block.code;
    case "figure":
      return [block.caption, block.alt].filter(Boolean).join(" ");
    default:
      return "";
  }
}

/** Count words in the main reading material (title, subtitle, section body). */
export function countWordsInArticle(article: Pick<PremiumArticle, "title" | "subtitle" | "sections">): number {
  const parts: string[] = [article.title, article.subtitle];
  for (const section of article.sections) {
    for (const block of section.blocks) {
      parts.push(blockToText(block));
    }
  }
  const combined = parts.join(" ");
  const words = combined.trim().split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

export function getReadingTimeMinutes(article: Pick<PremiumArticle, "title" | "subtitle" | "sections">): number {
  const n = countWordsInArticle(article);
  return Math.max(1, Math.round(n / WORDS_PER_MINUTE));
}
