import { invoke } from "@tauri-apps/api/core";

import { toBridgeError, type CommandResult } from "./error-types";

export async function invokeTauriCommand<T>(command: string, args?: Record<string, unknown>): Promise<CommandResult<T>> {
  try {
    const payload = await invoke<T>(command, args);

    return {
      ok: true,
      payload,
    };
  } catch (error) {
    return {
      ok: false,
      error: toBridgeError(error),
    };
  }
}
