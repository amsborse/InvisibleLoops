/**
 * Spring tuning shared by article table of contents and home hero “fluid” rails.
 * Keep in sync for a single navigational feel.
 */
export const NAV_FLUID_EASE = [0.22, 1, 0.36, 1] as const;

export const NAV_MOTION_PRESET: "luxury" | "crisp" = "luxury";

/** Slightly stiffer for the small left accent so it keeps pace with the pill. */
export const SIDEBAR_ACTIVE_LINE_SPRING = {
  type: "spring" as const,
  stiffness: 100,
  damping: 21,
  mass: 0.95,
  restDelta: 0.0004,
  restSpeed: 0.12,
} as const;

export const NAV_MOTION = {
  luxury: {
    rail: { stiffness: 210, damping: 32, mass: 0.62 },
    indicator: { stiffness: 260, damping: 30, mass: 0.62 },
    hoverX: 1.25,
    hoverDuration: 0.24,
  },
  crisp: {
    rail: { stiffness: 300, damping: 36, mass: 0.46 },
    indicator: { stiffness: 360, damping: 36, mass: 0.5 },
    hoverX: 1.5,
    hoverDuration: 0.18,
  },
} as const;

/**
 * Framer `layoutId` (sidebar / mobile tab highlight): soft, slow glide so the active pill
 * reads as a single object drifting between rows instead of snapping.
 */
export const SIDEBAR_ACTIVE_SPRING = {
  type: "spring" as const,
  stiffness: 88,
  damping: 20,
  mass: 1.05,
  restDelta: 0.0004,
  restSpeed: 0.12,
} as const;
