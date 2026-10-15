import { createFileRoute } from "@tanstack/react-router";
import { education, languages, profile } from "@/content/site";
import { Page, SectionTitle } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shukrullo Kurbonov" },
      { name: "description", content: "IT / Computer Engineering student at Bukhara State University, based in Bukhara, Uzbekistan." },
      { property: "og:title", content: "About — Shukrullo Kurbonov" },
      { property: "og:description", content: "Education, exchange semester at Baku Higher Oil School, and languages." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Page>
      <SectionTitle cmd="cat about.md" title="About">
        Backend-focused engineer based in {profile.location}. {profile.seeking}.
      </SectionTitle>
      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        <section className="rounded-lg border border-border bg-card p-6 sm:p-8" aria-labelledby="edu">
          <h2 id="edu" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Education</h2>
          <h3 className="mt-4 text-xl font-bold">{education.university}</h3>
          <p className="mt-1">{education.field}</p>
          <p className="mt-1 font-mono text-sm text-primary">{education.graduation}</p>
          <div className="mt-6 border-l-2 border-primary pl-4">
            <p className="font-mono text-xs text-muted-foreground">{education.exchange.label}</p>
            <p className="mt-1 font-medium">{education.exchange.school}</p>
            <p className="font-mono text-sm text-muted-foreground">{education.exchange.period}</p>
          </div>
        </section>
        <section className="rounded-lg border border-border bg-card p-6 sm:p-8" aria-labelledby="lang">
          <h2 id="lang" className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Languages</h2>
          <dl className="mt-4 space-y-3">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between border-b border-border pb-2">
                <dt>{l.name}</dt>
                <dd className="font-mono text-success">{l.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Page>
  );
}
