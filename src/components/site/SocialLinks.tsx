import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { profile } from "@/content/site";

type Social = { label: string; href: string; display: string; Icon: LucideIcon; external: boolean };

// LinkedIn appears only once profile.linkedin is filled in.
export const socials: Social[] = [
  {
    label: "GitHub",
    href: profile.github,
    display: profile.github.replace("https://", ""),
    Icon: Github,
    external: true,
  },
  ...(profile.linkedin
    ? [
        {
          label: "LinkedIn",
          href: profile.linkedin,
          display: profile.linkedin.replace(/^https:\/\/(www\.)?/, ""),
          Icon: Linkedin,
          external: true,
        },
      ]
    : []),
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    display: profile.email,
    Icon: Mail,
    external: false,
  },
];

// Labelled icon buttons — recruiters scan for these, so the text stays visible.
export function SocialLinks({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {socials.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            aria-label={compact ? label : undefined}
            title={label}
            className={`glow-hover inline-flex items-center gap-2 rounded-md border border-border bg-card font-mono text-sm text-muted-foreground hover:text-foreground ${
              compact ? "p-2" : "px-3 py-2"
            }`}
          >
            <Icon aria-hidden className="h-4 w-4" />
            {!compact && label}
          </a>
        </li>
      ))}
    </ul>
  );
}
