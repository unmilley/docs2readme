import { DOCS_MARKERS, TABLE_MARKERS } from "./constants/markers";
import { invariant } from "./errors";
import { logger } from "./logger";
import { readDocs } from "./services/docs";
import { readReadme, writeReadme } from "./services/readme";
import { findBlock, replaceBlock } from "./utils/block";
import { parseList } from "./utils/markdown";

export interface MainArgs {
  docs: string;
  readme: string;
  skip: boolean;
}

export async function main({ docs, readme, skip }: MainArgs): Promise<void> {
  logger.start("Reading README");

  const readmeContent = await readReadme(readme);

  invariant(readmeContent.trim().length > 0, "README is empty");

  logger.debug("Searching documentation table");

  const table = findBlock(readmeContent, TABLE_MARKERS.start, TABLE_MARKERS.end);

  invariant(table.length > 0, "Documentation table not found");

  const list = parseList(table);

  invariant(list.length > 0, "Documentation list is empty");

  logger.info(`Found ${list.length} documentation file(s)`);

  logger.start("Reading documentation");

  const docsContent = await readDocs(docs, list, skip);

  logger.start("Updating README");

  const output = replaceBlock(readmeContent, DOCS_MARKERS.start, DOCS_MARKERS.end, docsContent);

  await writeReadme(readme, output);

  logger.success("README generated");
}
