import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type TabButtonProps = {
  index: number;
  icon: LucideIcon;
  label: string;
  description?: string;
  to: string;
  end?: boolean;
  orientation?: "vertical" | "horizontal";
  /** Shared layout id for the active highlight (desktop vs mobile need different ids). */
  layoutId?: string;
};

export function TabButton({
  index,
  icon: Icon,
  label,
  description,
  to,
  end,
  orientation = "vertical",
  layoutId = "sidebar-active-pill",
}: TabButtonProps) {
  const isVertical = orientation === "vertical";
  const num = String(index).padStart(2, "0");

  return (
    <NavLink
      to={to}
      end={end}
      role="tab"
      className={[
        "group relative block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]",
        isVertical ? "rounded-2xl py-0.5" : "shrink-0 min-h-0 overflow-hidden rounded-xl",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {({ isActive }) => (
        <div
          className={isVertical ? "relative overflow-hidden rounded-2xl py-1.5 pl-0 pr-0" : "relative px-0 py-0"}
        >
          {isVertical && isActive ? (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "color-mix(in srgb, var(--accent) 10%, #0a0c12)",
                border: "1px solid color-mix(in srgb, var(--accent) 38%, var(--border))",
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent), 0 10px 36px -18px var(--accent-glow), inset 0 1px 0 color-mix(in srgb, var(--highlight) 12%, transparent)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.5 }}
            />
          ) : null}
          {isVertical && isActive ? (
            <motion.span
              layoutId={`${layoutId}-tab-line`}
              className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full"
              style={{
                background: "linear-gradient(180deg, var(--accent) 0%, #818cf8 100%)",
                boxShadow: "0 0 10px color-mix(in srgb, var(--accent-glow) 45%, transparent)",
              }}
              transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.45 }}
              aria-hidden
            />
          ) : null}
          {isVertical ? (
            <motion.span
              whileTap={{ scale: 0.99 }}
              className="relative z-[1] flex w-full min-w-0 items-start gap-2.5 px-1.5"
            >
              <span
                className="w-7 shrink-0 pt-0.5 text-left text-[11px] font-bold tabular-nums sm:text-xs"
                style={{ color: isActive ? "var(--accent-ink)" : "var(--text-tertiary)" }}
                aria-hidden
              >
                {num}
              </span>
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors"
                style={{
                  borderColor: isActive ? "color-mix(in srgb, var(--accent) 35%, var(--border))" : "var(--border)",
                  background: isActive
                    ? "color-mix(in srgb, var(--accent) 6%, var(--bg))"
                    : "var(--panel-hover)",
                  color: isActive ? "var(--accent-ink)" : "var(--text-tertiary)",
                }}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block text-[14px] font-semibold leading-tight sm:text-[15px]"
                  style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {label}
                </span>
                {description ? (
                  <span
                    className="mt-0.5 line-clamp-2 text-[11px] leading-snug"
                    style={{ color: isActive ? "var(--text-tertiary)" : "var(--text-muted)" }}
                  >
                    {description}
                  </span>
                ) : null}
              </span>
              {isActive ? (
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 0 2px color-mix(in srgb, var(--accent) 20%, transparent), 0 0 10px var(--accent-glow)",
                  }}
                  aria-hidden
                />
              ) : (
                <span className="h-2 w-2 shrink-0" aria-hidden />
              )}
            </motion.span>
          ) : (
            <motion.span
              whileTap={{ scale: 0.98 }}
              className="relative z-[1] flex items-center justify-center gap-1.5 px-3.5 py-2.5"
            >
              {isActive ? (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 9%, var(--bg))",
                    border: "1px solid color-mix(in srgb, var(--accent) 32%, var(--border))",
                    boxShadow: "0 8px 28px -16px var(--accent-glow)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              ) : null}
              <span
                className="relative z-[1] flex h-7 w-7 items-center justify-center rounded-lg border"
                style={{
                  borderColor: isActive ? "var(--border-strong)" : "var(--border)",
                  background: isActive ? "var(--panel)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </span>
              <span
                className="relative z-[1] text-[12px] font-medium whitespace-nowrap"
                style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {label}
              </span>
            </motion.span>
          )}
        </div>
      )}
    </NavLink>
  );
}
