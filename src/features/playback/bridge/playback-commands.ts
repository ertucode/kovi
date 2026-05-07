import { invokeTauriCommand } from "../../../shared/bridge/tauri-client";

import type { PlaybackBoundaryStatus } from "../types/playback";

export function getPlaybackBoundaryStatus() {
  return invokeTauriCommand<PlaybackBoundaryStatus>("get_playback_boundary_status");
}
