import { CliError } from "./cli-error";

export function invariant(condition: unknown, message: string): void {
  if (!condition) throw new CliError(message);
}
