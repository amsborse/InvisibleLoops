import { Outlet, useLocation } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";

export function Layout() {
  const location = useLocation();

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
    >
      {/* Ambient theme-aware glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 15% 0%, var(--glow-a), transparent 60%), radial-gradient(50% 40% at 90% 10%, var(--glow-b), transparent 65%), radial-gradient(55% 45% at 80% 90%, var(--glow-c), transparent 65%)",
        }}
      />
      {/* Fine noise / grain veil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(var(--grain) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[96rem] gap-8 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <SidebarNav />

        <main
          id="main"
          className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto rounded-[2rem] border backdrop-blur-xl"
          style={{
            borderColor: "var(--border)",
            background: "var(--panel-gradient)",
            boxShadow: "var(--shadow-panel)",
          }}
        >
          {/* Thin top light line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--border-hover), transparent)",
            }}
          />

          <div className="shrink-0">
            <TopBar />
          </div>

          <div className="min-h-0 flex-1 px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-14 lg:pb-20 lg:pt-12">
            {/* Remount on navigate; Framer AnimatePresence around Outlet could leave opacity 0 in dev. */}
            <div key={location.pathname} className="w-full min-w-0">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
