import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { CSSProperties } from "react";
import { useId, useMemo } from "react";

type Size = "full" | "compact";

/** Tweak blob shape, animation speed, and visual weight in one place. */
export const LIQUID_NAV_TUNING = {
  /** How long the outline “breathes” between shapes (subtle morph). */
  morphDuration: 7.2,
  morphEase: [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Droplet vertical bob. */
  droplet: {
    cy: [14, 16.2, 14] as const,
    duration: 2.6,
  },
} as const;

/**
 * Asymmetric closed cubic blob in 0–100 viewBox (4 segments) — identical structure
 * for Framer `d` interpolation.
 */
const BLOB_D_A =
  "M 50 2 C 85 2 100 32 100 50 C 100 80 70 100 50 100 C 15 100 0 68 0 50 C 0 15 20 2 50 2 Z";
const BLOB_D_B =
  "M 50 0 C 88 0 100 30 100 55 C 100 88 75 100 45 100 C 12 100 0 72 0 45 C 0 12 18 0 50 0 Z";

const RADIUS: Record<Size, string> = {
  full: "rounded-2xl",
  compact: "rounded-xl",
};

type WaterFieldProps = {
  layoutId: string;
  transition: HTMLMotionProps<"div">["transition"];
  size?: Size;
} & Pick<HTMLMotionProps<"div">, "className" | "style">;

const morphTransition = (reduce: boolean) =>
  reduce
    ? { duration: 0 }
    : {
        duration: LIQUID_NAV_TUNING.morphDuration,
        repeat: Infinity,
        ease: LIQUID_NAV_TUNING.morphEase,
      };

/**
 * Active nav backdrop: shared `layoutId` springs between items (LayoutGroup) while
 * the SVG path subtly morphs. Cosmic / gel, readable type stays above (z-index in TabButton).
 */
export function SidebarActiveWaterField({ layoutId, transition, size = "full", className, style }: WaterFieldProps) {
  const reduceMotion = useReducedMotion() === true;
  const uid = useId();
  const ids = useMemo(() => {
    const safe = uid.replace(/:/g, "");
    return {
      fill: `ln-fill-${safe}`,
      edge: `ln-edge-${safe}`,
      shine: `ln-shine-${safe}`,
    };
  }, [uid]);

  const tMorph = morphTransition(reduceMotion);
  const pathAnimate = reduceMotion
    ? { d: BLOB_D_A }
    : { d: [BLOB_D_A, BLOB_D_B, BLOB_D_A] as [string, string, string] };
  const strokeW = size === "compact" ? 0.55 : 0.7;

  return (
    <motion.div
      layoutId={layoutId}
      className={[
        "absolute inset-0 z-0 pointer-events-none overflow-visible",
        RADIUS[size],
        // Soft outer liquid glow (stays inside scroll; pair with overflow-visible on tab cell)
        "[filter:drop-shadow(0_0_16px_color-mix(in_srgb,var(--accent)_32%,transparent))_drop-shadow(0_0_2px_color-mix(in_srgb,var(--glow-b)_40%,transparent))]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      transition={transition}
    >
      <svg
        className="h-full w-full [overflow:visible]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={ids.fill} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="color-mix(in srgb, var(--accent) 32%, var(--glow-b))" stopOpacity="0.48" />
            <stop
              offset="45%"
              stopColor="color-mix(in srgb, var(--glow-c) 16%, var(--bg))"
              stopOpacity="0.4"
            />
            <stop
              offset="100%"
              stopColor="color-mix(in srgb, var(--bg) 88%, #070a12)"
              stopOpacity="0.88"
            />
          </linearGradient>
          <linearGradient id={ids.shine} x1="20%" y1="0%" x2="55%" y2="88%">
            <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.42" />
            <stop offset="38%" stopColor="transparent" stopOpacity="0" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--accent) 18%, transparent)" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id={ids.edge} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="color-mix(in srgb, #a5f3fc 35%, var(--accent))" stopOpacity="0.92" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.88" />
            <stop offset="100%" stopColor="color-mix(in srgb, var(--accent) 28%, var(--glow-b))" stopOpacity="0.72" />
          </linearGradient>
        </defs>

        <g>
          <motion.path
            fill={`url(#${ids.fill})`}
            initial={false}
            animate={pathAnimate}
            transition={tMorph}
          />
          <motion.path
            fill={`url(#${ids.shine})`}
            className="mix-blend-overlay"
            style={{ opacity: 0.5 } as CSSProperties}
            initial={false}
            animate={pathAnimate}
            transition={tMorph}
          />
          <motion.path
            fill="none"
            stroke={`url(#${ids.edge})`}
            strokeWidth={strokeW}
            strokeLinejoin="round"
            initial={false}
            animate={pathAnimate}
            transition={tMorph}
          />
        </g>

        <motion.ellipse
          cx="86"
          cy="14"
          rx="2.1"
          ry="2.4"
          fill="color-mix(in srgb, var(--highlight) 65%, var(--accent))"
          initial={false}
          animate={reduceMotion ? { cy: 14 } : { cy: [...LIQUID_NAV_TUNING.droplet.cy] as number[] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: LIQUID_NAV_TUNING.droplet.duration, repeat: Infinity, ease: "easeInOut" }
          }
          style={{
            filter: "drop-shadow(0 0 3px color-mix(in srgb, var(--accent) 45%, transparent))",
          }}
        />
      </svg>
    </motion.div>
  );
}
