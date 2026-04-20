import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { themeConfig, type ThemeMode } from "../theme/theme-config";

type ThemeContextValue = {
  mode: ThemeMode;
  currentTheme: (typeof themeConfig)[ThemeMode];
  toggleTheme: () => void;
  isDayThinking: boolean;
  isNightReading: boolean;
};

const STORAGE_KEY = "theme";

function normalizeTheme(value: string | null): ThemeMode | null {
  if (value === "dayThinking" || value === "day" || value === "light") return "dayThinking";
  if (value === "nightReading" || value === "night" || value === "dark") return "nightReading";
  return null;
}

function detectSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "dayThinking";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "nightReading" : "dayThinking";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dayThinking";
    try {
      return normalizeTheme(localStorage.getItem(STORAGE_KEY)) ?? detectSystemTheme();
    } catch {
      return detectSystemTheme();
    }
  });

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dayThinking" ? "nightReading" : "dayThinking"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "nightReading");
    root.setAttribute("data-theme-mode", mode);

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore storage errors
    }
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      currentTheme: themeConfig[mode],
      toggleTheme,
      isDayThinking: mode === "dayThinking",
      isNightReading: mode === "nightReading",
    }),
    [mode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}