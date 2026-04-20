import { useMemo } from "react";

export type InfinityPoint = {
  x: number;
  y: number;
  nx: number;
  ny: number;
};

type InfinityPathOptions = {
  width?: number;
  height?: number;
  sampleCount?: number;
  scaleX?: number;
  scaleY?: number;
};

type InfinityPathData = {
  points: InfinityPoint[];
  d: string;
};

function normalize(x: number, y: number) {
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length };
}

function createInfinityPoints({
  width = 440,
  height = 400,
  sampleCount = 880,
  scaleX = 182,
  scaleY = 172,
}: Required<InfinityPathOptions>): InfinityPoint[] {
  const cx = width / 2;
  const cy = height / 2;
  const points: InfinityPoint[] = [];

  for (let i = 0; i <= sampleCount; i++) {
    const t = (i / sampleCount) * Math.PI * 2;
    const xNorm = Math.sin(t);
    const yNorm = Math.sin(t) * Math.cos(t);

    const dx = Math.cos(t);
    const dy = Math.cos(t * 2);
    const tangent = normalize(dx, dy);

    points.push({
      x: xNorm * scaleX + cx,
      y: yNorm * scaleY + cy,
      nx: -tangent.y,
      ny: tangent.x,
    });
  }

  return points;
}

export function useInfinityPathPoints(options?: InfinityPathOptions): InfinityPathData {
  const points = useMemo(
    () =>
      createInfinityPoints({
        width: options?.width ?? 440,
        height: options?.height ?? 400,
        sampleCount: options?.sampleCount ?? 880,
        scaleX: options?.scaleX ?? 182,
        scaleY: options?.scaleY ?? 172,
      }),
    [options?.height, options?.sampleCount, options?.scaleX, options?.scaleY, options?.width],
  );

  const d = useMemo(
    () => points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "),
    [points],
  );

  return { points, d };
}

export function getPointAtProgress(points: InfinityPoint[], progress: number, reverse = false) {
  if (!points.length) {
    return { x: 0, y: 0, nx: 0, ny: 0 };
  }

  const wrapped = ((progress % 1) + 1) % 1;
  const directional = reverse ? 1 - wrapped : wrapped;
  const scaled = directional * (points.length - 1);

  const index = Math.floor(scaled);
  const nextIndex = (index + 1) % points.length;
  const blend = scaled - index;

  const a = points[index];
  const b = points[nextIndex];

  return {
    x: a.x + (b.x - a.x) * blend,
    y: a.y + (b.y - a.y) * blend,
    nx: a.nx + (b.nx - a.nx) * blend,
    ny: a.ny + (b.ny - a.ny) * blend,
  };
}