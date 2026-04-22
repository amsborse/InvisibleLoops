import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { InfinityGraphic } from "@amsborse/cosmic-ui";

type ShowcaseCardProps = {
  mode: "dark" | "light";
};

export function ShowcaseCard({ mode }: ShowcaseCardProps) {
  const isDark = mode === "dark";
  const Icon = isDark ? Moon : Sun;

  return (
    <motion.article
      whileHover={{ y: -2, scale: 1.004 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.65rem] border p-5 sm:p-6"
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(4,10,22,0.92), rgba(4,10,22,0.72))"
          : "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,255,0.95))",
        borderColor: isDark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.22)",
        boxShadow: isDark
          ? "0 26px 74px -46px rgba(0,0,0,0.6), inset 0 1px 0 rgba(148,163,184,0.13)"
          : "0 20px 58px -42px rgba(15,23,42,0.25), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
    >
      <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDark ? "rgba(255,255,255,0.66)" : "rgba(71,85,105,0.72)" }}>
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {isDark ? "Dark Mode" : "Light Mode"}
      </div>

      <div className="mx-auto w-full max-w-[860px]">
        <InfinityGraphic mode={mode} />
      </div>

      <div className="mt-4 text-center">
        <div className="text-[12px] font-semibold uppercase tracking-[0.24em]" style={{ color: isDark ? "rgba(255,255,255,0.68)" : "rgba(51,65,85,0.68)" }}>
          Three Loops. Infinite Insight.
        </div>
        <div className="mt-1 text-sm" style={{ color: isDark ? "rgba(148,163,184,0.85)" : "rgba(100,116,139,0.88)" }}>
          Moving in reverse. At different speeds.
        </div>
      </div>
    </motion.article>
  );
}