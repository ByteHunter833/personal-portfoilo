import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/content/site";
import { Page, SectionTitle } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/Projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Shukrullo Kurbonov" },
      { name: "description", content: "Backend projects: an async FastAPI banking system, ApriSoil agricultural API, and a Flask store." },
      { property: "og:title", content: "Projects — Shukrullo Kurbonov" },
      { property: "og:description", content: "Backend projects built with FastAPI, Django REST Framework, PostgreSQL, Redis and Docker." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [featured, primary, ...supporting] = projects;
  return (
    <Page>
      <SectionTitle cmd="ls ~/projects" title="Projects">
        Each case study lists only confirmed facts, with a link to the source code.
      </SectionTitle>
      <div className="space-y-5">
        <ProjectCard project={featured} />
        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr]">
          <ProjectCard project={primary} />
          {supporting.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
    </Page>
  );
}
