import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { profile, projects } from "@/content/site";
import { ProjectCard } from "@/components/site/Projects";
import { BootSplash } from "@/components/site/BootSplash";
import { HeroTerminal } from "@/components/site/HeroTerminal";
import { Reveal } from "@/components/site/Reveal";
import { SocialLinks } from "@/components/site/SocialLinks";
import { Download, FileText } from "lucide-react";

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
  const [booted, setBooted] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-5">
      <BootSplash onFinish={() => setBooted(true)} />
      <section className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="hero-name">
        <div className="fade-up">
          <p className="font-mono text-sm text-success">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-success align-middle" aria-hidden />
            {profile.seeking}
          </p>
          <h1 id="hero-name" className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 font-mono text-lg text-primary">{profile.title}</p>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="glow-hover rounded-md border border-primary bg-primary px-5 py-2.5 font-medium text-primary-foreground active:scale-[0.98]"
            >
              Explore Projects
            </Link>
            {profile.resumeUrl && (
              <>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glow-hover inline-flex items-center gap-2 rounded-md border border-input px-5 py-2.5 font-medium hover:bg-elevated active:scale-[0.98]"
                >
                  <FileText aria-hidden className="h-4 w-4" />
                  View Resume
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="glow-hover inline-flex items-center gap-2 rounded-md border border-input px-5 py-2.5 font-medium hover:bg-elevated active:scale-[0.98]"
                >
                  <Download aria-hidden className="h-4 w-4" />
                  Download PDF
                </a>
              </>
            )}
          </div>
          <SocialLinks className="mt-6" />
        </div>
        <HeroTerminal start={booted} />
      </section>

      <section aria-labelledby="sel" className="pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 id="sel" className="text-2xl font-bold tracking-tight">Selected projects</h2>
          <Link to="/projects" className="group font-mono text-sm text-primary">
            ls projects/ <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <Reveal>
          <ProjectCard project={featured} />
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={80 * i}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
