import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getProject } from "@/content/site";
import { Page, Tag } from "@/components/site/Layout";
import { ArchitectureDiagram } from "@/components/site/Projects";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — Shukrullo Kurbonov` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.name} — Shukrullo Kurbonov` },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ProjectDetail,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">#</span> {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  return (
    <Page>
      <Link to="/projects" className="font-mono text-sm text-muted-foreground hover:text-foreground">← cd ..</Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{p.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">{p.technologies.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={p.repo} target="_blank" rel="noreferrer" className="glow-hover rounded-md border border-primary bg-primary px-5 py-2.5 font-medium text-primary-foreground active:scale-[0.98]">
          View source on GitHub
        </a>
        {p.demo && <a href={p.demo} className="rounded-md border border-input px-5 py-2.5">Live demo</a>}
      </div>

      <div className="mt-12">
        {p.purpose && p.purpose !== p.summary && <Section title="Problem & purpose"><p>{p.purpose}</p></Section>}
        {p.contribution && <Section title="My contribution"><p>{p.contribution}</p></Section>}
        <Section title="Reported features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex gap-2"><span className="font-mono text-success">›</span>{f}</li>
            ))}
          </ul>
          {p.note && <p className="mt-5 rounded border-l-2 border-primary bg-card px-4 py-3 text-sm text-muted-foreground">{p.note}</p>}
        </Section>
        {p.architecture && <Section title="Architecture"><ArchitectureDiagram arch={p.architecture} /></Section>}
        {p.decision && (
          <Section title="Technical decision">
            <h3 className="font-bold">{p.decision.title}</h3>
            <p className="mt-2 text-muted-foreground">{p.decision.tradeoffs}</p>
          </Section>
        )}
        {(p.verification || p.limitations) && (
          <Section title="Verification & known limitations">
            {p.verification && <p>{p.verification}</p>}
            {p.limitations && <p className="mt-2 text-muted-foreground">{p.limitations}</p>}
          </Section>
        )}
      </div>
    </Page>
  );
}
