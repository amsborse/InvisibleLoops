export type ArticleScene = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
};

export const articleScenes: ArticleScene[] = [
  {
    id: "opening",
    eyebrow: "Opening Realization",
    title: "No one is coming to save you.",
    body: "Not as punishment. As power. The moment help stops being your fantasy, agency becomes your craft.",
  },
  {
    id: "observer",
    eyebrow: "Observer Mode",
    title: "See your life like a pattern, not a blur.",
    body: "Thought. Feeling. Action. Instead of drowning in experience, step half a pace back and watch the sequence form.",
  },
  {
    id: "causality",
    eyebrow: "Root Cause",
    title: "Most people treat symptoms and then wonder why life loops.",
    body: "You feel Y and react with Z, but the real move is tracing the chain back to X and cutting the source.",
  },
  {
    id: "character",
    eyebrow: "Character",
    title: "A meaningful life is built from qualities, not possessions.",
    body: "Clarity. Discipline. Courage. Presence. Build those, and the rest becomes side effect instead of obsession.",
  },
];
