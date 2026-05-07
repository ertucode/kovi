export type BridgeError = {
  code: string;
  message: string;
  details?: string | null;
};

export type CommandResult<T> =
  | {
      ok: true;
      payload: T;
    }
  | {
      ok: false;
      error: BridgeError;
    };

export function toBridgeError(error: unknown): BridgeError {
  if (typeof error === "object" && error !== null) {
    const candidate = error as Partial<BridgeError>;

    return {
      code: typeof candidate.code === "string" ? candidate.code : "unknown_error",
      message: typeof candidate.message === "string" ? candidate.message : "Unknown native error",
      details: typeof candidate.details === "string" ? candidate.details : null,
    };
  }

  return {
    code: "unknown_error",
    message: typeof error === "string" ? error : "Unknown native error",
    details: null,
  };
}
