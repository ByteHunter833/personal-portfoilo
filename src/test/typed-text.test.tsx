import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TypedText } from "@/components/site/TypedText";

const realMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = realMatchMedia;
});

describe("TypedText", () => {
  it("always exposes the full text to screen readers", () => {
    render(<TypedText text="whoami" />);
    expect(screen.getByText("whoami")).toHaveClass("sr-only");
  });

  it("shows the full text at once under reduced motion", () => {
    window.matchMedia = vi.fn((query: string) => ({
      ...realMatchMedia(query),
      matches: true,
    })) as typeof window.matchMedia;
    const { container } = render(<TypedText text="cat focus.txt" />);
    expect(container.querySelector("[aria-hidden]")?.textContent).toBe("cat focus.txt");
  });
});
