import { describe, expect, it } from "vitest";
import { anchorToFilename, filenameToAnchor, parseList } from "./../src/utils/markdown";

describe("markdown", () => {
  it("parses markdown list", () => {
    const markdown = `
- [Installation](#installation)
- [Usage](#usage)
`;

    expect(parseList(markdown)).toEqual([
      { title: "Installation", anchor: "installation" },
      { title: "Usage", anchor: "usage" },
    ]);
  });

  it("returns empty list", () => {
    expect(parseList("Hello world")).toEqual([]);
  });

  it("converts anchor to filename", () => {
    expect(anchorToFilename("installation")).toBe("installation.md");
  });

  it("converts filename to anchor", () => {
    expect(filenameToAnchor("installation.md")).toBe("installation");
  });

  it("supports uppercase extension", () => {
    expect(filenameToAnchor("usage.MD")).toBe("usage");
  });
});
