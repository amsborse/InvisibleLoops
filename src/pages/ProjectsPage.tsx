import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { ProjectsGrid } from "../components/landing/ProjectsGrid";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-12 lg:gap-14">
      <header aria-labelledby="projects-heading">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] backdrop-blur"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-secondary)",
          }}
        >
          <Layers
            className="h-3.5 w-3.5"
            aria-hidden
            style={{ color: "var(--accent)" }}
          />
          Studio projects
        </motion.div>

        <motion.h1
          id="projects-heading"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          className="mt-6 font-display text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-[3.2rem]"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, var(--text-primary), var(--text-secondary))",
            }}
          >
            Projects
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-5 max-w-2xl text-pretty text-base leading-8 sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Systems, experiments, and crafted interfaces. Each one is an attempt to turn an invisible idea — behavior, thought, money, meaning — into something you can see and steer.
        </motion.p>
      </header>

      <section aria-label="Project grid">
        <ProjectsGrid />
      </section>
    </div>
  );
}
