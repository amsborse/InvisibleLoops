import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themeConfig, type ThemeMode as LegacyThemeMode } from "../theme/theme-config";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  /** Canonical theme name used across the new design system. */
  theme: Theme;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  /** Legacy API — kept for backward compatibility with older components. */
  mode: LegacyThemeMode;
  currentTheme: (typeof themeConfig)[LegacyThemeMode];
  isDayThinking: boolean;
  isNightReading: boolean;
};

const STORAGE_KEY = "theme";

function normalizeStored(value: string | null): Theme | null {
  if (value === "dark" || value === "nightReading" || value === "night") return "dark";
  if (value === "light" || value === "dayThinking" || value === "day") return "light";
  return null;
}

function themeToLegacy(theme: Theme): LegacyThemeMode {
  return theme === "dark" ? "nightReading" : "dayThinking";
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    try {
      return normalizeStored(localStorage.getItem(STORAGE_KEY)) ?? "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
    // Legacy attribute used by older bootstrap script
    root.setAttribute("data-theme-mode", themeToLegacy(theme));

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const applyTheme = useCallback((next: Theme | ((prev: Theme) => Theme)) => {
    // Progressive enhancement: use the native View Transitions API when available
    // so the entire page crossfades instead of snapping between themes.
    const doc = typeof document !== "undefined" ? document : null;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const startVT = (
      doc as Document & { startViewTransition?: (cb: () => void) => unknown }
    )?.startViewTransition?.bind(doc);

    if (startVT && !prefersReduced) {
      startVT(() => {
        setThemeState((prev) =>
          typeof next === "function" ? (next as (p: Theme) => Theme)(prev) : next,
        );
      });
      return;
    }

    setThemeState((prev) =>
      typeof next === "function" ? (next as (p: Theme) => Theme)(prev) : next,
    );
  }, []);

  const setTheme = useCallback((next: Theme) => applyTheme(next), [applyTheme]);
  const toggleTheme = useCallback(
    () => applyTheme((prev) => (prev === "dark" ? "light" : "dark")),
    [applyTheme],
  );

  const value = useMemo<ThemeContextValue>(() => {
    const mode = themeToLegacy(theme);
    return {
      theme,
      isDark: theme === "dark",
      isLight: theme === "light",
      toggleTheme,
      setTheme,
      mode,
      currentTheme: themeConfig[mode],
      isDayThinking: mode === "dayThinking",
      isNightReading: mode === "nightReading",
    };
  }, [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
