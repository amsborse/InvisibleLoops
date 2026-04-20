import { useEffect, useMemo, useRef, useState } from "react";

type InfinityMode = "dark" | "light";
type InfinityGraphicProps = { mode: InfinityMode };

type Point = { x: number; y: number };
type HoverState = { x: number; y: number; active: boolean; insideCapture: boolean };
type OrbConfig = {
  color: string;
  baseSpeed: number;
  reverse?: boolean;
  scale: number;
  depth: "main" | "top" | "bottom";
  phase: number;
};
type OrbMode = "path" | "hover" | "return";
type OrbState = {
  progress: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
  trail: Point[];
  mode: OrbMode;
};

const VIEW_W = 1200;
const VIEW_H = 700;
const CENTER_X = 600;
const CENTER_Y = 350;
const TRAIL_LENGTH = 18;

const ORB_CONFIGS: OrbConfig[] = [
  { color: "#FFFFFF", baseSpeed: 0.102, scale: 1.34, depth: "main", phase: 0 },
  { color: "#DCCBFF", baseSpeed: 0.091, scale: 1.18, depth: "top", phase: 0.34, reverse: true },
  { color: "#8FD4FF", baseSpeed: 0.112, scale: 1.26, depth: "bottom", phase: 0.68 },
];

const FOLLOWER_OFFSETS = [
  { x: 0, y: 0 },
  { x: -30, y: 22 },
  { x: 30, y: 22 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleInfinity(scaleX: number, scaleY: number, offsetY = 0, organic = 0, samples = 360): Point[] {
  const points: Point[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = (i / samples) * Math.PI * 2;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    const baseX = (Math.cos(t) / denom) * scaleX;
    const baseY = (Math.sin(t) * Math.cos(t) / denom) * scaleY;
    const organicX = organic * Math.cos(t * 3) * 6;
    const organicY = organic * Math.sin(t * 2) * 4;
    points.push({ x: CENTER_X + baseX + organicX, y: CENTER_Y + offsetY + baseY + organicY });
  }
  return points;
}

function pointsToPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

function getPointAt(points: Point[], progress: number, reverse = false): Point {
  const total = points.length - 1;
  const wrapped = ((reverse ? 1 - progress : progress) % 1 + 1) % 1;
  const scaled = wrapped * total;
  const index = Math.floor(scaled);
  const next = (index + 1) % points.length;
  const t = scaled - index;
  return {
    x: lerp(points[index].x, points[next].x, t),
    y: lerp(points[index].y, points[next].y, t),
  };
}

function seedTrail(points: Point[], phase: number, reverse = false, length = TRAIL_LENGTH) {
  const seeded: Point[] = [];
  for (let i = 0; i < length; i += 1) seeded.push(getPointAt(points, phase - i * 0.013, reverse));
  return seeded;
}

function findNearestProgress(points: Point[], x: number, y: number, reverse = false) {
  let bestIndex = 0;
  let bestDist = Infinity;
  for (let i = 0; i < points.length; i += 1) {
    const dx = points[i].x - x;
    const dy = points[i].y - y;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = i;
    }
  }
  const normalized = bestIndex / (points.length - 1);
  return reverse ? 1 - normalized : normalized;
}

export default function InfinityEnergySvg() {
  const [hover, setHover] = useState<HoverState>({
    x: CENTER_X,
    y: CENTER_Y,
    active: false,
    insideCapture: false,
  });
  const hoverRef = useRef<HoverState>(hover);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const sampled = useMemo(() => {
    const mainPts = sampleInfinity(300, 210, 0, 0);
    const upperPts = sampleInfinity(278, 184, -18, 0.1);
    const lowerPts = sampleInfinity(278, 184, 18, -0.1);
    return {
      mainPts,
      upperPts,
      lowerPts,
      main: pointsToPath(mainPts),
      upper: pointsToPath(upperPts),
      lower: pointsToPath(lowerPts),
    };
  }, []);

  const [orbs, setOrbs] = useState<OrbState[]>(() =>
    ORB_CONFIGS.map((config, idx) => {
      const points = idx === 0 ? sampled.mainPts : idx === 1 ? sampled.upperPts : sampled.lowerPts;
      const p = getPointAt(points, config.phase, config.reverse);
      return {
        progress: config.phase,
        vx: 0,
        vy: 0,
        x: p.x,
        y: p.y,
        trail: seedTrail(points, config.phase, config.reverse),
        mode: "path",
      };
    }),
  );

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  const hoverFx = useMemo(() => {
    const dx = hover.x - CENTER_X;
    const dy = hover.y - CENTER_Y;
    const nx = dx / 600;
    const ny = dy / 350;
    const distance = Math.hypot(dx, dy);
    const centerStrength = hover.active ? Math.max(0, 1 - distance / 240) : 0;
    return {
      centerStrength,
      mainParallaxX: hover.active ? nx * 3 : 0,
      mainParallaxY: hover.active ? ny * 2 : 0,
      upperParallaxX: hover.active ? nx * 2.2 : 0,
      upperParallaxY: hover.active ? ny * 1.4 : 0,
      lowerParallaxX: hover.active ? nx * 4 : 0,
      lowerParallaxY: hover.active ? ny * 2.8 : 0,
      centerGlowOpacity: 0.16 + centerStrength * 0.3,
      centerCoreOpacity: 0.1 + centerStrength * 0.22,
      centerGlowScale: 1 + centerStrength * 0.28,
      captureOpacity: hover.insideCapture ? 0.24 : 0,
      hoverHaloOpacity: hover.insideCapture ? 0.12 + centerStrength * 0.18 : 0,
    };
  }, [hover]);

  useEffect(() => {
    const step = (ts: number) => {
      const last = lastTimeRef.current ?? ts;
      const dt = Math.min(0.032, (ts - last) / 1000);
      lastTimeRef.current = ts;
      const nowSec = ts / 1000;
      const hoverState = hoverRef.current;

      setOrbs((prev) => {
        const next = prev.map((orb) => ({ ...orb }));

        for (let idx = 0; idx < next.length; idx += 1) {
          const orb = next[idx];
          const cfg = ORB_CONFIGS[idx];
          const hoverSlowdown = hoverState.insideCapture ? 0.12 : orb.mode === "return" ? 0.45 : 1;
          next[idx].progress = (orb.progress + dt * cfg.baseSpeed * hoverSlowdown) % 1;
          next[idx].mode = hoverState.insideCapture ? "hover" : orb.mode === "hover" ? "return" : orb.mode;
        }

        if (!hoverState.insideCapture) {
          for (let idx = 0; idx < next.length; idx += 1) {
            if (next[idx].mode !== "path") continue;
            const points = idx === 0 ? sampled.mainPts : idx === 1 ? sampled.upperPts : sampled.lowerPts;
            const p = getPointAt(points, next[idx].progress, ORB_CONFIGS[idx].reverse);
            next[idx].x = p.x;
            next[idx].y = p.y;
            next[idx].vx = 0;
            next[idx].vy = 0;
          }
        }

        // Leader
        const lead = next[0];
        const leadCfg = ORB_CONFIGS[0];
        const leadPathPoint = getPointAt(sampled.mainPts, lead.progress, leadCfg.reverse);

        if (hoverState.insideCapture) {
          const targetX = lerp(leadPathPoint.x, hoverState.x, 0.72);
          const targetY = lerp(leadPathPoint.y, hoverState.y - 8, 0.72);
          let vx = (lead.vx + (targetX - lead.x) * 0.055) * 0.91;
          let vy = (lead.vy + (targetY - lead.y) * 0.055) * 0.91;
          vx = clamp(vx, -8, 8);
          vy = clamp(vy, -8, 8);
          next[0] = { ...lead, vx, vy, x: lead.x + vx, y: lead.y + vy, mode: "hover" };
        } else if (lead.mode === "return") {
          const x = lerp(lead.x, leadPathPoint.x, 0.14);
          const y = lerp(lead.y, leadPathPoint.y, 0.14);
          const dist = Math.hypot(leadPathPoint.x - x, leadPathPoint.y - y);
          next[0] = {
            ...lead,
            x,
            y,
            vx: 0,
            vy: 0,
            progress: findNearestProgress(sampled.mainPts, x, y, leadCfg.reverse),
            mode: dist < 1.2 ? "path" : "return",
          };
        }

        // Followers
        for (let idx = 1; idx < next.length; idx += 1) {
          const orb = next[idx];
          const cfg = ORB_CONFIGS[idx];
          const points = idx === 1 ? sampled.upperPts : sampled.lowerPts;
          const pathPoint = getPointAt(points, orb.progress, cfg.reverse);

          if (hoverState.insideCapture) {
            const leader = next[0];
            const offset = FOLLOWER_OFFSETS[idx];
            const tx = lerp(pathPoint.x, leader.x + offset.x, 0.78);
            const ty = lerp(pathPoint.y, leader.y + offset.y, 0.78);
            let vx = (orb.vx + (tx - orb.x) * 0.048) * 0.92;
            let vy = (orb.vy + (ty - orb.y) * 0.048) * 0.92;
            vx = clamp(vx, -7.5, 7.5);
            vy = clamp(vy, -7.5, 7.5);
            next[idx] = { ...orb, vx, vy, x: orb.x + vx, y: orb.y + vy, mode: "hover" };
          } else if (orb.mode === "return") {
            const x = lerp(orb.x, pathPoint.x, 0.12);
            const y = lerp(orb.y, pathPoint.y, 0.12);
            const dist = Math.hypot(pathPoint.x - x, pathPoint.y - y);
            next[idx] = {
              ...orb,
              x,
              y,
              vx: 0,
              vy: 0,
              progress: findNearestProgress(points, x, y, cfg.reverse),
              mode: dist < 1.2 ? "path" : "return",
            };
          }
        }

        if (!hoverState.insideCapture) {
          for (let idx = 0; idx < next.length; idx += 1) {
            if (next[idx].mode !== "path") continue;
            const points = idx === 0 ? sampled.mainPts : idx === 1 ? sampled.upperPts : sampled.lowerPts;
            const p = getPointAt(points, next[idx].progress, ORB_CONFIGS[idx].reverse);
            next[idx].x = p.x;
            next[idx].y = p.y;
          }
        }

        for (let idx = 0; idx < next.length; idx += 1) {
          const orb = next[idx];
          const minTrailSpacing = idx === 0 ? 8.5 : 7.5;
          const builtTrail: Point[] = [{ x: orb.x, y: orb.y }];

          for (let i = 0; i < prev[idx].trail.length; i += 1) {
            const candidate = prev[idx].trail[i];
            const prevPoint = builtTrail[builtTrail.length - 1];
            const dist = Math.hypot(candidate.x - prevPoint.x, candidate.y - prevPoint.y);
            if (dist >= minTrailSpacing || builtTrail.length < 4) builtTrail.push(candidate);
            if (builtTrail.length >= TRAIL_LENGTH) break;
          }
          while (builtTrail.length < TRAIL_LENGTH) builtTrail.push(builtTrail[builtTrail.length - 1]);

          next[idx].trail = builtTrail.map((point, i) => {
            if (i === 0) return point;
            const prevPoint = builtTrail[i - 1];
            const follow = idx === 0 ? 0.14 : 0.11;
            const subtleDrift = hoverState.insideCapture ? 0 : Math.sin(nowSec * 1.8 + i + idx) * 0.08;
            return {
              x: point.x + (prevPoint.x - point.x) * follow,
              y: point.y + (prevPoint.y - point.y) * follow + subtleDrift,
            };
          });
        }

        return next;
      });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sampled]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 700"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      role="img"
      aria-label="Premium animated neon infinity symbol"
    >
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#04030B" />
          <stop offset="45%" stopColor="#09061A" />
          <stop offset="100%" stopColor="#02030A" />
        </linearGradient>
        <radialGradient id="bgHazeLeft" cx="22%" cy="42%" r="42%">
          <stop offset="0%" stopColor="#8A5CFF" stopOpacity="0.12" />
          <stop offset="52%" stopColor="#6E44FF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#6E44FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bgHazeRight" cx="78%" cy="58%" r="42%">
          <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#4D6BFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#4D6BFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="62%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
        </radialGradient>
        <linearGradient id="grad1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#DCCBFF" />
          <stop offset="22%" stopColor="#8A5CFF" />
          <stop offset="44%" stopColor="#6E44FF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="58%" stopColor="#DCCBFF" />
          <stop offset="78%" stopColor="#5B8CFF" />
          <stop offset="100%" stopColor="#8FD4FF" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#E5D8FF" />
          <stop offset="32%" stopColor="#A97EFF" />
          <stop offset="68%" stopColor="#7A56FF" />
          <stop offset="100%" stopColor="#DCCBFF" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D6E6FF" />
          <stop offset="34%" stopColor="#8DB7FF" />
          <stop offset="70%" stopColor="#5B8CFF" />
          <stop offset="100%" stopColor="#8FD4FF" />
        </linearGradient>
        <filter id="glowSoft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowWide" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="depthShadowTop" x="-120%" y="-120%" width="340%" height="340%">
          <feDropShadow dx="0" dy="-6" stdDeviation="7" floodColor="#8A5CFF" floodOpacity="0.22" />
        </filter>
        <filter id="depthShadowBottom" x="-120%" y="-120%" width="340%" height="340%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#5B8CFF" floodOpacity="0.22" />
        </filter>
        <filter id="glowCenter" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.7 0" />
        </filter>
        <filter id="crossGlow" x="-220%" y="-220%" width="540%" height="540%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1.1 0" />
        </filter>
        <filter id="mouseAura" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.24" />
          <stop offset="34%" stopColor="#DCCBFF" stopOpacity="0.16" />
          <stop offset="64%" stopColor="#8A5CFF" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
        </radialGradient>
        <style>{`
          .path-core, .path-glow, .path-depth, .path-shimmer {
            fill: none; stroke-linecap: round; stroke-linejoin: round; transform-box: fill-box;
            transform-origin: center; transition: transform 260ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease;
            will-change: transform;
          }
          .breathe { animation: breathe 7.5s ease-in-out infinite; transform-origin: center; }
          .crossPulse { animation: crossPulse 4.8s ease-in-out infinite; transform-origin: center; }
          .shimmerSweep { animation: shimmerMove 8.8s linear infinite; }
          @keyframes breathe { 0%, 100% { opacity: 0.9; } 50% { opacity: 1; } }
          @keyframes crossPulse { 0%, 100% { opacity: 0.26; transform: scale(0.96); } 50% { opacity: 0.55; transform: scale(1.04); } }
          @keyframes shimmerMove {
            0% { stroke-dashoffset: 1100; opacity: 0; } 10% { opacity: 0.22; } 35% { opacity: 0.18; }
            55% { opacity: 0.08; } 100% { stroke-dashoffset: -1100; opacity: 0; }
          }
        `}</style>
      </defs>

      <rect width="1200" height="700" fill="url(#bg)" rx="36" />
      <rect width="1200" height="700" fill="url(#bgHazeLeft)" rx="36" />
      <rect width="1200" height="700" fill="url(#bgHazeRight)" rx="36" />
      <rect x="24" y="24" width="1152" height="652" rx="30" fill="none" stroke="rgba(138,92,255,0.12)" />
      <rect x="24" y="24" width="1152" height="652" rx="30" fill="none" stroke="rgba(255,255,255,0.035)" transform="translate(0 1)" />

      <g className="breathe">
        <ellipse
          cx="600"
          cy="350"
          rx={240 * hoverFx.centerGlowScale}
          ry={88 * (1 + hoverFx.centerStrength * 0.16)}
          fill="url(#coreGlow)"
          opacity={0.9 + hoverFx.centerStrength * 0.18}
          filter="url(#glowCenter)"
        />
      </g>

      {hover.insideCapture ? (
        <g pointerEvents="none">
          <circle cx={hover.x} cy={hover.y} r="38" fill="#DCCBFF" opacity={hoverFx.hoverHaloOpacity} filter="url(#mouseAura)" />
          <circle cx={hover.x} cy={hover.y} r="10" fill="#ffffff" opacity="0.08" filter="url(#mouseAura)" />
        </g>
      ) : null}

      <rect
        x="280"
        y="150"
        width="640"
        height="400"
        rx="190"
        fill="transparent"
        onMouseMove={(e) => {
          const svg = svgRef.current;
          if (!svg) return;
          const rect = svg.getBoundingClientRect();
          setHover({
            x: ((e.clientX - rect.left) / rect.width) * VIEW_W,
            y: ((e.clientY - rect.top) / rect.height) * VIEW_H,
            active: true,
            insideCapture: true,
          });
        }}
        onMouseEnter={(e) => {
          const svg = svgRef.current;
          if (!svg) return;
          const rect = svg.getBoundingClientRect();
          setHover({
            x: ((e.clientX - rect.left) / rect.width) * VIEW_W,
            y: ((e.clientY - rect.top) / rect.height) * VIEW_H,
            active: true,
            insideCapture: true,
          });
        }}
        onMouseLeave={() => setHover({ x: CENTER_X, y: CENTER_Y, active: false, insideCapture: false })}
      />
      <rect x="280" y="150" width="640" height="400" rx="190" fill="none" stroke="rgba(255,255,255,0.04)" opacity={hoverFx.captureOpacity} pointerEvents="none" />

      <g className="crossPulse">
        <ellipse cx="600" cy="350" rx={44 * hoverFx.centerGlowScale} ry={16 * (1 + hoverFx.centerStrength * 0.14)} fill="#DCCBFF" opacity={hoverFx.centerGlowOpacity} filter="url(#crossGlow)" />
        <ellipse cx="600" cy="350" rx={24 * hoverFx.centerGlowScale} ry={8 * (1 + hoverFx.centerStrength * 0.1)} fill="#d7e4ff" opacity={hoverFx.centerCoreOpacity} filter="url(#crossGlow)" />
      </g>

      <g style={{ transform: `translate(${hoverFx.mainParallaxX}px, ${hoverFx.mainParallaxY}px)` }}>
        <path d={sampled.main} className="path-glow" stroke="url(#grad1)" strokeWidth="7.2" opacity="0.14" filter="url(#glowWide)" />
        <path d={sampled.main} className="path-core" stroke="url(#grad1)" strokeWidth="2.1" opacity="0.82" filter="url(#glowSoft)" />
        {!hover.insideCapture ? <path d={sampled.main} className="path-shimmer shimmerSweep" stroke="url(#shimmer)" strokeWidth="1.25" opacity="0" filter="url(#glowSoft)" strokeDasharray="160 1200" /> : null}
      </g>
      <g style={{ transform: `translate(${hoverFx.upperParallaxX}px, ${hoverFx.upperParallaxY}px)` }}>
        <path d={sampled.upper} className="path-depth" stroke="url(#grad2)" strokeWidth="5.2" opacity="0.18" filter="url(#depthShadowTop)" />
        <path d={sampled.upper} className="path-glow" stroke="url(#grad2)" strokeWidth="4.1" opacity="0.12" filter="url(#glowWide)" />
        <path d={sampled.upper} className="path-core" stroke="url(#grad2)" strokeWidth="1.5" opacity="0.62" filter="url(#glowSoft)" />
      </g>
      <g style={{ transform: `translate(${hoverFx.lowerParallaxX}px, ${hoverFx.lowerParallaxY}px)` }}>
        <path d={sampled.lower} className="path-depth" stroke="url(#grad3)" strokeWidth="5.2" opacity="0.18" filter="url(#depthShadowBottom)" />
        <path d={sampled.lower} className="path-glow" stroke="url(#grad3)" strokeWidth="4.1" opacity="0.12" filter="url(#glowWide)" />
        <path d={sampled.lower} className="path-core" stroke="url(#grad3)" strokeWidth="1.5" opacity="0.62" filter="url(#glowSoft)" />
      </g>

      {orbs.map((orb, idx) => {
        const cfg = ORB_CONFIGS[idx];
        const nearCenter = Math.max(0, 1 - Math.hypot(orb.x - CENTER_X, orb.y - CENTER_Y) / 140);
        const leadFactor = idx === 0 ? 1 : 0.82;
        const scaleBoost = cfg.scale * leadFactor * (1 + nearCenter * 0.22 + hoverFx.centerStrength * 0.12);
        const glowBoost = 1 + nearCenter * 0.35 + hoverFx.centerStrength * 0.16;
        return (
          <g key={idx} filter={cfg.depth === "top" ? "url(#depthShadowTop)" : cfg.depth === "bottom" ? "url(#depthShadowBottom)" : undefined}>
            {orb.trail.slice(1).map((p, i) => {
              const t = 1 - i / TRAIL_LENGTH;
              const tailIntensity = idx === 0 ? 1 : 0.72;
              const trailFill = idx === 0 ? "#DCCBFF" : idx === 1 ? "#A97EFF" : "#7DB8FF";
              return (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={Math.max(1.2, (4.8 - i * 0.15) * scaleBoost * t)} fill={trailFill} opacity={Math.max(0.03, 0.24 * t * tailIntensity) * glowBoost} filter="url(#glowWide)" />
                  <circle cx={p.x} cy={p.y} r={Math.max(0.7, (2.0 - i * 0.05) * scaleBoost * t)} fill="#ffffff" opacity={Math.max(0.02, 0.1 * t * tailIntensity)} filter="url(#glowSoft)" />
                </g>
              );
            })}
            <circle cx={orb.x} cy={orb.y} r={18.6 * scaleBoost} fill={cfg.color} opacity={0.1 * glowBoost} filter="url(#glowWide)" />
            <circle cx={orb.x} cy={orb.y} r={7.9 * scaleBoost} fill={cfg.color} opacity={0.32 * glowBoost} filter="url(#glowSoft)" />
            <circle cx={orb.x} cy={orb.y} r={3.6 * scaleBoost} fill="#ffffff" opacity="0.98" filter="url(#glowSoft)" />
          </g>
        );
      })}

      <rect width="1200" height="700" fill="url(#vignette)" rx="36" pointerEvents="none" />
    </svg>
  );
}

export function InfinityGraphic({ mode: _mode }: InfinityGraphicProps) {
  return <InfinityEnergySvg />;
}
