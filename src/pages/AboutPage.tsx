import { Sparkles } from "lucide-react";
import { EmptyStateView } from "../components/landing/EmptyStateView";

export default function AboutPage() {
  return (
    <EmptyStateView
      icon={Sparkles}
      eyebrow="About"
      title="A studio for ideas that deserve to be seen."
      description="Invisible Loops is a small, deliberate studio building calm, cinematic tools for thinkers. A longer story will live here soon."
      cta={{ label: "Read the manifesto" }}
    />
  );
}
