export function SubtitlePanel() {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Native Structure</p>
          <h2>Playback module boundary</h2>
        </div>
      </div>
      <ul className="panel__list">
        <li>`commands/` exposes the Tauri surface.</li>
        <li>`bridge/` defines DTO and error mapping.</li>
        <li>`playback/` holds the explicit playback domain entry points.</li>
        <li>`persistence/`, `models/`, and `support/` are present for follow-on stories.</li>
      </ul>
    </section>
  );
}
