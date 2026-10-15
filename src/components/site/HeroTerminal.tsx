import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { profile, projects } from "@/content/site";
import { Prompt, TerminalWindow } from "./Layout";
import { TerminalSession } from "./TerminalSession";
import { TypedText } from "./TypedText";

type Step = { cmd: string; output: ReactNode };

const steps: Step[] = [
  { cmd: "whoami", output: <p>{profile.name}</p> },
  { cmd: "cat focus.txt", output: <p className="text-success">{profile.focus.join(" · ")}</p> },
  {
    cmd: "ls projects/",
    output: (
      <p className="flex flex-wrap gap-x-5">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="font-bold text-term-blue underline-offset-4 hover:underline"
          >
            {p.slug}/
          </Link>
        ))}
      </p>
    ),
  },
];

// Scripted demo that types a few commands, then hands over to the interactive shell.
export function HeroTerminal({ start }: { start: boolean }) {
  const [done, setDone] = useState(0);
  const finished = done >= steps.length;
  const skip = () => setDone(steps.length);

  useEffect(() => {
    if (!start || finished) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [start, finished]);

  const intro = (
    <div className="space-y-1">
      <p className="text-muted-foreground">
        Welcome to {profile.name.split(" ")[0]}&apos;s portfolio. Type{" "}
        <span className="text-foreground">help</span> for commands.
      </p>
      {steps.slice(0, done + 1).map((s, i) => (
        <div key={s.cmd} className="pt-2">
          <p>
            <Prompt />{" "}
            <TypedText
              text={s.cmd}
              start={start && i === done}
              instant={i < done}
              delay={i === 0 ? 500 : 350}
              speed={70}
              onDone={() => setTimeout(() => setDone((d) => Math.max(d, i + 1)), 250)}
            />
          </p>
          {i < done && <div className="fade-up">{s.output}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <TerminalWindow title="shukrullo@ubuntu: ~" className="w-full">
      <div className="relative min-h-72 sm:min-h-80" onClick={() => !finished && skip()}>
        <TerminalSession intro={intro} active={finished} />
        {!finished && (
          <button
            type="button"
            onClick={skip}
            className="absolute right-0 bottom-0 rounded px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
          >
            skip ›
          </button>
        )}
      </div>
    </TerminalWindow>
  );
}
