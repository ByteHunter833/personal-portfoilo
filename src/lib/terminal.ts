import { education, experience, profile, projects } from "@/content/site";

// Allowlisted commands only. Input is matched as a plain string — never executed or evaluated.
export type NavTarget = "/projects" | "/experience" | "/about" | "/contact";
export type CommandResult =
  | { kind: "clear" }
  | { kind: "output"; lines: string[]; link?: { to: NavTarget; label: string } }
  | { kind: "error"; lines: string[] };

export const COMMANDS = ["help", "about", "projects", "experience", "contact", "clear"] as const;

export const PROMPT_USER = "shukrullo@ubuntu";

// Tab completion: returns the single allowlisted command starting with the prefix, if unique.
export function complete(raw: string): string | undefined {
  const prefix = raw.trim().toLowerCase();
  if (!prefix) return undefined;
  const hits = COMMANDS.filter((c) => c.startsWith(prefix));
  return hits.length === 1 ? hits[0] : undefined;
}

export function runCommand(raw: string): CommandResult {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return { kind: "output", lines: [`Available commands: ${COMMANDS.join(", ")}`] };
    case "about":
      return {
        kind: "output",
        lines: [`${profile.name} — ${profile.title}`, `${education.field}, ${education.university} (${education.graduation})`],
        link: { to: "/about", label: "Open About" },
      };
    case "projects":
      return { kind: "output", lines: projects.map((p) => `• ${p.name}`), link: { to: "/projects", label: "Open Projects" } };
    case "experience":
      return {
        kind: "output",
        lines: experience.map((e) => `${e.role} — ${e.company} (${e.period})`),
        link: { to: "/experience", label: "Open Experience" },
      };
    case "contact":
      return { kind: "output", lines: [profile.email, profile.github], link: { to: "/contact", label: "Open Contact" } };
    case "clear":
      return { kind: "clear" };
    case "":
      return { kind: "output", lines: [] };
    default:
      return { kind: "error", lines: [`command not found: ${cmd.slice(0, 40)} — try "help"`] };
  }
}
