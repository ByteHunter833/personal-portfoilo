import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-motion";

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before the first character */
  delay?: number;
  /** typing waits until this is true */
  start?: boolean;
  /** show the full text at once */
  instant?: boolean;
  /** "typing": cursor only while typing; "always": keeps blinking after */
  cursor?: "typing" | "always" | "never";
  onDone?: () => void;
  className?: string;
};

// Character-by-character typing. Screen readers get the full text immediately;
// the animated copy is aria-hidden. Reduced motion shows everything at once.
export function TypedText({
  text,
  speed = 45,
  delay = 0,
  start = true,
  instant = false,
  cursor = "typing",
  onDone,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const shown = reduced || instant ? text.length : count;
  const done = shown >= text.length;

  useEffect(() => {
    if (!start || done) return;
    // Slight jitter so it reads like a person typing rather than a ticker.
    const wait = (count === 0 ? delay : 0) + speed * (0.6 + Math.random() * 0.8);
    const t = setTimeout(() => setCount((c) => c + 1), wait);
    return () => clearTimeout(t);
  }, [start, done, count, delay, speed]);

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });
  useEffect(() => {
    if (start && done) onDoneRef.current?.();
  }, [start, done]);

  const showCursor = cursor === "always" || (cursor === "typing" && start && !done);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, shown)}
        {showCursor && <span className="cursor" />}
      </span>
    </span>
  );
}
