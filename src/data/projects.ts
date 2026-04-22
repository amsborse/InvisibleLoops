import { PREMIUM_ARTICLE_HREF } from "./premiumArticle";

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  status: "Live" | "In progress" | "Research";
  accent: "indigo" | "violet" | "cyan" | "emerald";
  href?: string;
};

export const projects: Project[] = [
  {
    id: "invisible-thinking-loops",
    title: "Invisible Thinking Loops",
    category: "Cognition system",
    description:
      "A visual reading experience that turns long-form ideas into guided, cinematic scenes instead of static essays.",
    status: "Live",
    accent: "indigo",
    href: PREMIUM_ARTICLE_HREF,
  },
  {
    id: "karma-simulator",
    title: "Karma Simulator",
    category: "Behavioral sandbox",
    description:
      "A simulation that makes cause-and-effect visible. Small choices ripple forward into long arcs of consequence.",
    status: "In progress",
    accent: "violet",
  },
  {
    id: "thought-loop-explorer",
    title: "Thought Loop Explorer",
    category: "Introspection tool",
    description:
      "Map the recurring patterns of your mind. Surface the loop, name it, and design the interrupt.",
    status: "Research",
    accent: "cyan",
  },
  {
    id: "spend-analyzer",
    title: "Spend Analyzer",
    category: "Personal finance",
    description:
      "A quiet, opinionated view of how money moves through your life — built for clarity, not dopamine.",
    status: "In progress",
    accent: "emerald",
  },
];
