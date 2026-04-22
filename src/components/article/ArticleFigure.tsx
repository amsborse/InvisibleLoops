import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useState } from "react";
import { Maximize2, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type ArticleFigureProps = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Medium-style figure: full column width, rounded frame, optional caption,
 * click (or “View full size”) opens a lightbox like Medium’s “view image in full size”.
 */
export function ArticleFigure({ src, alt, caption }: ArticleFigureProps) {
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const id = useId();
  const titleId = `${id}-title`;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <figure
      className="group/fig my-8 w-full sm:my-10"
      aria-label={caption ? undefined : "Illustration"}
    >
      <div
        className="overflow-hidden rounded-2xl border transition-[box-shadow,transform] duration-500 ease-out"
        style={{
          borderColor: "color-mix(in srgb, var(--border-strong) 80%, var(--border))",
          background: "color-mix(in srgb, var(--panel) 40%, var(--bg))",
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--border) 50%, transparent), 0 24px 60px -40px rgba(0,0,0,0.45)",
        }}
      >
        {loadError ? (
          <div
            className="flex min-h-[200px] flex-col items-center justify-center gap-2 px-4 py-12 text-center text-sm"
            style={{ color: "var(--text-tertiary)" }}
          >
            <p className="font-medium" style={{ color: "var(--text-secondary)" }}>
              Image not found
            </p>
            <p className="text-xs leading-relaxed">
              Add the file to <code className="rounded bg-[var(--panel-hover)] px-1.5 py-0.5 font-mono text-[11px]">{src}</code>
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative block w-full cursor-zoom-in text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[color:var(--accent-ring)]"
            aria-describedby={caption ? titleId : undefined}
            aria-label={`View full size: ${alt}`}
          >
            <img
              src={src}
              alt={alt}
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-auto w-full max-h-[min(70vh,900px)] object-cover sm:object-center"
              onError={() => setLoadError(true)}
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/fig:opacity-100"
              aria-hidden
            />
            <span
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 group-hover/fig:opacity-100"
              style={{
                borderColor: "color-mix(in srgb, var(--border) 60%, white)",
                background: "color-mix(in srgb, var(--bg) 55%, transparent)",
                color: "var(--text-primary)",
              }}
            >
              <Maximize2 className="h-3.5 w-3.5" aria-hidden />
              Full size
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption
          id={titleId}
          className="mx-auto mt-3 max-w-2xl text-center text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--text-tertiary)" }}
        >
          {caption}
        </figcaption>
      ) : (
        <figcaption className="sr-only">
          {alt} — {open ? "Press Escape to close full size" : "Click image to open full size"}
        </figcaption>
      )}

      <AnimatePresence>
        {open && !loadError ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={close}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border text-white outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.4)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              className="relative z-[1] max-h-[90vh] max-w-[min(100%,1200px)] p-0"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[90vh] w-full rounded-lg object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </figure>
  );
}
