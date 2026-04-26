import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sidebarTabs } from "../../data/sidebarTabs";
import { ThemeToggle } from "./ThemeToggle";

const EASE = [0.22, 1, 0.36, 1] as const;

function getActiveLabel(pathname: string) {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const match = sidebarTabs.find((tab) => tab.path === normalized);
  return match?.label ?? "Invisible Loops";
}

export function TopBar() {
  const location = useLocation();
  const pageLabel = getActiveLabel(location.pathname);

  return (
    <motion.header
      initial={false}
      className="relative z-20 flex items-center justify-between gap-4 px-5 pb-5 pt-5 sm:px-8 sm:pb-6 sm:pt-6 lg:px-14"
    >
      {/* Breadcrumb / brand context */}
      <div className="flex min-w-0 items-center gap-3">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="hidden items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] sm:inline-flex"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-tertiary)",
          }}
        >
          Invisible Loops
        </motion.div>

        <ChevronRight
          aria-hidden
          className="hidden h-3.5 w-3.5 sm:inline-block"
          style={{ color: "var(--text-muted)" }}
        />

        <motion.span
          key={pageLabel}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="truncate text-sm font-medium tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {pageLabel}
        </motion.span>
      </div>

      {/* Theme toggle */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>

      {/* Soft, edge-fading underline so the top bar feels integrated */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px sm:inset-x-10 lg:inset-x-14"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border-strong), transparent)",
        }}
      />
    </motion.header>
  );
}
