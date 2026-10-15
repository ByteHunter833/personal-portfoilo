import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/content/site";
import { Page, SectionTitle, TerminalWindow } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shukrullo Kurbonov" },
      { name: "description", content: "Get in touch with Shukrullo Kurbonov about Software Engineering Intern opportunities." },
      { property: "og:title", content: "Contact — Shukrullo Kurbonov" },
      { property: "og:description", content: "Email and GitHub for Shukrullo Kurbonov." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Page>
      <SectionTitle cmd="./contact.sh" title="Contact">
        Open to Software Engineering Intern opportunities. Email is the fastest way to reach me.
      </SectionTitle>
      <TerminalWindow title="shukrullo@ubuntu: ~/contact" className="max-w-2xl">
        <p className="text-muted-foreground"># email</p>
        <a href={`mailto:${profile.email}`} className="text-lg text-primary underline-offset-4 hover:underline break-all">{profile.email}</a>
        <p className="mt-5 text-muted-foreground"># github</p>
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-lg text-primary underline-offset-4 hover:underline break-all">
          {profile.github.replace("https://", "")}
        </a>
      </TerminalWindow>
    </Page>
  );
}
