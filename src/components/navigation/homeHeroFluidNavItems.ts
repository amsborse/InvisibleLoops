import { PREMIUM_ARTICLE_HREF } from "../../data/premiumArticle";
import type { FluidNavItem } from "./FluidNavRail";

/** Default “where next” links for the home hero. Reuse or fork for other pages. */
export const homeHeroFluidNavItems: readonly FluidNavItem[] = [
  {
    to: "/articles",
    label: "Reading system",
    sub: "Scenes & previews",
    isActive: (p) => p === "/articles" || p.startsWith("/articles/"),
  },
  {
    to: PREMIUM_ARTICLE_HREF,
    label: "First essay",
    sub: "Long read",
    isActive: (p) => p === "/article" || p === "/article-1",
  },
  {
    to: "/about",
    label: "About",
    sub: "Intent & context",
  },
  {
    to: "/projects",
    label: "Projects",
    sub: "Systems & craft",
  },
];
