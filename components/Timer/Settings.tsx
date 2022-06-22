import SettingsContext from "./SettingsContext";
import { useContext } from "react";
import Slider from "@mui/material/Slider";
import { pink, green } from "./Timer";

export const Settings = () => {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div className="text-center space-y-4">
      <label className="text-2xl font-bold" style={{ color: pink }}>
        Focus: {settingsInfo.workMinutes}:00
      </label>
      <Slider
        style={{ color: green }}
        value={settingsInfo.workMinutes}
        onChange={(newValue: any) =>
          settingsInfo.setWorkMinutes(newValue.target.value)
        }
        min={1}
        max={120}
      />
      <label className="text-2xl font-bold" style={{ color: pink }}>
        Break: {settingsInfo.breakMinutes}:00
      </label>
      <Slider
        style={{ color: green }}
        value={settingsInfo.breakMinutes}
        onChange={(newValue: any) =>
          settingsInfo.setBreakMinutes(newValue.target.value)
        }
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => settingsInfo.setShowSettings(false)}
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Settings;
