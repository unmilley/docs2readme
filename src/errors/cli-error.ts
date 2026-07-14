export interface CliErrorOptions {
  cause?: unknown;
}

export class CliError extends Error {
  constructor(message: string, options?: CliErrorOptions) {
    super(message, options);

    this.name = "CliError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
