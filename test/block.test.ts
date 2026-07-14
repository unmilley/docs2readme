import { describe, expect, it } from "vitest";
import { findBlock, hasBlock, replaceBlock } from "./../src/utils/block";

const START = "<!-- start -->";
const END = "<!-- end -->";

describe("block", () => {
  it("finds block", () => {
    const markdown = `
before

${START}
hello
world
${END}

after
`;
    expect(findBlock(markdown, START, END)).toBe("hello\nworld");
  });

  it("returns empty string if block does not exist", () => {
    expect(findBlock("abc", START, END)).toBe("");
  });

  it("checks block existence", () => {
    expect(hasBlock(`${START}\ntext\n${END}`, START, END)).toBe(true);
    expect(hasBlock("text", START, END)).toBe(false);
  });

  it("replaces block", () => {
    const source = `
before

${START}
old
${END}

after
`;
    expect(replaceBlock(source, START, END, "new")).toContain("new");
  });

  it("returns original content if block is missing", () => {
    expect(replaceBlock("hello", START, END, "world")).toBe("hello");
  });
});
