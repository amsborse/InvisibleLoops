import { LayoutGroup } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import { sidebarTabs } from "../../data/sidebarTabs";
import { TabButton } from "./TabButton";

export function SidebarNav() {
  return (
    <>
      <aside
        role="tablist"
        aria-orientation="vertical"
        aria-label="Site navigation"
        className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 flex-col overflow-y-auto overflow-x-hidden rounded-2xl border p-5 backdrop-blur-md lg:flex"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(170deg, color-mix(in srgb, var(--panel) 95%, var(--bg)), color-mix(in srgb, var(--bg) 75%, #070910))",
          boxShadow: "var(--shadow-sidebar)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: "radial-gradient(90% 45% at 0% 0%, color-mix(in srgb, var(--glow-a) 35%, transparent), transparent 50%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-3 px-1 pb-5">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
            style={{
              borderColor: "var(--border-strong)",
              background: "var(--panel-hover)",
            }}
          >
            <InfinityIcon className="h-5 w-5" aria-hidden style={{ color: "var(--accent)" }} />
          </span>
          <div className="min-w-0">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.28em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              Invisible Loops
            </p>
            <p className="truncate text-sm font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Idea platform
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <h2
            className="text-[10px] font-bold uppercase tracking-[0.32em] sm:text-[11px] sm:tracking-[0.3em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Navigate
          </h2>
          <p
            className="mt-1.5 text-[12px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Home, writing, and studio pages — pick a destination.
          </p>
        </div>

        <div className="relative z-10 mt-5 flex-1">
          <LayoutGroup id="sidebar-nav">
            <nav className="relative z-[1] flex flex-col gap-1.5">
              {sidebarTabs.map((tab, i) => (
                <TabButton
                  key={tab.id}
                  index={i + 1}
                  icon={tab.icon}
                  label={tab.label}
                  description={tab.description}
                  to={tab.path}
                  end={tab.path === "/"}
                  layoutId="tab-active-glow-desktop"
                />
              ))}
            </nav>
          </LayoutGroup>
        </div>

        <div
          className="relative z-10 mt-4 rounded-2xl border p-3.5"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--panel-hover) 50%, transparent)",
            boxShadow: "inset 0 1px 0 var(--highlight)",
          }}
        >
          <p
            className="text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "var(--text-tertiary)" }}
          >
            Now
          </p>
          <p
            className="mt-2 text-[12px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Shaping a reading system where ideas unfold visually, scene by scene.
          </p>
        </div>
      </aside>

      <div
        role="tablist"
        aria-orientation="horizontal"
        aria-label="Site navigation"
        className="sticky top-3 z-20 flex gap-1.5 overflow-x-auto rounded-2xl border p-1.5 backdrop-blur-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
        style={{
          borderColor: "var(--border)",
          background: "var(--panel-strong)",
        }}
      >
        {sidebarTabs.map((tab, i) => (
          <TabButton
            key={tab.id}
            index={i + 1}
            icon={tab.icon}
            label={tab.label}
            to={tab.path}
            end={tab.path === "/"}
            orientation="horizontal"
            layoutId="tab-active-glow-mobile"
          />
        ))}
      </div>
    </>
  );
}
