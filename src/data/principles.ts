import type { LucideIcon } from "lucide-react";
import { Eye, Layers3, Sparkles } from "lucide-react";

export type Principle = {
  id: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const principles: Principle[] = [
  {
    id: "unfold",
    title: "The article should not sit there. It should unfold.",
    text: "This platform treats writing like guided perception. Each section pairs clean editorial typography with motion that explains the idea before the reader finishes the paragraph.",
    icon: Eye,
  },
  {
    id: "meaning",
    title: "Visuals must carry meaning, not decoration.",
    text: "Diagrams, causal chains, and ambient motion should reduce mental load. Every animation earns its place by making invisible structure visible.",
    icon: Layers3,
  },
  {
    id: "premium",
    title: "The page should feel premium at rest and alive in motion.",
    text: "Soft gradients, quiet depth, deliberate spacing, and restrained animation. More studio quality. Less startup dashboard cosplay.",
    icon: Sparkles,
  },
];
