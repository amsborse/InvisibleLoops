import { motion } from "framer-motion";
import { useMemo } from "react";
import type { InfinityPoint } from "../../hooks/useInfinityPathPoints";

type ThemeShape = {
  colors: {
    accentB: string;
    accentC: string;
  };
};

type Particle = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
  opacity: number;
};

function seededValue(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

type InfinityParticlesProps = {
  points: InfinityPoint[];
  currentTheme: ThemeShape;
  isDayThinking: boolean;
};

export function InfinityParticles({ points, currentTheme, isDayThinking }: InfinityParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    const count = isDayThinking ? 20 : 28;

    return Array.from({ length: count }, (_, i) => {
      const ratio = (i / count) % 1;
      const index = Math.floor(ratio * (points.length - 1));
      const base = points[index] ?? points[0];

      const radial = (seededValue(i + 1.12) - 0.5) * (isDayThinking ? 22 : 30);
      const tangent = (seededValue(i + 2.71) - 0.5) * (isDayThinking ? 10 : 15);

      const tx = -base.ny;
      const ty = base.nx;

      return {
        x: base.x + base.nx * radial + tx * tangent,
        y: base.y + base.ny * radial + ty * tangent,
        size: (isDayThinking ? 0.75 : 0.9) + seededValue(i + 5.17) * (isDayThinking ? 0.75 : 1),
        delay: seededValue(i + 9.91) * 2,
        duration: 2.8 + seededValue(i + 13.41) * 2.8,
        driftX: (seededValue(i + 22.7) - 0.5) * (isDayThinking ? 3.2 : 5.8),
        driftY: (seededValue(i + 29.3) - 0.5) * (isDayThinking ? 3.2 : 5.8),
        opacity: isDayThinking ? 0.15 + seededValue(i + 31.9) * 0.14 : 0.22 + seededValue(i + 31.9) * 0.18,
      };
    });
  }, [isDayThinking, points]);

  const particleColor = isDayThinking
    ? `color-mix(in oklab, ${currentTheme.colors.accentB} 48%, white)`
    : `color-mix(in oklab, ${currentTheme.colors.accentC} 64%, white)`;

  return (
    <g>
      {particles.map((particle, index) => (
        <motion.circle
          key={`particle-${index}`}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particleColor}
          initial={false}
          animate={{
            opacity: [particle.opacity * 0.55, particle.opacity, particle.opacity * 0.55],
            scale: [0.88, 1.08, 0.88],
            cx: [particle.x, particle.x + particle.driftX, particle.x],
            cy: [particle.y, particle.y + particle.driftY, particle.y],
          }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}