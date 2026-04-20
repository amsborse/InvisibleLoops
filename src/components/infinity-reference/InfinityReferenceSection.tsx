import { motion } from "framer-motion";
import { FeatureStrip } from "./FeatureStrip";
import { InfoPanel } from "./InfoPanel";
import { ShowcaseCard } from "./ShowcaseCard";

export function InfinityReferenceSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#020816] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_70%_20%,rgba(59,130,246,0.14),transparent_58%),radial-gradient(80%_60%_at_20%_80%,rgba(168,85,247,0.1),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <InfoPanel />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.05 }} className="space-y-6">
          <ShowcaseCard mode="dark" />
          <ShowcaseCard mode="light" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="lg:col-span-2">
          <FeatureStrip />
        </motion.div>
      </div>
    </section>
  );
}