import { useTheme } from "../hooks/useTheme";

type GrainProps = {
  variant: "light" | "dark";
};

export function Grain({ variant }: GrainProps) {
  const { currentTheme } = useTheme();
  const isDark = variant === "dark";

  return (
    <div
      aria-hidden
      className={isDark ? "pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-soft-light" : "pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"}
      style={{
        backgroundImage: isDark
          ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.84) 0.65px, transparent 0.75px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.75) 0.65px, transparent 0.75px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.7) 0.65px, transparent 0.75px)"
          : `radial-gradient(circle at 20% 20%, color-mix(in oklab, ${currentTheme.colors.textPrimary} 40%, transparent) 0.65px, transparent 0.75px), radial-gradient(circle at 80% 30%, color-mix(in oklab, ${currentTheme.colors.textPrimary} 30%, transparent) 0.65px, transparent 0.75px), radial-gradient(circle at 40% 80%, color-mix(in oklab, ${currentTheme.colors.textPrimary} 35%, transparent) 0.65px, transparent 0.75px)`,
        backgroundSize: "30px 30px, 35px 24px, 24px 32px",
      }}
    />
  );
}