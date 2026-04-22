import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type EmptyStateViewProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  cta?: { label: string; onClick?: () => void };
};

const EASE = [0.22, 1, 0.36, 1] as const;

export function EmptyStateView({ icon: Icon, eyebrow, title, description, cta }: EmptyStateViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-[2.25rem] border px-8 py-20 text-center backdrop-blur-xl sm:px-14 sm:py-24"
      style={{
        borderColor: "var(--border)",
        background: "var(--panel-strong-gradient)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2.25rem]"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, var(--accent-soft), transparent 60%)",
        }}
      />

      <motion.div
        aria-hidden
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          borderColor: "var(--border-strong)",
          background: "var(--panel-hover)",
        }}
      >
        <Icon className="h-6 w-6" aria-hidden style={{ color: "var(--accent)" }} />
      </motion.div>

      <p
        className="relative z-10 mt-6 text-[11px] font-semibold uppercase tracking-[0.3em]"
        style={{ color: "var(--text-tertiary)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="relative z-10 mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p
        className="relative z-10 mt-4 max-w-lg text-pretty text-base leading-8"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

      {cta ? (
        <button
          type="button"
          onClick={cta.onClick}
          className="relative z-10 mt-8 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-secondary)",
          }}
        >
          {cta.label}
        </button>
      ) : null}
    </motion.section>
  );
}
