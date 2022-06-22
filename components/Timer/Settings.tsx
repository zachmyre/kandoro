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
        <a
          onClick={() => settingsInfo.setShowSettings(false)}
          className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group"
        >
          <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 opacity-[3%]"></span>
          <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-pink-600 opacity-100 group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-pink-600 transition-colors duration-200 ease-in-out group-hover:text-green-500">
            Go Back
          </span>
          <span className="absolute inset-0 border-2 border-green-500 rounded-full"></span>
        </a>
      </div>
    </div>
  );
};

export default Settings;
