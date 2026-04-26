import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  Circle,
  Eye,
  Flame,
  Focus,
  Quote,
  MousePointer2,
  Orbit,
  Layers3,
} from "lucide-react";

const articleBlocks = [
  {
    id: "opening",
    kicker: "Opening realization",
    title: "No one is coming to save you — which means you finally can.",
    lead:
      "This is not harsh. It is the moment the responsibility returns to its rightful place. The moment you stop waiting, life stops feeling delayed.",
    body: [
      "You can have stability, people, opportunities, even love around you — and still feel that something essential is missing.",
      "The real shift begins when you stop reading your life as something happening to you and begin reading it as something being authored through you.",
      "That is the emotional center of this piece: responsibility not as punishment, but as recovered power.",
    ],
    accent: "from-orange-400/30 via-amber-300/10 to-transparent",
  },
  {
    id: "self-exploration",
    kicker: "Section 01",
    title: "Self-exploration is where the fog begins to break.",
    lead:
      "Not by becoming dramatic. Not by endlessly analyzing. By learning to observe yourself cleanly enough that your patterns stop hiding from you.",
    body: [
      "Observe your life almost like a third person: what am I doing, why am I doing it, what am I feeling right now?",
      "The article compares the mind to a garden. Some thoughts are flowers. Some are weeds. Both grow if left unattended.",
      "This becomes interactive when the reader feels they are not just consuming advice, but catching themselves in real time.",
    ],
    accent: "from-sky-400/30 via-cyan-300/10 to-transparent",
  },
  {
    id: "root-cause",
    kicker: "Section 02",
    title: "Most people react to the smoke, not the fire.",
    lead:
      "You feel something uncomfortable, then immediately act from that feeling. But the feeling is often not the origin. It is evidence.",
    body: [
      "The article’s strongest mental model is simple: you feel Y because of X, but instead of tracing X, you respond with Z and create a larger chain.",
      "That is what makes the article valuable on a website: it can visualize the chain, not just describe it.",
      "The reader should feel the difference between reaction and response as a physical transition on the page.",
    ],
    accent: "from-fuchsia-400/30 via-violet-300/10 to-transparent",
  },
  {
    id: "negativity",
    kicker: "Section 03",
    title: "Negativity feels external. Experience says otherwise.",
    lead:
      "External triggers are real. But the full emotional event still completes itself within perception. That is where freedom enters the article.",
    body: [
      "The article invites a harder question: what in me is perceiving this as negative?",
      "That question is powerful because it moves the reader from blame into authorship without sounding preachy.",
      "A strong interactive version should make this feel like a mirror — not a lecture.",
    ],
    accent: "from-emerald-400/30 via-teal-300/10 to-transparent",
  },
  {
    id: "mind-traps",
    kicker: "Section 04",
    title: "Mind traps do not look like traps while you are in them.",
    lead:
      "They look like productivity. They look like justification. They look like one more thought before action. That is why they work.",
    body: [
      "Productive avoidance is one of the best examples in the piece: easy useful things replacing difficult meaningful things.",
      "Overthinking is another: after the decision is already made, the mind keeps negotiating so action can remain delayed.",
      "This part should feel tactile, clickable, almost diagnostic — the reader presses a pattern and sees themselves inside it.",
    ],
    accent: "from-rose-400/30 via-pink-300/10 to-transparent",
  },
  {
    id: "practice",
    kicker: "Section 05",
    title: "The article becomes real only when it turns into practice.",
    lead: "This is where the page should stop sounding wise and start becoming useful.",
    body: [
      "Ask what qualities you want to build, not just what outcomes you want.",
      "Use why until you hit understanding instead of borrowed language.",
      "Protect focus. Remove distractions. Separate control from non-control. Use the present moment as an action surface.",
    ],
    accent: "from-indigo-400/30 via-blue-300/10 to-transparent",
  },
  {
    id: "closing",
    kicker: "Closing movement",
    title: "Character is the only story that survives time.",
    lead:
      "The ending is not about hustle. It is about becoming someone you respect when no one is watching.",
    body: [
      "Material things are framed as side effects. Character is framed as cause.",
      "Purpose becomes deeply personal here: not to be seen, not to be validated, but to become someone you cannot lie to.",
      "That line should land like a final echo, not just another sentence at the bottom of a page.",
    ],
    accent: "from-yellow-400/30 via-orange-300/10 to-transparent",
  },
] as const;

