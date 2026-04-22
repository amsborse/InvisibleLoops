import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/landing/Layout";
import AboutPage from "./pages/AboutPage";
import ArticlesPage from "./pages/ArticlesPage";
import HomePage from "./pages/HomePage";
import InteractiveArticleVisualization from "./pages/InteractiveArticleVisualization";
import PremiumArticlePage from "./pages/PremiumArticlePage";
import InvisibleLoopsLanding from "./pages/InvisibleLoopsLanding";
import NotesPage from "./pages/NotesPage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Full-screen reading experience — outside the sidebar layout */}
        <Route path="/article" element={<PremiumArticlePage />} />
        <Route path="/article-1" element={<PremiumArticlePage />} />
        <Route path="/article-legacy" element={<InteractiveArticleVisualization />} />

        {/* Preserved legacy landing for reference */}
        <Route path="/legacy" element={<InvisibleLoopsLanding />} />

        {/* Shared sidebar shell */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
