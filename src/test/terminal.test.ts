import { describe, expect, it } from "vitest";
import { COMMANDS, complete, runCommand } from "@/lib/terminal";

describe("terminal allowlist", () => {
  it("accepts exactly the six allowed commands", () => {
    expect([...COMMANDS]).toEqual(["help", "about", "projects", "experience", "contact", "clear"]);
    for (const c of COMMANDS) expect(runCommand(c).kind).not.toBe("error");
  });
  it("rejects anything else, including shell-like input", () => {
    for (const c of ["ls", "rm -rf /", "alert(1)", "help; ls"])
      expect(runCommand(c).kind).toBe("error");
  });
  it("tab-completes only unique allowlisted prefixes", () => {
    expect(complete("he")).toBe("help");
    expect(complete("EXP")).toBe("experience");
    expect(complete("c")).toBeUndefined(); // contact / clear
    expect(complete("rm")).toBeUndefined();
    expect(complete("")).toBeUndefined();
  });
});