const trapCards = [
  {
    id: "reaction",
    title: "Reaction vs Response",
    summary: "Fast emotion feels true, so the body moves before awareness catches up.",
    detail:
      "In the article, reaction is automatic and emotional. Response is thoughtful and deliberate. This should not just be text — it should feel like two different speeds of motion.",
  },
  {
    id: "symptom",
    title: "Treating symptoms as causes",
    summary: "You act on the feeling instead of investigating the pattern that created it.",
    detail:
      "This is one of the strongest ideas in the piece. If you can show X → Y → Z as an animated sequence, the article becomes memorable instead of merely readable.",
  },
  {
    id: "avoidance",
    title: "Productive avoidance",
    summary: "Useful tasks can still be avoidance if they protect you from meaningful difficulty.",
    detail:
      "Cleaning, organizing, low-friction wins — all satisfying, all capable of becoming elegant distractions from the work that would actually move life forward.",
  },
  {
    id: "overthinking",
    title: "Overthinking",
    summary: "The decision is made, but the mind keeps negotiating so action can remain postponed.",
    detail:
      "The trap feels intelligent from the inside. That is why it deserves a diagnostic treatment instead of a generic motivational paragraph.",
  },
] as const;

const practiceSteps = [
  { title: "Ask what qualities you want for yourself.", hint: "Shift from acquisition to character design." },
  { title: "Use the Feynman technique to expose shallow understanding.", hint: "If you cannot explain it simply, you do not own it yet." },
  { title: "Create conditions for flow instead of waiting for it to appear.", hint: "Environment is often stronger than motivation." },
  { title: "Read to access other minds, not just other information.", hint: "Books let you borrow internal worlds, not just facts." },
  { title: "Classify habits as functional or dysfunctional.", hint: "Less morality, more clarity." },
  { title: "Eliminate distractions without negotiating with them.", hint: "Attention leaks rarely fix themselves." },
  { title: "Push your limits gradually until old ceilings feel imaginary.", hint: "Capacity expands when repeated honestly." },
  { title: "Return again and again to this moment.", hint: "The present is the only place where action can occur." },
  { title: "Separate what you can control from what you cannot.", hint: "Clarity reduces wasted emotional spending." },
  { title: "Use solitude, even shower thoughts, as clarity space.", hint: "Stillness can expose decisions you already know." },
] as const;

type Block = (typeof articleBlocks)[number];

