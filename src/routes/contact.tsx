import { createFileRoute } from "@tanstack/react-router";
import { profile } from "@/content/site";
import { Page, SectionTitle, TerminalWindow } from "@/components/site/Layout";
import { socials } from "@/components/site/SocialLinks";
import { Download } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shukrullo Kurbonov" },
      { name: "description", content: "Get in touch with Shukrullo Kurbonov about Software Engineering Intern opportunities." },
      { property: "og:title", content: "Contact — Shukrullo Kurbonov" },
      { property: "og:description", content: "Email, GitHub and LinkedIn for Shukrullo Kurbonov." },
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
        <ul className="space-y-5">
          {socials.map(({ label, href, display, Icon, external }) => (
            <li key={label}>
              <p className="text-muted-foreground"># {label.toLowerCase()}</p>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="inline-flex items-center gap-2 text-lg break-all text-primary underline-offset-4 hover:underline"
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0" />
                {display}
              </a>
            </li>
          ))}
          {profile.resumeUrl && (
            <li>
              <p className="text-muted-foreground"># resume</p>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 text-lg text-primary underline-offset-4 hover:underline"
              >
                <Download aria-hidden className="h-4 w-4 shrink-0" />
                Download PDF
              </a>
            </li>
          )}
        </ul>
      </TerminalWindow>
    </Page>
  );
}
