import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/logger.ts", () => ({
  logger: {
    start: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../src/services/readme.ts", () => ({
  readReadme: vi.fn(),
  writeReadme: vi.fn(),
}));

vi.mock("../src/services/docs.ts", () => ({
  readDocs: vi.fn(),
}));

vi.mock("../src/utils/block.ts", () => ({
  findBlock: vi.fn(),
  replaceBlock: vi.fn(),
}));

vi.mock("../src/utils/markdown.ts", () => ({
  parseList: vi.fn(),
}));

import { main } from "../src/index.ts";

import * as docsService from "../src/services/docs.ts";
import * as readmeService from "../src/services/readme.ts";
import * as block from "../src/utils/block.ts";
import * as markdown from "../src/utils/markdown.ts";

describe("main()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("generates README", async () => {
    vi.mocked(readmeService.readReadme).mockResolvedValue("README");

    vi.mocked(block.findBlock).mockReturnValue("table");

    vi.mocked(markdown.parseList).mockReturnValue([
      {
        title: "Intro",
        anchor: "intro",
      },
    ]);

    vi.mocked(docsService.readDocs).mockResolvedValue("DOCS");

    vi.mocked(block.replaceBlock).mockReturnValue("UPDATED README");

    await main({
      docs: "/docs",
      readme: "/README.md",
      skip: false,
    });

    expect(readmeService.readReadme).toHaveBeenCalledWith("/README.md");

    expect(block.findBlock).toHaveBeenCalledOnce();

    expect(markdown.parseList).toHaveBeenCalledWith("table");

    expect(docsService.readDocs).toHaveBeenCalledWith(
      "/docs",
      [{ title: "Intro", anchor: "intro" }],
      false,
    );

    expect(block.replaceBlock).toHaveBeenCalledOnce();

    expect(readmeService.writeReadme).toHaveBeenCalledWith("/README.md", "UPDATED README");
  });

  it("propagates service errors", async () => {
    vi.mocked(readmeService.readReadme).mockRejectedValue(new Error("boom"));

    await expect(
      main({
        docs: "/docs",
        readme: "/README.md",
        skip: false,
      }),
    ).rejects.toThrow("boom");
  });

  it("does not write README when parsing fails", async () => {
    vi.mocked(readmeService.readReadme).mockResolvedValue("README");

    vi.mocked(block.findBlock).mockReturnValue("table");

    vi.mocked(markdown.parseList).mockImplementation(() => {
      throw new Error("parse error");
    });

    await expect(
      main({
        docs: "/docs",
        readme: "/README.md",
        skip: false,
      }),
    ).rejects.toThrow("parse error");

    expect(readmeService.writeReadme).not.toHaveBeenCalled();
  });
});
