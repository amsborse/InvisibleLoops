import { LayoutGroup, motion } from "framer-motion";
import { articleScenes } from "../../data/articleScenes";

/** Premium spring: soft settle, obvious motion without bounce */
const SPRING_PANEL = {
  type: "spring" as const,
  stiffness: 260,
  damping: 34,
  mass: 0.9,
};

const SPRING_HERO = {
  type: "spring" as const,
  stiffness: 320,
  damping: 36,
  mass: 0.88,
};

type SceneChipsRowProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Panel: shared layoutId glide. Hero: static high-contrast active (below page hero). */
  variant: "panel" | "hero";
  /** Accessible label for the tablist */
  ariaLabel: string;
  layoutGroupId: string;
};

export function SceneChipsRow({
  activeIndex,
  onSelect,
  variant,
  ariaLabel,
  layoutGroupId,
}: SceneChipsRowProps) {
  const isHero = variant === "hero";
  const spring = isHero ? SPRING_HERO : SPRING_PANEL;

  const row = (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={isHero ? "flex flex-wrap gap-2 sm:gap-2.5" : "relative flex flex-wrap gap-2 sm:gap-2.5"}
    >
      {articleScenes.map((scene, index) => {
        const active = index === activeIndex;
        return (
          <motion.button
            key={scene.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(index)}
            whileHover={
              active
                ? { y: -1, scale: 1.01 }
                : { y: -0.5, scale: 1.008 }
            }
            whileTap={{ scale: 0.985 }}
            transition={spring}
            className={[
              "relative isolate select-none rounded-full text-left outline-none transition-[color,box-shadow,border-color] duration-200 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]",
              isHero
                ? "min-h-[2.5rem] px-3.5 py-2 sm:min-h-[2.625rem] sm:px-4 sm:py-2.5"
                : "min-h-[3rem] px-4 py-2.5 sm:min-h-[3.125rem] sm:px-5 sm:py-3",
            ].join(" ")}
            style={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: active ? "var(--chip-active-border)" : "var(--border)",
              color: active ? "var(--text-primary)" : "var(--text-muted)",
              background: "transparent",
              boxShadow: active
                ? isHero
                  ? `
                    inset 0 1px 0 var(--highlight),
                    0 0 0 1px var(--chip-active-ring),
                    0 6px 28px -12px var(--chip-active-glow)
                  `
                  : undefined
                : undefined,
            }}
          >
            {/* Panel only: gliding highlight */}
            {!isHero && active ? (
              <motion.div
                layoutId={`${layoutGroupId}-chip-highlight`}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--panel-hover-strong), var(--panel-hover))",
                  boxShadow: `
                    inset 0 1px 0 var(--highlight),
                    0 0 0 1px var(--chip-active-ring),
                    0 0 28px -8px var(--chip-active-glow),
                    0 10px 32px -18px rgba(0, 0, 0, 0.5)
                  `,
                }}
                transition={spring}
              />
            ) : null}

            {/* Hero active: filled surface (no layoutId — avoids duplicate with panel) */}
            {isHero && active ? (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, var(--panel-hover-strong), var(--panel-hover))",
                  boxShadow: `
                    inset 0 1px 0 var(--highlight),
                    0 0 0 1px var(--chip-active-ring),
                    0 6px 28px -12px var(--chip-active-glow)
                  `,
                }}
              />
            ) : null}

            <span className="relative z-10 flex items-center gap-2.5 sm:gap-3">
              <span className="relative grid h-5 w-5 shrink-0 place-items-center sm:h-5 sm:w-5">
                {!isHero && active ? (
                  <motion.span
                    layoutId={`${layoutGroupId}-chip-bar`}
                    className="absolute left-0 top-1/2 h-[78%] w-[3px] -translate-y-1/2 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 14px var(--accent-glow)",
                    }}
                    transition={spring}
                  />
                ) : null}
                {isHero && active ? (
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-[78%] w-[3px] -translate-y-1/2 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 0 14px var(--accent-glow)",
                    }}
                  />
                ) : null}
                <motion.span
                  aria-hidden
                  className="rounded-full"
                  style={{
                    width: active ? 9 : 6,
                    height: active ? 9 : 6,
                    background: active ? "var(--accent)" : "var(--text-muted)",
                    boxShadow: active
                      ? "0 0 0 2px var(--chip-active-ring), 0 0 16px var(--accent-glow)"
                      : "none",
                  }}
                  animate={{
                    scale: active ? 1 : 0.88,
                    opacity: active ? 1 : 0.45,
                  }}
                  transition={spring}
                />
              </span>
              <span
                className={[
                  "leading-tight tracking-tight",
                  isHero ? "text-[13px] sm:text-sm" : "text-sm sm:text-[0.9375rem]",
                ].join(" ")}
                style={{
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                  letterSpacing: active ? "-0.01em" : undefined,
                }}
              >
                {scene.eyebrow}
              </span>
              {active && isHero ? (
                <span
                  className="hidden rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] sm:inline-block"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    border: "1px solid var(--chip-active-ring)",
                  }}
                >
                  Active
                </span>
              ) : null}
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  if (isHero) {
    return row;
  }

  return <LayoutGroup id={layoutGroupId}>{row}</LayoutGroup>;
}
