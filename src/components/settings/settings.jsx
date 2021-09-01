import React from "react";
import SoundBar from "../soundBar/soundBar";

const Settings = () => {
  return (
    <div className="settings-wrapper">
      <div>
        <h3>Music</h3>
        <SoundBar />
      </div>
      <div>
        <h3>Sound</h3>
        <SoundBar />
      </div>
    </div>
  );
};

export default Settings;
