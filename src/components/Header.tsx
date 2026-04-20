import { motion } from "framer-motion";
import { Orbit } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ThemeIconButton } from "./ThemeIconButton";

const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#principles", label: "Principles" },
  { href: "#prototype", label: "Prototype" },
] as const;

export function Header() {
  const { currentTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-2xl"
      style={{
        borderColor: currentTheme.colors.border,
        background: `color-mix(in oklab, ${currentTheme.colors.bgSecondary} 72%, transparent)`,
        transition: `border-color ${currentTheme.motion.medium}s ease, background-color ${currentTheme.motion.medium}s ease`,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:gap-6 sm:px-6 lg:px-10">
        <a href="#top" className="group flex min-w-0 items-center gap-3 rounded-xl outline-offset-4 focus-visible:outline" style={{ outlineColor: currentTheme.colors.border }}>
          <motion.div
            whileHover={{ y: currentTheme.motion.hoverLift * 0.18 }}
            transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              borderColor: currentTheme.colors.border,
              background: currentTheme.colors.surfaceStrong,
              boxShadow: `0 10px 24px -14px ${currentTheme.colors.shadowColor}`,
            }}
          >
            <Orbit className="h-5 w-5" style={{ color: currentTheme.colors.textPrimary }} aria-hidden />
          </motion.div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-wide" style={{ color: currentTheme.colors.textPrimary }}>
              Invisible Loops
            </div>
            <div className="truncate text-[11px] font-medium uppercase tracking-[0.26em]" style={{ color: currentTheme.colors.textSecondary }}>
              Visual articles
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary" style={{ color: currentTheme.colors.textSecondary }}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition-colors"
              style={{ transitionDuration: `${currentTheme.motion.fast}s` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme.colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = currentTheme.colors.textSecondary;
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <motion.button
            type="button"
            whileHover={{ y: currentTheme.motion.hoverLift * 0.2 }}
            transition={{ duration: currentTheme.motion.fast, ease: currentTheme.motion.ease }}
            className="rounded-full border px-4 py-2 text-sm font-medium"
            style={{
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.textPrimary,
              background: currentTheme.colors.surface,
              boxShadow: `0 12px 26px -16px ${currentTheme.colors.shadowColor}`,
            }}
          >
            Read demo
          </motion.button>
          <ThemeIconButton />
        </div>
      </div>
    </header>
  );
}