import { createConsola, LogLevels } from "consola";

export const logger = createConsola({
  level: LogLevels.info,
});

export function enableVerboseLogging(): void {
  logger.level = LogLevels.debug;
}
