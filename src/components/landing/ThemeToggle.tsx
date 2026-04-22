import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";
import { useTheme } from "../../hooks/useTheme";

const EASE = [0.22, 1, 0.36, 1] as const;

const RAYS = [0, 45, 90, 135, 180, 225, 270, 315] as const;

/**
 * Premium theme toggle.
 *
 * The icon is a single custom SVG that morphs between a radiant sun and a
 * crisp crescent moon:
 *   - the core disc shrinks slightly when becoming the moon
 *   - a cut-out circle animated inside a <mask> carves the crescent
 *   - eight rays fade and scale in with a gentle stagger for the sun
 *   - a radial "flash" briefly pulses from the centre on every switch
 *   - the ambient halo behind the button shifts colour with the theme
 */
export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  const maskId = useId();
  const nextLabel = isDark ? "light" : "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextLabel} mode`}
      aria-pressed={isDark}
      title={`Switch to ${nextLabel} mode`}
      whileHover={{ y: -1.5, scale: 1.03 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border backdrop-blur-xl outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
      style={{
        borderColor: "var(--border-strong)",
        background: "var(--panel-strong-gradient)",
        boxShadow: "var(--shadow-toggle)",
      }}
    >
      {/* Ambient theme-tinted glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        initial={false}
        animate={{ background: "var(--toggle-glow)", opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      {/* Soft top sheen that lifts on hover */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-70"
        style={{ background: "var(--toggle-sheen)" }}
        initial={false}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      {/* Rotating conic halo on hover */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-[2px] rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%, rgba(255,255,255,0.18))",
          maskImage: "radial-gradient(circle, black 60%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 62%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Burst "flash" that fires exactly on theme change */}
      <AnimatePresence initial={false}>
        <motion.span
          key={theme}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          initial={{ scale: 0.35, opacity: 0.55 }}
          animate={{ scale: 1.55, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(165,180,252,0.5), transparent 60%)"
              : "radial-gradient(circle, rgba(251,191,36,0.55), transparent 60%)",
          }}
        />
      </AnimatePresence>

      {/* Morphing sun/moon icon */}
      <motion.svg
        viewBox="0 0 24 24"
        className="relative z-10 h-5 w-5"
        initial={false}
        animate={{ rotate: isDark ? -18 : 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ color: "var(--toggle-icon)" }}
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* White = visible, black = hidden */}
            <rect width="24" height="24" fill="black" />
            <circle cx="12" cy="12" r="6.1" fill="white" />
            {/* Animated cut-out: carves the crescent when dark */}
            <motion.circle
              fill="black"
              initial={false}
              animate={{
                cx: isDark ? 16 : 26,
                cy: isDark ? 9 : -2,
                r: isDark ? 5.4 : 0,
              }}
              transition={{ duration: 0.6, ease: EASE }}
            />
          </mask>
        </defs>

        {/* Sun rays — staggered in, retract together */}
        <g>
          {RAYS.map((angle, i) => (
            <motion.line
              key={angle}
              x1="12"
              y1="1.8"
              x2="12"
              y2="4.1"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              transform={`rotate(${angle} 12 12)`}
              initial={false}
              animate={{
                opacity: isDark ? 0 : 1,
                scale: isDark ? 0.2 : 1,
              }}
              transition={{
                duration: 0.36,
                ease: EASE,
                delay: isDark ? i * 0.012 : 0.14 + i * 0.024,
              }}
              style={{ transformOrigin: "12px 12px", transformBox: "fill-box" }}
            />
          ))}
        </g>

        {/* Masked disc — becomes full sun or carved moon */}
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isDark ? 6.4 : 5.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            filter: isDark
              ? "drop-shadow(0 0 5px rgba(165,180,252,0.55)) drop-shadow(0 0 2px rgba(255,255,255,0.35))"
              : "drop-shadow(0 0 6px rgba(251,191,36,0.55)) drop-shadow(0 0 2px rgba(255,255,255,0.6))",
          }}
        />
      </motion.svg>

      {/* Inner ring highlight for a crisper edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{ boxShadow: "inset 0 0 0 1px var(--highlight)" }}
      />

      <span className="sr-only">{theme} mode</span>
    </motion.button>
  );
}
