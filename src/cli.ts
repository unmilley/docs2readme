import { defineCommand, runMain } from "citty";
import { resolve } from "node:path";
import { CliError } from "./errors";
import { main } from "./index";
import { enableVerboseLogging, logger } from "./logger";

const cwd = process.cwd();

const command = defineCommand({
  meta: {
    name: "docs2readme",
    version: "1.0.0",
    description: "Generate a complete `README.md` from Markdown documentation.",
  },

  args: {
    docs: {
      type: "string",
      alias: ["d"],
      description: "Documentation directory",
      default: resolve(cwd, "docs"),
      valueHint: "./docs",
    },

    readme: {
      type: "string",
      alias: ["r"],
      description: "README output file",
      default: resolve(cwd, "README.md"),
      valueHint: "./README.md",
    },

    verbose: {
      type: "boolean",
      description: "Enable verbose logging",
      default: false,
    },
  },

  async run({ args }) {
    if (args.verbose) enableVerboseLogging();

    try {
      logger.start("Generating README");

      await main({
        docs: resolve(String(args.docs)),
        readme: resolve(String(args.readme)),
      });

      logger.success("README generated successfully");
    } catch (error) {
      if (error instanceof CliError) logger.error(error.message);
      else logger.error(error);

      process.exitCode = 1;
    }
  },
});

await runMain(command);
