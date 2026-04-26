import { motion } from "framer-motion";
import { BookOpen, Focus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../landing/ThemeToggle";
import { ArticleProgressBar } from "./ArticleProgressBar";

type ArticleNavbarProps = {
  progress: number;
  focusMode: boolean;
  onToggleFocus: () => void;
};

export function ArticleNavbar({ progress, focusMode, onToggleFocus }: ArticleNavbarProps) {
  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="premium-article sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--article-rule)",
        background: "color-mix(in srgb, var(--bg) 96%, #000)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 py-1 text-sm font-medium tracking-[-0.01em] outline-none transition-[opacity,color] hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
          style={{ color: "var(--article-prose)" }}
        >
          <BookOpen className="h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
          <span className="hidden sm:inline" style={{ color: "var(--text-primary)" }}>
            Invisible Loops
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <motion.button
            type="button"
            onClick={onToggleFocus}
            aria-pressed={focusMode}
            aria-label={focusMode ? "Exit focus mode" : "Enter focus mode"}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1.5 border-0 bg-transparent px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] outline-none transition-[color,opacity] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)] sm:px-2"
            style={{
              color: focusMode ? "var(--text-primary)" : "var(--article-prose-faint)",
              borderBottom: focusMode
                ? "1.5px solid color-mix(in srgb, var(--accent) 50%, transparent)"
                : "1.5px solid transparent",
            }}
          >
            {focusMode ? (
              <>
                <X className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">Exit</span>
              </>
            ) : (
              <>
                <Focus className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">Focus</span>
              </>
            )}
          </motion.button>
          <ThemeToggle />
        </div>
      </div>
      <ArticleProgressBar progress={progress} />
    </motion.header>
  );
}
