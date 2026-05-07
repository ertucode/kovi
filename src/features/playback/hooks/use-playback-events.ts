import { useEffect } from "react";

import { listenToAppEvent } from "../../../shared/bridge/event-bus";
import { PLAYBACK_BOUNDARY_READY_EVENT } from "../../../shared/types/common";
import { usePlaybackStore } from "../store/playback-store";
import type { PlaybackBoundaryReadyEvent } from "../types/playback";

export function usePlaybackEvents() {
  const setLastEvent = usePlaybackStore((state) => state.setLastEvent);

  useEffect(() => {
    let dispose: (() => void) | undefined;

    void listenToAppEvent<PlaybackBoundaryReadyEvent>(PLAYBACK_BOUNDARY_READY_EVENT, (payload) => {
      setLastEvent(payload);
    }).then((unlisten) => {
      dispose = unlisten;
    });

    return () => {
      dispose?.();
    };
  }, [setLastEvent]);
}
