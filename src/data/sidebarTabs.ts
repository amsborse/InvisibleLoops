import type { LucideIcon } from "lucide-react";
import { BookOpen, Home, Layers, NotebookPen, Sparkles } from "lucide-react";

export type SidebarTabId = "home" | "articles" | "projects" | "notes" | "about";

export type SidebarTab = {
  id: SidebarTabId;
  label: string;
  description: string;
  icon: LucideIcon;
  path: string;
};

export const sidebarTabs: SidebarTab[] = [
  {
    id: "home",
    label: "Home",
    description: "The entry point — what this studio is building.",
    icon: Home,
    path: "/",
  },
  {
    id: "articles",
    label: "Articles",
    description: "Long-form ideas, rendered as experiences.",
    icon: BookOpen,
    path: "/articles",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Systems, experiments, crafted interfaces.",
    icon: Layers,
    path: "/projects",
  },
  {
    id: "notes",
    label: "Notes",
    description: "Working thoughts and fragments in progress.",
    icon: NotebookPen,
    path: "/notes",
  },
  {
    id: "about",
    label: "About",
    description: "The intent behind the studio.",
    icon: Sparkles,
    path: "/about",
  },
];
