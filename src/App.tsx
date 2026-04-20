import InteractiveArticleVisualization from "./pages/InteractiveArticleVisualization";
import InvisibleLoopsLanding from "./pages/InvisibleLoopsLanding";

function getRoute() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  if (path === "/article-1") return "article-1" as const;
  return "home" as const;
}

export default function App() {
  const route = getRoute();

  if (route === "article-1") {
    return <InteractiveArticleVisualization />;
  }

  return <InvisibleLoopsLanding />;
}