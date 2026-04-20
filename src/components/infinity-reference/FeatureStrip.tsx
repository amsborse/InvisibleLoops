import { CircleDot, Orbit, RefreshCcw, Sparkles } from "lucide-react";

const items = [
  { title: "Forward Trail", text: "Smooth forward motion", icon: Orbit },
  { title: "Reverse Trail", text: "Moves in reverse direction", icon: RefreshCcw },
  { title: "Floating Trail", text: "Subtle variation randomized speed", icon: CircleDot },
  { title: "Particles", text: "Soft particles follow the flow", icon: Sparkles },
] as const;

export function FeatureStrip() {
  return (
    <section
      className="grid overflow-hidden rounded-[1.4rem] border sm:grid-cols-2 lg:grid-cols-4"
      style={{
        background: "linear-gradient(180deg, rgba(5,10,22,0.94), rgba(5,10,22,0.78))",
        borderColor: "rgba(148,163,184,0.16)",
      }}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const withDivider = idx !== items.length - 1;

        return (
          <div
            key={item.title}
            className="p-5 sm:p-6"
            style={{
              borderRight: withDivider ? "1px solid rgba(148,163,184,0.12)" : "none",
              borderBottom: idx < 2 ? "1px solid rgba(148,163,184,0.12)" : "none",
            }}
          >
            <Icon className="h-5 w-5 text-cyan-300" />
            <div className="mt-3 text-sm font-semibold text-slate-100">{item.title}</div>
            <div className="mt-1 text-sm text-slate-400">{item.text}</div>
          </div>
        );
      })}
    </section>
  );
}