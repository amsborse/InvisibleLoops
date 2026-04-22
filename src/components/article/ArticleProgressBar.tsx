type ArticleProgressBarProps = {
  progress: number;
};

/** Thin reading progress under the navbar */
export function ArticleProgressBar({ progress }: ArticleProgressBarProps) {
  const pct = Math.min(100, Math.max(0, progress));
  return (
    <div
      className="h-[2px] w-full overflow-hidden"
      style={{ background: "color-mix(in srgb, var(--border) 70%, transparent)" }}
      aria-hidden
    >
      <div
        className="h-full origin-left transition-[transform] duration-200 ease-out will-change-transform"
        style={{
          transform: `scaleX(${pct / 100})`,
          background: "linear-gradient(90deg, color-mix(in srgb, var(--accent-strong) 90%, #312e81), var(--accent))",
          boxShadow: "0 0 10px color-mix(in srgb, var(--accent-glow) 45%, transparent)",
        }}
      />
    </div>
  );
}
