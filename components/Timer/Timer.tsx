import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";

export const pink = "#DB2777";
export const green = "#4aec8c";

export interface Settings {
  breakMinutes: Number;
  workMinutes: Number;
  showSettings: Boolean;
  setBreakMinutes: Function;
  setWorkMinutes: Function;
  setShowSettings: Function;
}

export const Timer = () => {
  const settingsInfo: Settings | Object = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

      setIsPaused(true);
      isPausedRef.current = true;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        alert(mode + " over!");
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div
      className={`m-auto bg-gray-800 rounded-xl p-4 shadow-2xl my-4 border-2 w-2/5
        ${
          mode === "work"
            ? "shadow-green-400 border-green-200"
            : "shadow-pink-500 border-pink-300"
        }`}
    >
      <div
        className="text-2xl text-center p-5 font-bold"
        style={{ color: mode === "work" ? green : pink }}
      >
        <h2>Current Mode: {mode == "work" ? "Focus" : "Break"}</h2>
      </div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: mode === "work" ? pink : green,
          strokeLinecap: "round",
          pathColor: mode === "work" ? pink : green,
          trailColor: mode === "work" ? green : pink,
        })}
      />
      <div className="flex items-center justify-between my-5">
        {isPaused ? (
          <button
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          >
            <PlayButton />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          >
            <PauseButton />
          </button>
        )}

        <button onClick={() => settingsInfo.setShowSettings(true)}>
          <SettingsButton />
        </button>
      </div>
    </div>
  );
};

export default Timer;
