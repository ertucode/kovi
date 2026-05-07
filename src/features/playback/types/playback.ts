export type PlaybackBoundaryStatus = {
  status: "ready";
  message: string;
  eventName: string;
  playbackBoundaryReady: boolean;
};

export type PlaybackBoundaryReadyEvent = PlaybackBoundaryStatus;
