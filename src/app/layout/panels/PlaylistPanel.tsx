export function PlaylistPanel() {
  return (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Frontend Structure</p>
          <h2>Feature-oriented UI areas</h2>
        </div>
      </div>
      <ul className="panel__list">
        <li>`src/app` owns shell composition and routes.</li>
        <li>`src/features` is reserved for playback, playlist, subtitles, and preferences flows.</li>
        <li>`src/shared` centralizes bridge and reusable types.</li>
        <li>`src/styles` keeps the global design tokens and base app styles.</li>
      </ul>
    </section>
  );
}
