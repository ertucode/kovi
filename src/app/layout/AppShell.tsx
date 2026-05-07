import { PlayerPanel } from "./panels/PlayerPanel";
import { PlaylistPanel } from "./panels/PlaylistPanel";
import { SubtitlePanel } from "./panels/SubtitlePanel";

export function AppShell() {
  return (
    <main className="app-shell">
      <header className="app-shell__header">
        <div>
          <p className="eyebrow">Desktop Playback Foundation</p>
          <h1>Kovi</h1>
        </div>
        <p className="app-shell__summary">
          Tauri, React, TypeScript, Zustand, and a native playback boundary are wired and ready for follow-on stories.
        </p>
      </header>
      <section className="app-shell__grid">
        <PlayerPanel />
        <PlaylistPanel />
        <SubtitlePanel />
      </section>
    </main>
  );
}
