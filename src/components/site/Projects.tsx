import { Link } from "@tanstack/react-router";
import type { Project } from "@/content/site";
import { Tag } from "./Layout";

export function ProjectCard({ project }: { project: Project }) {
  const featured = project.tier === "featured";
  const small = project.tier === "supporting";
  return (
    <article
      className={`group relative flex flex-col rounded-lg border bg-card transition-colors hover:border-primary/60 ${
        featured ? "border-primary/40 p-7 sm:p-9" : small ? "border-border p-5" : "border-border p-6"
      }`}
    >
      {featured && <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">Featured project</p>}
      {small && <p className="mb-2 font-mono text-xs text-muted-foreground">Supporting project</p>}
      <h3 className={`font-bold tracking-tight ${featured ? "text-2xl sm:text-3xl" : small ? "text-lg" : "text-xl"}`}>
        <Link to="/projects/$slug" params={{ slug: project.slug }} className="after:absolute after:inset-0">
          {project.name}
        </Link>
      </h3>
      <p className="mt-3 text-muted-foreground">{project.summary}</p>
      {featured && (
        <ul className="mt-5 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2"><span className="font-mono text-success">›</span>{f}</li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <div className="relative z-10 mt-6 flex gap-4 font-mono text-sm">
        <span className="text-primary group-hover:underline">Case study →</span>
        <a href={project.repo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
          Source
        </a>
      </div>
    </article>
  );
}

export function ArchitectureDiagram({ arch }: { arch: NonNullable<Project["architecture"]> }) {
  return (
    <figure>
      <div className="rounded-lg border border-dashed border-border p-5">
        {arch.runtime && <p className="mb-4 font-mono text-xs text-muted-foreground">runtime: {arch.runtime}</p>}
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <Box node={arch.entry} accent />
          <span aria-hidden className="text-center font-mono text-primary sm:px-2">→</span>
          <div className="flex flex-1 flex-col gap-3">
            {arch.services.map((s) => <Box key={s.label} node={s} />)}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">
        Shows only confirmed components; not a full schema or route map.
      </figcaption>
    </figure>
  );
}

function Box({ node, accent }: { node: { label: string; note?: string }; accent?: boolean }) {
  return (
    <div className={`flex-1 rounded border bg-elevated px-4 py-3 ${accent ? "border-primary/50" : "border-border"}`}>
      <p className="font-mono text-sm font-bold">{node.label}</p>
      {node.note && <p className="font-mono text-xs text-muted-foreground">{node.note}</p>}
    </div>
  );
}
