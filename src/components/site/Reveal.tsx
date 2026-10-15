import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/use-motion";

// Fades children in when scrolled into view. Content is only hidden after mount and only
// if it starts below the fold, so SSR / no-JS / reduced-motion visitors always see it.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${state === "hidden" ? "opacity-0" : state === "shown" ? "reveal" : ""} ${className}`}
      style={state === "shown" ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
