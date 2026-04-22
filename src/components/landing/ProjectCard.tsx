import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import type { Project } from "../../data/projects";

const ACCENT_GRADIENTS: Record<Project["accent"], string> = {
  indigo:
    "radial-gradient(70% 60% at 30% 0%, rgba(99,102,241,0.3), transparent 60%)",
  violet:
    "radial-gradient(70% 60% at 30% 0%, rgba(168,85,247,0.28), transparent 60%)",
  cyan:
    "radial-gradient(70% 60% at 30% 0%, rgba(34,211,238,0.24), transparent 60%)",
  emerald:
    "radial-gradient(70% 60% at 30% 0%, rgba(16,185,129,0.22), transparent 60%)",
};

const ACCENT_DOT: Record<Project["accent"], string> = {
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Subtle parallax tilt following the cursor
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);
  const gx = useSpring(glowX, springConfig);
  const gy = useSpring(glowY, springConfig);

  const cursorGlow = useMotionTemplate`radial-gradient(320px circle at ${gx}% ${gy}%, var(--accent-soft), transparent 60%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - target.left) / target.width;
    const py = (event.clientY - target.top) / target.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
        borderColor: "var(--border)",
      }}
      className="group relative h-full overflow-hidden rounded-[1.75rem] border p-7 backdrop-blur-xl sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{ background: "var(--panel-strong-gradient)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
        style={{ background: ACCENT_GRADIENTS[project.accent] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: cursorGlow }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em]"
            style={{
              borderColor: "var(--border)",
              background: "var(--panel-hover)",
              color: "var(--text-secondary)",
            }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT[project.accent]}`} />
            {project.category}
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.26em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {project.status}
          </span>
        </div>

        <h3
          className="mt-7 font-display text-[1.7rem] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[1.95rem]"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>
        <p
          className="mt-4 max-w-sm text-pretty text-sm leading-7"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-10">
          <span
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            View project
            <motion.span
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: "var(--border)",
                background: "var(--panel-hover)",
                color: "var(--text-primary)",
              }}
              whileHover={{ rotate: 0 }}
            >
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.span>
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--text-muted)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        className="block h-full rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
        aria-label={`Open ${project.title}`}
      >
        {content}
      </a>
    );
  }
  return content;
}
