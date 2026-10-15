import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/use-motion";

export const BOOT_KEY = "sk-booted";

const LINES = [
  "Started PostgreSQL database server.",
  "Started Redis in-memory data store.",
  "Started FastAPI application (uvicorn).",
  "Reached target Portfolio.",
];

const LINE_MS = 260;

// Runs in <head> before first paint: hides the page behind a backdrop only when the
// splash is going to play (home page, first visit this session, motion allowed).
export const bootScript = `try{if(location.pathname==="/"&&!sessionStorage.getItem("${BOOT_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("booting")}catch(e){}`;

export function BootSplash({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"off" | "on" | "leaving">("off");
  const [shown, setShown] = useState(0);
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  });

  useEffect(() => {
    let seen = true;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {
      // storage blocked — skip the splash
    }
    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.remove("booting");
      onFinishRef.current();
      return;
    }
    setPhase("on");
  }, []);

  useEffect(() => {
    if (phase !== "on") return;
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 350 : LINE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("leaving"), 450);
    return () => clearTimeout(t);
  }, [phase, shown]);

  useEffect(() => {
    if (phase !== "on") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setPhase("leaving");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    document.documentElement.classList.remove("booting");
    const t = setTimeout(() => {
      setPhase("off");
      onFinishRef.current();
    }, 350);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "off") return null;
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      onClick={() => setPhase("leaving")}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-background px-6 ${phase === "leaving" ? "boot-out" : ""}`}
    >
      <div
        aria-hidden
        className="relative grid h-20 w-20 place-items-center rounded-full bg-primary window-open"
      >
        <span className="h-9 w-9 rounded-full border-[5px] border-white border-r-transparent animate-spin" />
      </div>
      <div className="w-full max-w-md font-mono text-sm">
        {LINES.slice(0, shown).map((l) => (
          <p key={l} className="fade-up">
            <span className="text-muted-foreground">[</span>
            <span className="whitespace-pre text-success">{"  OK  "}</span>
            <span className="text-muted-foreground">]</span> {l}
          </p>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setPhase("leaving")}
        className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        Press Enter to skip
      </button>
    </div>
  );
}
