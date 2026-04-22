import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-7">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
