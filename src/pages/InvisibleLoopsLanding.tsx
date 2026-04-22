import { Link } from "react-router-dom";
import { CTASection } from "../components/CTASection";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { PrinciplesSection } from "../components/PrinciplesSection";
import { PrototypePreview } from "../components/PrototypePreview";
import { ScrollProgress } from "../components/ScrollProgress";
import { SiteBackground } from "../components/SiteBackground";
import { PREMIUM_ARTICLE_HREF } from "../data/premiumArticle";
import { useTheme } from "../hooks/useTheme";

export default function InvisibleLoopsLanding() {
  const { currentTheme } = useTheme();

  return (
    <div
      id="top"
      className="min-h-screen transition-[background-color,color]"
      style={{
        background: currentTheme.colors.bgPrimary,
        color: currentTheme.colors.textPrimary,
        transitionDuration: `${currentTheme.motion.medium}s`,
      }}
    >
      <ScrollProgress />
      <SiteBackground />
      <Header />

      <main>
        <Hero />

        <section className="mx-auto max-w-7xl px-5 pt-2 sm:px-6 lg:px-10">
          <Link
            to={PREMIUM_ARTICLE_HREF}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all hover:-translate-y-0.5"
            style={{
              borderColor: currentTheme.colors.border,
              background: currentTheme.colors.surfaceStrong,
              color: currentTheme.colors.textPrimary,
              boxShadow: `0 12px 28px -20px ${currentTheme.colors.shadowColor}`,
            }}
          >
            Read First Article
          </Link>
        </section>

        <PrototypePreview />
        <PrinciplesSection />
        <CTASection />
      </main>
    </div>
  );
}