import { useEffect } from "react";

import { usePlaybackEvents } from "../../../features/playback/hooks/use-playback-events";
import { usePlaybackStore } from "../../../features/playback/store/playback-store";

export function PlayerPanel() {
  usePlaybackEvents();

  const bridgeStatus = usePlaybackStore((state) => state.bridgeStatus);
  const error = usePlaybackStore((state) => state.error);
  const isLoading = usePlaybackStore((state) => state.isLoading);
  const lastEvent = usePlaybackStore((state) => state.lastEvent);
  const refreshBoundaryStatus = usePlaybackStore((state) => state.refreshBoundaryStatus);

  useEffect(() => {
    void refreshBoundaryStatus();
  }, [refreshBoundaryStatus]);

  return (
    <section className="panel panel--primary">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Playback Boundary</p>
          <h2>Typed native bridge proof</h2>
        </div>
        <button className="panel__button" onClick={() => void refreshBoundaryStatus()} type="button">
          {isLoading ? "Refreshing..." : "Invoke native command"}
        </button>
      </div>

      <dl className="detail-list">
        <div>
          <dt>Status</dt>
          <dd>{bridgeStatus?.status ?? "Awaiting command invocation"}</dd>
        </div>
        <div>
          <dt>Message</dt>
          <dd>{bridgeStatus?.message ?? "No native payload received yet."}</dd>
        </div>
        <div>
          <dt>Event name</dt>
          <dd>{bridgeStatus?.eventName ?? "playback.boundary-ready"}</dd>
        </div>
        <div>
          <dt>Boundary ready</dt>
          <dd>{bridgeStatus?.playbackBoundaryReady ? "Yes" : "No"}</dd>
        </div>
      </dl>

      {lastEvent ? (
        <p className="panel__note">
          Last event: <strong>{lastEvent.message}</strong>
        </p>
      ) : null}

      {error ? (
        <div className="panel__error" role="alert">
          <strong>{error.code}</strong>
          <p>{error.message}</p>
          {error.details ? <p>{error.details}</p> : null}
        </div>
      ) : null}
    </section>
  );
}
