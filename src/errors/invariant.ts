import { CliError } from "./cli-error";

export function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) throw new CliError(message);
}
