import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_FLUID_EASE, NAV_MOTION, NAV_MOTION_PRESET, SIDEBAR_ACTIVE_SPRING } from "../../motion/navigationFluid";

const EASE = NAV_FLUID_EASE;
const motionConfig = NAV_MOTION[NAV_MOTION_PRESET];

export type FluidNavItem = {
  to: string;
  label: string;
  sub?: string;
  /**
   * When provided, this row is active if it returns true (evaluated in order; first match wins).
   * When omitted, defaults to `defaultRouteMatch`.
   */
  isActive?: (pathname: string) => boolean;
};

/**
 * Default route match: exact path, or nested routes under `to` (e.g. `/foo` and `/foo/bar`).
 * Root `/` only matches exactly.
 */
export function defaultRouteMatch(pathname: string, to: string): boolean {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

/**
 * Picks the index of the first `FluidNavItem` that matches the current path, or `-1` if none.
 * Uses each item’s `isActive` when set; otherwise `defaultRouteMatch(pathname, item.to)`.
 */
export function getFluidNavActiveIndex(
  pathname: string,
  items: readonly FluidNavItem[],
): number {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]!;
    const match = item.isActive
      ? item.isActive(pathname)
      : defaultRouteMatch(pathname, item.to);
    if (match) return i;
  }
  return -1;
}

export type FluidNavRailProps = {
  items: readonly FluidNavItem[];
  /** e.g. "Where next" */
  title?: string;
  /** Longer line under the title */
  description?: string;
  /** Defaults from `title` or a generic label */
  ariaLabel?: string;
  className?: string;
  /**
   * Override active row (e.g. Storybook or multi-match control).
   * When set, `pathname` matching is ignored.
   */
  activeIndex?: number;
};

/**
 * Reusable “fluid rail” list navigation: spring highlight tracks the active row, same feel as
 * the long-form article table of contents. Use with `items` and optional `title` / `description`.
 */
export function FluidNavRail({
  items,
  title,
  description,
  ariaLabel,
  className = "",
  activeIndex: activeIndexProp,
}: FluidNavRailProps) {
  const { pathname } = useLocation();
  // Prefer a stable `items` reference (module const or parent useMemo) to avoid extra active-index work.
  const activeIndexFromRoute = useMemo(
    () => getFluidNavActiveIndex(pathname, items),
    [pathname, items],
  );
  const activeIndex =
    activeIndexProp !== undefined ? activeIndexProp : activeIndexFromRoute;

  const railContentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 40, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (activeIndex < 0) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const activeEl = itemRefs.current[activeIndex];
      const contentEl = railContentRef.current;
      if (!activeEl || !contentEl) return;

      const itemRect = activeEl.getBoundingClientRect();
      const contentRect = contentEl.getBoundingClientRect();
      const top = itemRect.top - contentRect.top;
      setIndicator({ top, height: itemRect.height, opacity: 1 });
    };

    const raf = window.requestAnimationFrame(updateIndicator);
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex, pathname, items.length]);

  const label =
    ariaLabel ?? (title ? title : "Section navigation");

  return (
    <nav aria-label={label} className={className}>
      {title ? (
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-[11px] sm:tracking-[0.28em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {title}
        </p>
      ) : null}
      {description ? (
        <p
          className="mt-2 text-[14px] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      ) : null}

      <div
        ref={railContentRef}
        className={title || description ? "relative mt-5 min-h-0" : "relative min-h-0"}
      >
        <motion.div
          className="pointer-events-none absolute left-5 right-0 z-0 rounded-[10px] will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 86%)",
            boxShadow:
              "inset 0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent), 0 0 18px color-mix(in srgb, var(--accent) 20%, transparent)",
          }}
          initial={false}
          animate={{
            y: indicator.top,
            height: indicator.height,
            opacity: indicator.opacity,
          }}
          transition={SIDEBAR_ACTIVE_SPRING}
          aria-hidden
        />

        <ol className="relative z-[1] m-0 list-none space-y-0.5 p-0 pl-5">
          {items.map((item, i) => {
            const active = i === activeIndex;
            return (
              <li
                key={`${i}-${item.to}`}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="m-0 p-0"
              >
                <motion.div
                  whileHover={!active ? { x: motionConfig.hoverX } : undefined}
                  transition={{ duration: motionConfig.hoverDuration, ease: EASE }}
                >
                  <Link
                    to={item.to}
                    className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-[var(--bg)]"
                    style={{ textDecoration: "none" }}
                    aria-current={active ? "page" : undefined}
                  >
                    <div
                      className="relative flex items-baseline gap-3 border-l-[3px] py-2.5 pl-4 pr-1 transition-all duration-200 ease-out"
                      style={{
                        borderColor: active ? "var(--accent)" : "transparent",
                        background: "transparent",
                      }}
                    >
                      <span
                        className="w-7 shrink-0 text-left text-[13px] font-semibold tabular-nums sm:text-sm"
                        style={{ color: active ? "var(--accent-ink)" : "var(--text-tertiary)" }}
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className="block text-[15px] font-medium leading-[1.35] tracking-[-0.015em] sm:text-base sm:leading-snug"
                          style={{
                            color: active ? "var(--text-primary)" : "var(--text-secondary)",
                            fontWeight: active ? 600 : 500,
                          }}
                        >
                          {item.label}
                        </span>
                        {item.sub ? (
                          <span
                            className="mt-0.5 line-clamp-1 text-[12px] leading-snug"
                            style={{ color: active ? "var(--text-tertiary)" : "var(--text-muted)" }}
                          >
                            {item.sub}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
