import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { TopBar } from "./TopBar";

const EASE = [0.22, 1, 0.36, 1] as const;

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
          className="relative min-w-0 flex-1 overflow-hidden rounded-[2rem] border backdrop-blur-xl"
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

          <TopBar />

          <div className="px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-14 lg:pb-20 lg:pt-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 14, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.995 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
