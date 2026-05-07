import { create } from "zustand";

import type { BridgeError } from "../../../shared/bridge/error-types";
import { getPlaybackBoundaryStatus } from "../bridge/playback-commands";
import type { PlaybackBoundaryReadyEvent, PlaybackBoundaryStatus } from "../types/playback";

type PlaybackStoreState = {
  bridgeStatus: PlaybackBoundaryStatus | null;
  lastEvent: PlaybackBoundaryReadyEvent | null;
  error: BridgeError | null;
  isLoading: boolean;
  refreshBoundaryStatus: () => Promise<void>;
  setLastEvent: (event: PlaybackBoundaryReadyEvent) => void;
};

export const usePlaybackStore = create<PlaybackStoreState>((set) => ({
  bridgeStatus: null,
  lastEvent: null,
  error: null,
  isLoading: false,
  refreshBoundaryStatus: async () => {
    set({ isLoading: true, error: null });

    const result = await getPlaybackBoundaryStatus();

    if (result.ok) {
      set({ bridgeStatus: result.payload, isLoading: false });
      return;
    }

    set({ error: result.error, isLoading: false });
  },
  setLastEvent: (event) => {
    set({ lastEvent: event });
  },
}));
