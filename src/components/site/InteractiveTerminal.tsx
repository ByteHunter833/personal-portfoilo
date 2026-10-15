import { Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { runCommand, type CommandResult } from "@/lib/terminal";
import { TerminalWindow } from "./Layout";

type Entry = { input: string; result: Exclude<CommandResult, { kind: "clear" }> };

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const result = runCommand(value);
    if (result.kind === "clear") setHistory([]);
    else setHistory((h) => [...h.slice(-9), { input: value, result }]);
    setValue("");
  }

  return (
    <TerminalWindow title="shukrullo@portfolio: ~ (optional)">
      <p className="text-muted-foreground">Type <span className="text-foreground">help</span> to see commands. Regular navigation works too.</p>
      <div aria-live="polite" className="mt-3 space-y-3">
        {history.map((h, i) => (
          <div key={i}>
            <p><span className="text-success">shukrullo@portfolio</span>:<span className="text-primary">~</span>$ {h.input}</p>
            {h.result.lines.map((l, j) => (
              <p key={j} className={h.result.kind === "error" ? "text-destructive" : "text-muted-foreground"}>{l}</p>
            ))}
            {h.result.kind === "output" && h.result.link && (
              <Link to={h.result.link.to} className="text-primary underline underline-offset-4">{h.result.link.label} →</Link>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-3 flex items-center gap-2" onClick={() => inputRef.current?.focus()}>
        <label htmlFor="term-input" className="shrink-0">
          <span className="text-success">shukrullo@portfolio</span>:<span className="text-primary">~</span>$
          <span className="sr-only">Terminal command</span>
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={40}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 rounded bg-transparent px-1 text-foreground caret-primary outline-none focus-visible:outline-1"
          placeholder="help"
        />
      </form>
    </TerminalWindow>
  );
}
