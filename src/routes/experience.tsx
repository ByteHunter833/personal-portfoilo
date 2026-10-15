import { createFileRoute } from "@tanstack/react-router";
import { experience } from "@/content/site";
import { Page, SectionTitle } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Shukrullo Kurbonov" },
      { name: "description", content: "Flutter Developer at Brain Solutions MMC, Baku — REST API integration in a Clean Architecture codebase." },
      { property: "og:title", content: "Experience — Shukrullo Kurbonov" },
      { property: "og:description", content: "Professional experience integrating REST APIs at Brain Solutions MMC." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <Page>
      <SectionTitle cmd="cat experience.log" title="Experience" />
      <ol className="space-y-6">
        {experience.map((e, i) => (
          <li key={e.company}>
            <Reveal delay={i * 80}>
              <div className="glow-hover rounded-lg border border-border bg-card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-xl font-bold">{e.role} <span className="text-muted-foreground">— {e.company}</span></h2>
                  <p className="font-mono text-sm text-primary">{e.period}</p>
                </div>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{e.location}</p>
                <p className="mt-4">{e.description}</p>
                <p className="mt-3 text-muted-foreground">{e.relevance}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Page>
  );
}
