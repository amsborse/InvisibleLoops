export type ThemeMode = "dayThinking" | "nightReading";

type MotionTokens = {
  fast: number;
  medium: number;
  slow: number;
  ease: [number, number, number, number];
  hoverLift: number;
  glowStrength: number;
  backgroundDrift: number;
  pulseScale: number;
  infinityDuration: number;
  iconRotate: number;
};

type ColorTokens = {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  surface: string;
  surfaceStrong: string;
  border: string;
  accentA: string;
  accentB: string;
  accentC: string;
  heroGlow: string;
  shadowColor: string;
};

export const themeConfig: Record<
  ThemeMode,
  {
    label: string;
    colors: ColorTokens;
    motion: MotionTokens;
  }
> = {
  dayThinking: {
    label: "Day Thinking",
    colors: {
      bgPrimary: "#f6f7fb",
      bgSecondary: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#475569",
      surface: "rgba(255,255,255,0.72)",
      surfaceStrong: "rgba(255,255,255,0.92)",
      border: "rgba(15,23,42,0.08)",
      accentA: "#4f46e5",
      accentB: "#3b82f6",
      accentC: "#14b8a6",
      heroGlow: "rgba(79,70,229,0.14)",
      shadowColor: "rgba(15,23,42,0.08)",
    },
    motion: {
      fast: 0.22,
      medium: 0.36,
      slow: 0.52,
      ease: [0.22, 1, 0.36, 1],
      hoverLift: -6,
      glowStrength: 0.35,
      backgroundDrift: 4,
      pulseScale: 1.02,
      infinityDuration: 6.5,
      iconRotate: 100,
    },
  },
  nightReading: {
    label: "Night Reading",
    colors: {
      bgPrimary: "#070b12",
      bgSecondary: "#0b1220",
      textPrimary: "rgba(255,255,255,0.94)",
      textSecondary: "rgba(255,255,255,0.62)",
      surface: "rgba(255,255,255,0.05)",
      surfaceStrong: "rgba(255,255,255,0.08)",
      border: "rgba(255,255,255,0.1)",
      accentA: "#6366f1",
      accentB: "#60a5fa",
      accentC: "#2dd4bf",
      heroGlow: "rgba(99,102,241,0.22)",
      shadowColor: "rgba(0,0,0,0.35)",
    },
    motion: {
      fast: 0.3,
      medium: 0.48,
      slow: 0.76,
      ease: [0.16, 1, 0.3, 1],
      hoverLift: -4,
      glowStrength: 0.8,
      backgroundDrift: 12,
      pulseScale: 1.05,
      infinityDuration: 8.5,
      iconRotate: 140,
    },
  },
};
