import { createFileRoute, Link } from "@tanstack/react-router";
import { profile, projects } from "@/content/site";
import { TerminalWindow } from "@/components/site/Layout";
import { ProjectCard } from "@/components/site/Projects";
import { InteractiveTerminal } from "@/components/site/InteractiveTerminal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shukrullo Kurbonov — Backend-focused Software Engineer" },
      { name: "description", content: profile.tagline },
      { property: "og:title", content: "Shukrullo Kurbonov — Backend-focused Software Engineer" },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: Home,
});

function Home() {
  const [featured, ...rest] = projects;
  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]" aria-labelledby="hero-name">
        <div>
          <p className="font-mono text-sm text-success">{profile.seeking}</p>
          <h1 id="hero-name" className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 font-mono text-lg text-primary">{profile.title}</p>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Explore Projects
            </Link>
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-md border border-input px-5 py-2.5 font-medium transition-colors hover:bg-elevated">
              GitHub
            </a>
          </div>
        </div>
        <TerminalWindow title="shukrullo@ubuntu: ~">
          <p><span className="text-primary">$</span> whoami</p>
          <p className="mb-4">{profile.name}</p>
          <p><span className="text-primary">$</span> cat focus.txt</p>
          <p className="text-success">{profile.focus.join(" · ")}</p>
        </TerminalWindow>
      </section>

      <section aria-labelledby="sel" className="pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="sel" className="text-2xl font-bold tracking-tight">Selected projects</h2>
          <Link to="/projects" className="font-mono text-sm text-primary">ls projects/ →</Link>
        </div>
        <ProjectCard project={featured} />
        <div className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section aria-label="Interactive terminal" className="pb-20">
        <InteractiveTerminal />
      </section>
    </div>
  );
}
