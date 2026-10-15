import { Link } from "@tanstack/react-router";
import { useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { complete, runCommand, type CommandResult } from "@/lib/terminal";
import { Prompt } from "./Layout";

type Entry = { input: string; result: Exclude<CommandResult, { kind: "clear" }> };

// Allowlisted interactive shell. `intro` renders above the history (e.g. a scripted demo);
// the input appears once `active` is true.
export function TerminalSession({ intro, active = true }: { intro?: ReactNode; active?: boolean }) {
  const [history, setHistory] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [recall, setRecall] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const result = runCommand(value);
    if (result.kind === "clear") setHistory([]);
    else setHistory((h) => [...h.slice(-9), { input: value, result }]);
    if (value.trim()) setRecall((r) => [...r.slice(-19), value]);
    setCursor(-1);
    setValue("");
    setCaret(0);
  }

  // Programmatic changes (Tab, history) put the caret at the end of the line.
  function replaceValue(next: string) {
    setValue(next);
    setCaret(next.length);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      const hit = complete(value);
      if (hit) {
        e.preventDefault();
        replaceValue(hit);
      }
    } else if (e.key === "ArrowUp" && recall.length) {
      e.preventDefault();
      const next = cursor === -1 ? recall.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      replaceValue(recall[next] ?? "");
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= recall.length) {
        setCursor(-1);
        replaceValue("");
      } else {
        setCursor(next);
        replaceValue(recall[next] ?? "");
      }
    }
  }

  return (
    <div onClick={() => active && inputRef.current?.focus()}>
      {intro}
      <div aria-live="polite" className="space-y-3 empty:hidden [&:not(:empty)]:mt-3">
        {history.map((h, i) => (
          <div key={i}>
            <p className="break-words">
              <Prompt /> {h.input}
            </p>
            {h.result.lines.map((l, j) => (
              <p
                key={j}
                className={h.result.kind === "error" ? "text-destructive" : "text-muted-foreground"}
              >
                {l}
              </p>
            ))}
            {h.result.kind === "output" && h.result.link && (
              <Link to={h.result.link.to} className="text-primary underline underline-offset-4">
                {h.result.link.label} →
              </Link>
            )}
          </div>
        ))}
      </div>
      {active && (
        <form onSubmit={submit} className="mt-3 flex items-center gap-2">
          <label htmlFor="term-input" className="shrink-0">
            <Prompt />
            <span className="sr-only">
              Terminal command. Type help; Tab completes, arrow keys recall history.
            </span>
          </label>
          {/* The native input is invisible; the mirror below draws the text with an
              Ubuntu-style block cursor (solid + blinking when focused, hollow when not). */}
          <div className="relative min-w-0 flex-1">
            <input
              id="term-input"
              ref={inputRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setCaret(e.target.selectionStart ?? e.target.value.length);
              }}
              onSelect={(e) =>
                setCaret(e.currentTarget.selectionStart ?? e.currentTarget.value.length)
              }
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={40}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none selection:bg-primary/40 focus-visible:outline-none"
            />
            <p
              aria-hidden
              className="pointer-events-none overflow-hidden whitespace-pre text-foreground"
            >
              {value.slice(0, caret)}
              <span className={focused ? "term-cursor" : "term-cursor-idle"}>
                {value[caret] ?? " "}
              </span>
              {value.slice(caret + 1)}
              {!value && !focused && <span className="text-muted-foreground/50">type help</span>}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
