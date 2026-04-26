import { motion } from "framer-motion";
import { Focus } from "lucide-react";
import { SceneChipsRow } from "./SceneChipsRow";

type SceneSelectorProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SceneSelector({ activeIndex, onSelect }: SceneSelectorProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-[2rem] border p-6 backdrop-blur-xl sm:p-8"
      style={{
        borderColor: "var(--border)",
        background: "var(--panel-strong-gradient)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="relative z-10">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Prototype scenes
        </p>
        <h3
          className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]"
          style={{ color: "var(--text-primary)" }}
        >
          Articles as guided sequences.
        </h3>
        <p
          className="mt-3 max-w-md text-sm leading-7"
          style={{ color: "var(--text-secondary)" }}
        >
          Choose a scene to preview how a single idea becomes a composed moment on the right. Each chip is a beat in the reading experience.
        </p>

        <div className="mt-8 sm:mt-9">
          <SceneChipsRow
            variant="panel"
            activeIndex={activeIndex}
            onSelect={onSelect}
            ariaLabel="Article scenes in panel"
            layoutGroupId="articles-scenes"
          />
        </div>

        <div
          className="mt-8 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-7 sm:mt-9"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-hover)",
            color: "var(--text-secondary)",
          }}
        >
          <Focus
            className="mt-0.5 h-4 w-4 shrink-0"
            aria-hidden
            style={{ color: "var(--text-tertiary)" }}
          />
          <p>
            The strip under the page title mirrors these scenes — both stay in sync. Only the preview body animates; frames stay calm.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
