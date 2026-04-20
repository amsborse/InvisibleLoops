import { principles } from "../data/principles";
import { useTheme } from "../hooks/useTheme";
import { FeatureCard } from "./FeatureCard";

export function PrinciplesSection() {
  const { currentTheme } = useTheme();

  return (
    <section id="principles" className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-6 lg:px-10 lg:pb-20" aria-labelledby="principles-heading">
      <div className="mb-12 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: currentTheme.colors.textSecondary }}>
            Design principles
          </div>
          <h2
            id="principles-heading"
            className="font-display mt-3 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.5rem]"
            style={{ color: currentTheme.colors.textPrimary }}
          >
            The platform should feel like interactive journalism meets a philosophy studio
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 lg:text-right" style={{ color: currentTheme.colors.textSecondary }}>
          Beautiful enough to remember. Clear enough to trust.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {principles.map((item) => (
          <FeatureCard key={item.id} title={item.title} text={item.text} icon={item.icon} />
        ))}
      </div>
    </section>
  );
}