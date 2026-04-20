import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { getPointAtProgress, type InfinityPoint } from "../../hooks/useInfinityPathPoints";

type ThemeShape = {
  colors: {
    accentA: string;
    accentB: string;
    accentC: string;
  };
};

type InfinityDotFollowerProps = {
  points: InfinityPoint[];
  duration: number;
  phase: number;
  radius: number;
  coreColor: string;
  glowColor: string;
  opacity: number;
  glowScale: number;
};

function InfinityDotFollower({ points, duration, phase, radius, coreColor, glowColor, opacity, glowScale }: InfinityDotFollowerProps) {
  const x = useMotionValue(points[0]?.x ?? 0);
  const y = useMotionValue(points[0]?.y ?? 0);

  useAnimationFrame((t) => {
    const progress = ((t / 1000) / duration + phase) % 1;
    const point = getPointAtProgress(points, progress, true);
    x.set(point.x);
    y.set(point.y);
  });

  useEffect(() => {
    const initial = getPointAtProgress(points, phase, true);
    x.set(initial.x);
    y.set(initial.y);
  }, [phase, points, x, y]);

  return (
    <motion.g style={{ x, y }} opacity={opacity}>
      <circle cx="0" cy="0" r={radius * glowScale} fill={glowColor} opacity={0.18} />
      <circle cx="0" cy="0" r={radius * 1.45} fill={glowColor} opacity={0.2} />
      <circle cx="0" cy="0" r={radius} fill={coreColor} />
    </motion.g>
  );
}

type InfinityDotsProps = {
  points: InfinityPoint[];
  currentTheme: ThemeShape;
  isDayThinking: boolean;
};

export function InfinityDots({ points, currentTheme, isDayThinking }: InfinityDotsProps) {
  const primaryCore = isDayThinking ? "#4f7cff" : "#eaf4ff";
  const glow = isDayThinking
    ? `color-mix(in oklab, ${currentTheme.colors.accentB} 62%, white)`
    : `color-mix(in oklab, ${currentTheme.colors.accentC} 70%, white)`;

  return (
    <g>
      <InfinityDotFollower
        points={points}
        duration={10.8}
        phase={0.19}
        radius={isDayThinking ? 6.3 : 6.8}
        glowScale={2.45}
        coreColor={primaryCore}
        glowColor={glow}
        opacity={1}
      />
      <InfinityDotFollower
        points={points}
        duration={7.4}
        phase={0.52}
        radius={isDayThinking ? 4.8 : 5.3}
        glowScale={2.25}
        coreColor={currentTheme.colors.accentC}
        glowColor={glow}
        opacity={0.9}
      />
      <InfinityDotFollower
        points={points}
        duration={5.9}
        phase={0.79}
        radius={isDayThinking ? 3.7 : 4.2}
        glowScale={2.1}
        coreColor={currentTheme.colors.accentA}
        glowColor={glow}
        opacity={0.78}
      />
    </g>
  );
}