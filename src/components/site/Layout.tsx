import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { profile } from "@/content/site";

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
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground underline decoration-primary decoration-2 underline-offset-8" }}
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
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-5 py-8 font-mono text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="flex gap-4">
          <a href={profile.github} className="hover:text-foreground" target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground">Email</a>
        </span>
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
      <p className="font-mono text-sm text-muted-foreground"><span className="text-primary">$</span> {cmd}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {children && <p className="mt-3 max-w-2xl text-muted-foreground">{children}</p>}
    </div>
  );
}

export function TerminalWindow({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-border bg-card shadow-2xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-2.5">
        <span aria-hidden className="h-3 w-3 rounded-full bg-primary" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-muted-foreground/40" />
        <span aria-hidden className="h-3 w-3 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded border border-border bg-elevated px-2 py-0.5 font-mono text-xs text-muted-foreground">{children}</span>;
}
