import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { CliError } from "../errors";
import { logger } from "../logger";

export async function readReadme(file: string): Promise<string> {
  const path = resolve(file);

  logger.debug(`Reading "${path}"`);

  try {
    return await readFile(path, "utf8");
  } catch (error) {
    throw new CliError(`Failed to read README "${path}".`, {
      cause: error,
    });
  }
}

export async function writeReadme(file: string, content: string): Promise<void> {
  const path = resolve(file);

  logger.debug(`Writing "${path}"`);

  try {
    await writeFile(path, content, "utf8");
  } catch (error) {
    throw new CliError(`Failed to write README "${path}".`, {
      cause: error,
    });
  }
}
