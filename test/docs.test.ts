import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { CliError } from "../src/errors";
import { readDocs } from "../src/services/docs";

describe("services/docs", () => {
  let root: string;
  let docsDir: string;

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "docs2readme-"));

    docsDir = join(root, "docs");

    await mkdir(docsDir);
  });

  afterEach(async () => {
    await rm(root, {
      recursive: true,
      force: true,
    });
  });

  it("reads a single document", async () => {
    await writeFile(join(docsDir, "intro.md"), "# Intro", "utf8");

    const result = await readDocs(docsDir, [
      {
        title: "Intro",
        anchor: "intro",
      },
    ]);

    expect(result).toBe("# Intro");
  });

  it("reads multiple documents in order", async () => {
    await writeFile(join(docsDir, "intro.md"), "Intro", "utf8");

    await writeFile(join(docsDir, "install.md"), "Install", "utf8");

    const result = await readDocs(docsDir, [
      {
        title: "Intro",
        anchor: "intro",
      },
      {
        title: "Install",
        anchor: "install",
      },
    ]);

    expect(result).toBe(["Intro", "Install"].join("\n\n"));
  });

  it("keeps README order regardless of filesystem order", async () => {
    await writeFile(join(docsDir, "b.md"), "B", "utf8");

    await writeFile(join(docsDir, "a.md"), "A", "utf8");

    const result = await readDocs(docsDir, [
      {
        title: "A",
        anchor: "a",
      },
      {
        title: "B",
        anchor: "b",
      },
    ]);

    expect(result).toBe(["A", "B"].join("\n\n"));
  });

  it("returns empty string for empty list", async () => {
    await expect(readDocs(docsDir, [])).resolves.toBe("");
  });

  it("throws CliError when documentation file is missing", async () => {
    await expect(
      readDocs(docsDir, [
        {
          title: "Missing",
          anchor: "missing",
        },
      ]),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("throws CliError when documentation directory does not exist", async () => {
    await expect(readDocs(join(root, "unknown"), [])).rejects.toBeInstanceOf(CliError);
  });
});
