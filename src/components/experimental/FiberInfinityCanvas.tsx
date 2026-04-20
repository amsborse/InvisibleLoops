import { useEffect, useMemo, useRef } from "react";

type Strand = {
  offset: number;
  thickness: number;
  alpha: number;
  phase: number;
  speed: number;
  noise: number;
};

type Particle = {
  side: -1 | 1;
  angle: number;
  radius: number;
  size: number;
  alpha: number;
  twinkle: number;
};

function easeInOut(t: number) {
  return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

export function FiberInfinityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);

  const strands = useMemo<Strand[]>(() => {
    const count = 56;
    return Array.from({ length: count }, (_, i) => {
      const n = i / Math.max(1, count - 1);
      const spread = (n - 0.5) * 2;
      return {
        offset: spread * 14,
        thickness: 0.7 + (1 - Math.abs(spread)) * 0.9,
        alpha: 0.18 + (1 - Math.abs(spread)) * 0.34,
        phase: n * Math.PI * 2.6,
        speed: 0.18 + n * 0.22,
        noise: 0.55 + n * 0.45,
      };
    });
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const angle = (Math.random() * Math.PI * 2) - Math.PI;
      return {
        side,
        angle,
        radius: 24 + Math.random() * 54,
        size: 0.7 + Math.random() * 1.6,
        alpha: 0.08 + Math.random() * 0.16,
        twinkle: Math.random() * 2.2,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (timeMs: number) => {
      if (!running) return;

      const time = timeMs / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      if (!w || !h) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      const cx = w / 2;
      const cy = h / 2;
      // Keep the infinity proportions stable across screen sizes so it does not flatten.
      const xScale = Math.min(w * 0.33, h * 0.94);
      const yScale = xScale * 0.66;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.62);
      bgGrad.addColorStop(0, "rgba(38,70,170,0.12)");
      bgGrad.addColorStop(1, "rgba(2,7,20,0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      strands.forEach((strand) => {
        ctx.beginPath();

        for (let i = 0; i <= 280; i++) {
          const p = i / 280;
          const t = p * Math.PI * 2;

          const spineX = Math.sin(t);
          const spineY = Math.sin(t) * Math.cos(t);
          const dx = Math.cos(t);
          const dy = Math.cos(2 * t);
          const dLen = Math.hypot(dx, dy) || 1;
          const nx = -dy / dLen;
          const ny = dx / dLen;

          const centerCompression = 0.35 + 0.65 * Math.abs(spineX);
          const breathing = 1 + Math.sin(time * strand.speed + t * 2.1 + strand.phase) * 0.16;
          const offset = strand.offset * centerCompression * breathing;
          const micro = Math.sin(t * 6 + time * (0.45 + strand.noise * 0.25) + strand.phase) * strand.noise * 0.6;

          const x = cx + spineX * xScale + nx * (offset + micro);
          const y = cy + spineY * yScale + ny * (offset + micro);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const grad = ctx.createLinearGradient(cx - xScale, cy, cx + xScale, cy);
        grad.addColorStop(0, `rgba(168,85,247,${strand.alpha})`);
        grad.addColorStop(0.5, `rgba(59,130,246,${strand.alpha * 1.15})`);
        grad.addColorStop(1, `rgba(34,211,238,${strand.alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = strand.thickness;
        ctx.shadowBlur = 8 + strand.thickness * 2;
        ctx.shadowColor = "rgba(96,165,250,0.34)";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Crisp inner core pass
        ctx.strokeStyle = "rgba(178,208,255,0.14)";
        ctx.shadowBlur = 0;
        ctx.lineWidth = Math.max(0.45, strand.thickness * 0.4);
        ctx.stroke();
      });

      // Energy anchors near outer loops
      const anchors = [
        { t: Math.PI * 1.22, c: "rgba(232,121,249,0.92)" },
        { t: Math.PI * 1.78, c: "rgba(232,121,249,0.88)" },
        { t: Math.PI * 0.22, c: "rgba(103,232,249,0.92)" },
        { t: Math.PI * 0.78, c: "rgba(103,232,249,0.88)" },
      ];

      anchors.forEach((anchor) => {
        const x = cx + Math.sin(anchor.t) * xScale;
        const y = cy + Math.sin(anchor.t) * Math.cos(anchor.t) * yScale;
        const pulse = 0.88 + Math.sin(time * 1.7 + anchor.t) * 0.12;

        ctx.beginPath();
        ctx.fillStyle = anchor.c;
        ctx.shadowBlur = 24;
        ctx.shadowColor = anchor.c;
        ctx.arc(x, y, 4.8 * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sparse ambient particles around outer lobes
      particles.forEach((particle, i) => {
        const centerX = cx + particle.side * xScale * 0.92;
        const centerY = cy;
        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * (particle.radius * 0.54);
        const twinkle = easeInOut((Math.sin(time * 0.8 + particle.twinkle + i * 0.13) + 1) * 0.5);

        ctx.beginPath();
        ctx.fillStyle = `rgba(174,222,255,${particle.alpha * (0.55 + twinkle * 0.9)})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(96,165,250,0.5)";
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, [particles, strands]);

  return (
    <div className="relative mx-auto w-full max-w-[1180px]">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(70%_60%_at_50%_50%,rgba(59,130,246,0.18),transparent_72%)]" />
      <canvas
        ref={canvasRef}
        className="relative w-full rounded-[2rem] border border-slate-300/15 bg-[linear-gradient(180deg,rgba(5,10,22,0.95),rgba(5,10,22,0.78))] shadow-[0_40px_110px_-66px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(148,163,184,0.12)] aspect-[2.15/1]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),transparent)]" />
    </div>
  );
}