import { motion } from "framer-motion";

type InsightCardProps = {
  index: number;
  text: string;
  active?: boolean;
};

/** Distilled note: typographic, rule-based — not a UI card. */
export function InsightCard({ index, text, active }: InsightCardProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="m-0 list-none pl-0"
    >
      <p
        className="text-pretty text-[14px] leading-[1.62] sm:text-[15px] sm:leading-[1.64]"
        style={{
          color: active ? "var(--text-primary)" : "var(--article-prose)",
          fontWeight: active ? 500 : 400,
        }}
      >
        <span
          className="mr-1.5 inline-block font-medium tabular-nums opacity-50"
          style={{ color: "var(--article-nav-dim)" }}
          aria-hidden
        >
          {index + 1}.
        </span>
        {text}
      </p>
    </motion.li>
  );
}
