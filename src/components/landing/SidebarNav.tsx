import { motion } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarTabs } from "../../data/sidebarTabs";
import { PremiumInteractiveNavRail } from "../navigation";
import { TabButton } from "./TabButton";

function activeSidebarItemIndex(pathname: string): number {
  const n = pathname.replace(/\/$/, "") || "/";
  for (let i = 0; i < sidebarTabs.length; i += 1) {
    const t = sidebarTabs[i]!;
    if (t.path === "/") {
      if (n === "/") return i;
    } else if (n === t.path || n.startsWith(`${t.path}/`)) {
      return i;
    }
  }
  return 0;
}

const DESKTOP_ITEM_HEIGHT = 82;

export function SidebarNav() {
  const location = useLocation();
  const desktopItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = activeSidebarItemIndex(location.pathname);

  useEffect(() => {
    let alive = true;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!alive) return;
        const idx = activeSidebarItemIndex(location.pathname);
        const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const behavior: ScrollBehavior = prefersReduce ? "auto" : "smooth";
        desktopItemRefs.current[idx]?.scrollIntoView({ behavior, block: "nearest", inline: "nearest" });
        mobileItemRefs.current[idx]?.scrollIntoView({ behavior, block: "nearest", inline: "center" });
      });
    });
    return () => {
      alive = false;
      cancelAnimationFrame(id);
    };
  }, [location.pathname]);

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

        <div className="relative z-10 mt-5 min-h-0 flex-1">
          <nav className="relative" role="tablist" aria-orientation="vertical" aria-label="Primary sections">
            <PremiumInteractiveNavRail
              items={sidebarTabs}
              activeIndex={activeIndex}
              itemHeight={DESKTOP_ITEM_HEIGHT}
              itemCenterOffset={36}
              className="space-y-3"
              railClassName="left-0 h-[4.5rem] w-full rounded-2xl"
              renderItem={({ item: tab, index: i, isActive, pull }) => {
                const Icon = tab.icon;
                const number = String(i + 1).padStart(2, "0");
                return (
                  <div
                    key={tab.id}
                    ref={(el) => {
                      desktopItemRefs.current[i] = el;
                    }}
                    className="min-w-0 shrink-0"
                  >
                    <Link
                      to={tab.path}
                      role="tab"
                      className="group relative block h-[4.5rem] w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-ring)]"
                    >
                      <motion.span
                        className="relative z-10 grid h-[4.5rem] w-full grid-cols-[36px_42px_1fr] items-center gap-3 rounded-2xl pl-1.5 pr-2 text-left"
                        animate={{
                          scale: isActive ? 1.02 : 1 + pull * 0.012,
                          x: isActive ? 5 : pull * 3,
                          opacity: isActive ? 1 : 0.56 + pull * 0.26,
                        }}
                        whileHover={{ x: isActive ? 6 : 4, opacity: 0.93 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      >
                        <motion.span
                          animate={{ color: isActive ? "var(--text-primary)" : "var(--text-tertiary)" }}
                          className="text-xs font-bold tabular-nums"
                          aria-hidden
                        >
                          {number}
                        </motion.span>
                        <motion.span
                          animate={{
                            borderColor: isActive
                              ? "color-mix(in srgb, var(--accent) 46%, var(--border))"
                              : "var(--border)",
                            backgroundColor: isActive
                              ? "color-mix(in srgb, var(--panel) 92%, #0f132c)"
                              : "var(--panel-hover)",
                            boxShadow: isActive
                              ? "0 8px 22px color-mix(in srgb, var(--accent-glow) 28%, transparent), inset 0 1px 0 color-mix(in srgb, var(--highlight) 55%, transparent)"
                              : "inset 0 1px 0 color-mix(in srgb, var(--highlight) 40%, transparent)",
                          }}
                          className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                        >
                          <Icon
                            className={[
                              "h-5 w-5 transition-colors duration-300",
                              isActive ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-tertiary)]",
                            ].join(" ")}
                            aria-hidden
                          />
                        </motion.span>
                        <span className="min-w-0">
                          <motion.span
                            animate={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
                            className="block text-[15px] font-bold tracking-tight"
                          >
                            {tab.label}
                          </motion.span>
                          <motion.span
                            animate={{ color: isActive ? "var(--text-tertiary)" : "var(--text-muted)" }}
                            className="mt-0.5 block max-w-[178px] text-[11px] leading-4"
                          >
                            {tab.description}
                          </motion.span>
                        </span>
                      </motion.span>
                    </Link>
                  </div>
                );
              }}
            />
          </nav>
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
          <div
            key={tab.id}
            ref={(el) => {
              mobileItemRefs.current[i] = el;
            }}
            className="shrink-0"
          >
            <TabButton
              index={i + 1}
              icon={tab.icon}
              label={tab.label}
              to={tab.path}
              end={tab.path === "/"}
              orientation="horizontal"
              layoutId="tab-active-glow-mobile"
            />
          </div>
        ))}
      </div>
    </>
  );
}
