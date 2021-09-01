import React, { useState } from "react";
import ReactDOM from "react-dom";

function SoundBar() {
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const finalVolume = muted ? 0 : volume ** 1;

  return (
    <main>
      <section>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={(event) => {
            setVolume(event.target.valueAsNumber);
          }}
        />
        <button onClick={() => setMuted((m) => !m)}>
          {muted ? "muted" : "unmuted"}
        </button>
      </section>
      <section>
        <p>final volume: {finalVolume.toFixed(3)}</p>
      </section>
    </main>
  );
}
export default SoundBar;