function DeckWall({
  blocks,
  activeBlock,
  setActiveBlock,
}: {
  blocks: readonly Block[];
  activeBlock: string;
  setActiveBlock: (id: string) => void;
}) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const activeIndex = blocks.findIndex((b) => b.id === activeBlock);

  return (
    <div className="relative mx-auto w-full max-w-6xl [perspective:2200px]">
      <div className="relative min-h-[860px] md:min-h-[920px] lg:min-h-[980px]">
        {blocks.map((block, index) => {
          const isActive = activeBlock === block.id;
          const isHovered = hoveredCard === block.id;
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const clamped = Math.min(absOffset, 4);

          const rotateY = isActive ? 0 : offset < 0 ? -58 + clamped * 5 : 58 - clamped * 5;
          const rotateX = isActive ? 0 : offset < 0 ? 8 : -8;
          const translateX = isActive ? 0 : offset < 0 ? -260 - clamped * 38 : 260 + clamped * 38;
          const translateY = isActive ? 0 : clamped * 30;
          const translateZ = isActive ? 160 : 40 - clamped * 30;
          const scale = isActive ? 1 : 0.9 - clamped * 0.03;
          const opacity = isActive ? 1 : Math.max(0.22, 0.82 - clamped * 0.16);

          return (
            <motion.button
              key={block.id}
              type="button"
              onMouseEnter={() => setHoveredCard(block.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveBlock(block.id)}
              className="absolute left-1/2 top-0 block w-full max-w-[860px] -translate-x-1/2 cursor-pointer text-left focus:outline-none"
              initial={false}
              animate={{
                x: translateX,
                y: translateY,
                z: translateZ,
                rotateY,
                rotateX,
                scale: isHovered && !isActive ? scale + 0.02 : scale,
                opacity,
                filter: isActive ? "blur(0px)" : `blur(${Math.min(3, clamped)}px)`,
                zIndex: isActive ? 40 : 30 - clamped,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
              style={{ transformStyle: "preserve-3d", transformOrigin: offset < 0 ? "right center" : "left center" }}
            >
              <div className={`relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-[#09131d]/94 shadow-[0_35px_120px_rgba(0,0,0,0.45)] ${isActive ? "ring-1 ring-white/12" : ""}`}>
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${block.accent}`} />
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: isActive ? 1 : isHovered ? 0.75 : 0.45 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: isActive
                      ? "radial-gradient(circle at 22% 12%, rgba(255,255,255,0.11), transparent 24%), linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 24%)"
                      : "radial-gradient(circle at 22% 12%, rgba(255,255,255,0.05), transparent 24%)",
                  }}
                />
                <div className="relative z-10 grid min-h-[690px] gap-6 p-6 md:min-h-[720px] md:grid-cols-[1.08fr_0.92fr] md:p-8 lg:min-h-[760px] lg:p-10">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-xs uppercase tracking-[0.28em] text-white/38">{block.kicker}</div>
                        <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/45">
                          {isActive ? "Open card" : "Select card"}
                        </div>
                      </div>
                      <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">{block.title}</h2>
                      <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 md:text-lg">{block.lead}</p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50">timeless / cosmic / direct</div>
                      <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/50">{isActive ? "reading focus" : "waiting in the wall"}</div>
                    </div>
                  </div>
                  <div className="grid gap-4 content-start">
                    {block.body.map((paragraph, i) => (
                      <motion.div
                        key={paragraph}
                        initial={false}
                        animate={{ y: isActive ? 0 : i * 6, opacity: isActive ? 1 : 0.82, scale: isActive ? 1 : 0.985 }}
                        transition={{ duration: 0.28, delay: isActive ? i * 0.05 : 0 }}
                        className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
                      >
                        <div className="mb-4 flex items-center gap-2 text-white/35"><Circle className="h-3 w-3 fill-current" /><div className="h-px flex-1 bg-white/10" /></div>
                        <p className="text-sm leading-7 text-white/70 md:text-[15px]">{paragraph}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {blocks.map((block, index) => {
          const isActive = activeBlock === block.id;
          return (
            <button
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${isActive ? "border-white/28 bg-white/[0.12] text-white shadow-[0_0_30px_rgba(255,255,255,0.06)]" : "border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.07] hover:text-white"}`}
            >
              {String(index + 1).padStart(2, "0")} · {block.kicker}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TiltCard({ children, className = "", glow = true, onClick }: { children: ReactNode; className?: string; glow?: boolean; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.16), transparent 30%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.015, y: -3 }}
      transition={{ duration: 0.18 }}
      className={`relative ${className}`}
    >
      {glow ? <motion.div className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glowBg }} /> : null}
      <div style={{ transform: "translateZ(18px)" }} className="relative h-full">{children}</div>
    </motion.div>
  );
}

export default function InteractiveArticleVisualization() {
  const [activeBlock, setActiveBlock] = useState<string>(articleBlocks[0].id);
  const [activeTrap, setActiveTrap] = useState<string>(trapCards[0].id);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const activeTrapCard = useMemo(() => trapCards.find((card) => card.id === activeTrap) ?? trapCards[0], [activeTrap]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#061019] text-white [perspective:1400px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(89,168,255,0.12),transparent_20%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.02, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.75), transparent), radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.55), transparent), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.48), transparent)", backgroundRepeat: "repeat", backgroundSize: "1200px 800px" }}
      />
      <div className="absolute left-0 top-0 h-[34rem] w-[34rem] rounded-full bg-sky-400/10 blur-[140px]" />
      <div className="absolute right-[-8rem] top-[24rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/10 blur-[140px]" />

      <main className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
        <TiltCard className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] md:px-10 md:py-12">
          <motion.div className="absolute inset-0" animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0, transparent 28%), radial-gradient(circle at 80% 30%, rgba(255,200,120,0.12) 0, transparent 24%), radial-gradient(circle at 45% 70%, rgba(120,190,255,0.12) 0, transparent 28%)", backgroundSize: "180% 180%" }} />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/65"><Orbit className="h-3.5 w-3.5" />Article Experience</motion.div>
              <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl">No one is coming to save you.</motion.h1>
              <motion.p initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="mt-5 max-w-2xl text-base leading-7 text-white/72 md:text-lg">This is not a lesson. It is a mirror. The page should move like thought itself—arriving, resisting, revealing. Read slowly enough to notice where it recognizes you.</motion.p>
            </div>
            <TiltCard className="relative mx-auto w-full max-w-xl rounded-[2rem]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/[0.02] blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0a1724]/80 p-5 backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4"><div><div className="text-xs uppercase tracking-[0.25em] text-white/40">Reading pulse</div><div className="mt-2 text-xl font-medium">How the article should move</div></div><Flame className="h-5 w-5 text-white/60" /></div>
                <div className="mt-5 space-y-3">
                  {["Big emotional opening first", "Section clicks should scroll, not just highlight", "Hover should reveal meaning, not just change opacity", "Diagnostic tiles should morph when pressed", "The page should feel alive under the cursor"].map((item, index) => (
                    <motion.div key={item} initial={false} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.08 }} whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.06)" }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">{item}</motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </TiltCard>

        <section className="mt-10">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-white/40">Main article deck</div>
              <h2 className="mt-2 text-3xl font-semibold md:text-5xl">Stack the sections like a wall of thought.</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-white/66 md:text-lg">Each section is now a card in a 3D wall. The active one opens forward. The others stay angled like memory, waiting to be turned into focus.</p>
            </div>
            <div className="hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-6 text-white/58 lg:block">Click any card to bring it forward.<br />This should feel closer to a sculptural flipping book than a normal article column.</div>
          </div>
          <DeckWall blocks={articleBlocks} activeBlock={activeBlock} setActiveBlock={setActiveBlock} />
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <TiltCard className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4"><div><div className="text-xs uppercase tracking-[0.24em] text-white/40">Interactive diagnosis</div><h3 className="mt-2 text-3xl font-semibold">Press a mind trap and watch the article explain itself.</h3></div><Brain className="h-5 w-5 text-white/60" /></div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {trapCards.map((card) => {
                const active = card.id === activeTrap;
                return (
                  <motion.button key={card.id} layout onClick={() => setActiveTrap(card.id)} whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.985 }} className={`relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all ${active ? "border-white/30 bg-white/[0.1] text-white shadow-[0_0_40px_rgba(255,255,255,0.06)]" : "border-white/10 bg-white/[0.04] text-white/66 hover:bg-white/[0.07] hover:text-white"}`}>
                    <motion.div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" animate={{ opacity: active ? 1 : 0.35 }} />
                    <div className="relative flex items-start justify-between gap-4"><div><div className="text-sm font-medium">{card.title}</div><p className="mt-2 text-sm leading-6 text-white/58">{card.summary}</p></div><Layers3 className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-white/30"}`} /></div>
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTrapCard.id} initial={false} animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0, y: -12, filter: "blur(4px)", scale: 0.985 }} transition={{ duration: 0.28 }} className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#08131d]">
                <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent px-5 py-4"><div className="text-xs uppercase tracking-[0.24em] text-white/40">Selected pattern</div><div className="mt-2 text-2xl font-medium">{activeTrapCard.title}</div></div>
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]"><motion.div layout className="border-r border-white/10 p-5"><div className="text-xs uppercase tracking-[0.22em] text-white/35">How it feels</div><p className="mt-3 text-sm leading-7 text-white/68">{activeTrapCard.summary}</p></motion.div><motion.div layout className="p-5"><div className="flex items-start gap-3"><Quote className="mt-1 h-4 w-4 text-white/35" /><p className="text-sm leading-7 text-white/68">{activeTrapCard.detail}</p></div></motion.div></div>
              </motion.div>
            </AnimatePresence>
          </TiltCard>

          <TiltCard className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4"><div><div className="text-xs uppercase tracking-[0.24em] text-white/40">Practice layer</div><h3 className="mt-2 text-3xl font-semibold">The article should become more usable as you touch it.</h3></div><Focus className="h-5 w-5 text-white/60" /></div>
            <div className="mt-6 space-y-3">
              {practiceSteps.map((step, index) => {
                const active = hoveredStep === index;
                return (
                  <motion.div key={step.title} onHoverStart={() => setHoveredStep(index)} onHoverEnd={() => setHoveredStep(null)} initial={false} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4, delay: index * 0.03 }} className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08131d] px-4 py-4">
                    <motion.div className="absolute inset-y-0 left-0 w-1 rounded-full bg-white/60" animate={{ opacity: active ? 1 : 0.18, scaleY: active ? 1 : 0.45 }} transition={{ duration: 0.2 }} />
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent" animate={{ opacity: active ? 1 : 0 }} />
                    <div className="relative flex items-center justify-between gap-4 pl-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/32">Step {String(index + 1).padStart(2, "0")}</div>
                        <p className={`mt-1 text-sm leading-6 transition-colors ${active ? "text-white" : "text-white/66"}`}>{step.title}</p>
                        <AnimatePresence>{active ? <motion.p initial={false} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: 4 }} className="mt-2 overflow-hidden text-xs leading-6 text-white/46">{step.hint}</motion.p> : null}</AnimatePresence>
                      </div>
                      <motion.div animate={{ x: active ? 6 : 0, scale: active ? 1.05 : 1 }} transition={{ duration: 0.18 }}><ArrowRight className={`h-4 w-4 ${active ? "text-white" : "text-white/30"}`} /></motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TiltCard>
        </section>

        <TiltCard className="mt-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-6 py-10 md:px-10 md:py-14">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }} className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50"><Eye className="h-3.5 w-3.5" />Final echo</div>
            <h3 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">The ending should leave the reader with a quiet, irreversible shift.</h3>
            <p className="mt-5 text-lg leading-8 text-white/72">Not how impressive they look. Not how much approval they collect. Only this—can you sit alone with yourself and not feel like you are pretending?</p>
            <motion.div animate={{ y: [0, -4, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="mt-8 rounded-[2rem] border border-white/12 bg-[#08131d]/80 px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="text-xs uppercase tracking-[0.24em] text-white/38">Memorable line</div>
              <div className="mt-3 text-2xl font-medium md:text-4xl">To impress myself every day.</div>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-white/46"><MousePointer2 className="h-4 w-4" />Hover, press, scroll — the page should keep answering back.</div>
            </motion.div>
          </motion.div>
        </TiltCard>
      </main>
    </div>
  );
}
