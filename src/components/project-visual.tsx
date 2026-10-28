import type { Project } from "@/data/projects";
import { asset } from "@/data/site";
import {
  ArrowUpRight,
  Boxes,
  GraduationCap,
  Code2,
  Layers,
} from "lucide-react";
export function ProjectVisual({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const Icon =
    project.slug === "cambridge-school"
      ? GraduationCap
      : project.slug === "hafiz-auto"
        ? Boxes
        : project.slug === "api-documentation"
          ? Code2
          : Layers;
  return (
    <div
      className={`project-visual ${large ? "large" : ""}`}
      style={{ "--tint": project.tint } as React.CSSProperties}
    >
      {project.image ? (
        <div className="browser-frame">
          <div className="browser-top">
            <i />
            <i />
            <i />
            <span>API Documentation Portal</span>
          </div>
          <img
            src={asset(project.image)}
            alt="API Documentation Portal showing schema-generated request fields and API documentation"
            loading="lazy"
            width={1280}
            height={720}
          />
        </div>
      ) : (
        <div className="architecture-art">
          <div className="art-orbit" />
          <div className="art-icon">
            <Icon size={52} strokeWidth={1} />
          </div>
          <div className="art-nodes">
            {project.flow.slice(0, 3).map((item, i) => (
              <div key={item}>
                <span className="node-dot" />
                {item}
                {i === 0 && <ArrowUpRight size={15} />}
              </div>
            ))}
          </div>
          <span className="art-label mono">Workflow illustration</span>
        </div>
      )}
    </div>
  );
}
