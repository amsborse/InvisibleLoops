import { NotebookPen } from "lucide-react";
import { EmptyStateView } from "../components/landing/EmptyStateView";

export default function NotesPage() {
  return (
    <EmptyStateView
      icon={NotebookPen}
      eyebrow="Notes"
      title="A notebook in the making."
      description="Rough sketches, half-thoughts, and working observations will live here. Still deciding what deserves to leave the margins."
      cta={{ label: "Notify me when notes open" }}
    />
  );
}
