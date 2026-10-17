import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { profile } from "@/content/site";
import { PROMPT_USER } from "@/lib/terminal";
import { TypedText } from "./TypedText";
import { SocialLinks } from "./SocialLinks";

const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-mono text-lg font-bold text-foreground" aria-label={`${profile.name} — home`}>
          <span className="text-primary">~/</span>{profile.initials}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="relative py-1 text-muted-foreground transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
                  activeProps={{ className: "text-foreground after:scale-x-100" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
            {profile.resumeUrl && (
              <li>
                <a href={profile.resumeUrl} className="rounded border border-primary px-3 py-1 font-mono text-primary">
                  Resume
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <SocialLinks compact />
      </div>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl px-5 py-14 fade-up sm:py-20">{children}</div>;
}

export function SectionTitle({ cmd, title, children }: { cmd: string; title: string; children?: ReactNode }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-muted-foreground">
        <span className="text-primary">$</span> <TypedText text={cmd} delay={150} cursor="always" />
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl text-muted-foreground">{children}</p>}
    </div>
  );
}

export function Prompt({ path = "~" }: { path?: string }) {
  return (
    <span className="shrink-0">
      <span className="font-bold text-success">{PROMPT_USER}</span>:<span className="font-bold text-term-blue">{path}</span>$
    </span>
  );
}

// GNOME Terminal (Yaru) style window: centered title, window controls on the right.
export function TerminalWindow({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`window-open glow-hover overflow-hidden rounded-xl border border-border bg-terminal shadow-2xl ${className}`}>
      <div className="relative flex items-center justify-center border-b border-black/30 bg-elevated px-4 py-2.5">
        <span className="truncate px-16 font-mono text-xs font-bold text-muted-foreground">{title}</span>
        <span aria-hidden className="absolute right-3 flex items-center gap-2">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-muted-foreground/20 text-[10px] leading-none text-muted-foreground">–</span>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-muted-foreground/20 text-[8px] leading-none text-muted-foreground">▢</span>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] leading-none text-white">×</span>
        </span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded border border-border bg-elevated px-2 py-0.5 font-mono text-xs text-muted-foreground">{children}</span>;
}
