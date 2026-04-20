import { CircleDashed, MoonStar, Orbit, Sparkles } from "lucide-react";
import { CodePreviewCard } from "./CodePreviewCard";

const bullets = [
  {
    title: "3 Trails",
    text: "Forward, Reverse, Floating",
    icon: Orbit,
  },
  {
    title: "Particles",
    text: "Subtle and airy",
    icon: CircleDashed,
  },
  {
    title: "Seamless",
    text: "No visible start/end",
    icon: Sparkles,
  },
  {
    title: "Dual Mode",
    text: "Dark & Light themes",
    icon: MoonStar,
  },
] as const;

export function InfoPanel() {
  return (
    <aside
      className="rounded-[1.65rem] border p-6 sm:p-7"
      style={{
        background: "linear-gradient(180deg, rgba(5,10,22,0.96), rgba(5,10,22,0.8))",
        borderColor: "rgba(148,163,184,0.16)",
        boxShadow: "0 30px 80px -48px rgba(0,0,0,0.62), inset 0 1px 0 rgba(148,163,184,0.09)",
      }}
    >
      <h2 className="text-xl font-semibold uppercase tracking-[0.12em] text-slate-100 sm:text-2xl">
        Infinity Loop - 3 Trails Reference
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-300/90">
        Three infinite trails moving at different speeds and directions. One forward, one reverse, one subtle floating variation. Premium glow, soft particles, and seamless motion.
      </p>

      <div className="mt-6 space-y-4">
        {bullets.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-1 rounded-full border p-2" style={{ borderColor: "rgba(148,163,184,0.2)", background: "rgba(14,20,35,0.55)" }}>
                <Icon className="h-4 w-4 text-cyan-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-100">{item.title}</div>
                <div className="text-sm text-slate-400">{item.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <CodePreviewCard />
    </aside>
  );
}