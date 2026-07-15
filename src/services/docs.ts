import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { CliError } from "../errors";
import { logger } from "../logger";
import { anchorToFilename, type ListItem } from "../utils/markdown";

export async function readDocs(
  docsDir: string,
  list: readonly ListItem[],
  isSkip: boolean,
): Promise<string> {
  logger.debug(`Scanning "${docsDir}"`);

  const availableFiles = await getAvailableFiles(docsDir);

  const contents = await Promise.all(
    list.map(async ({ anchor }) => {
      const filename = anchorToFilename(anchor);

      if (!isSkip) ensureFileExists(availableFiles, filename);

      logger.debug(`Reading "${filename}"`);

      return readDoc(docsDir, filename, isSkip);
    }),
  );

  return contents.join("\n\n");
}

async function getAvailableFiles(docsDir: string): Promise<Set<string>> {
  try {
    const entries = await readdir(docsDir, {
      withFileTypes: true,
    });

    return new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
  } catch (error) {
    throw new CliError(`Documentation directory "${docsDir}" does not exist.`, {
      cause: error,
    });
  }
}

async function readDoc(docsDir: string, filename: string, isSkip: boolean): Promise<string> {
  try {
    return await readFile(join(docsDir, filename), "utf8");
  } catch (error) {
    if (isSkip) return "";
    throw new CliError(`Failed to read "${filename}".`, {
      cause: error,
    });
  }
}

function ensureFileExists(files: ReadonlySet<string>, filename: string): void {
  if (!files.has(filename)) {
    throw new CliError(`Documentation file "${filename}" not found.`);
  }
}
