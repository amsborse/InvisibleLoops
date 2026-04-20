import { Copy } from "lucide-react";

export function CodePreviewCard() {
  return (
    <div
      className="mt-7 rounded-2xl border p-4"
      style={{
        background: "linear-gradient(180deg, rgba(7,12,24,0.92), rgba(7,12,24,0.72))",
        borderColor: "rgba(148,163,184,0.16)",
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300/90" style={{ borderColor: "rgba(148,163,184,0.2)" }}>
          TSX
        </span>
        <button
          type="button"
          aria-label="Copy code"
          className="rounded-md border p-1.5 text-slate-300/90 transition hover:text-white"
          style={{ borderColor: "rgba(148,163,184,0.2)" }}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>

      <pre className="overflow-x-auto text-[12px] leading-6">
        <code>
          <span className="text-fuchsia-300">export</span> <span className="text-sky-300">function</span> <span className="text-violet-200">InfinityGraphic</span>() {'{'}{"\n"}
          {'  '}<span className="text-slate-400">const</span> <span className="text-cyan-300">trails</span> = <span className="text-emerald-300">useMemo</span>(() =&gt; {'{'}{"\n"}
          {'    '}<span className="text-slate-400">return</span> [<span className="text-fuchsia-300">forward</span>, <span className="text-sky-300">reverse</span>, <span className="text-cyan-300">floating</span>];{"\n"}
          {'  '}{'}'}, []);{"\n\n"}
          {'  '}<span className="text-slate-400">return</span> {'<svg ...>{/* trails, dots, particles */}</svg>'};{"\n"}
          {'}'}
        </code>
      </pre>
    </div>
  );
}