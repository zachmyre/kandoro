import type { NextPage } from "next";
import Timer from "../components/Timer/Timer";
import Settings from "../components/Timer/Settings";
import SettingsContext from "../components/Timer/SettingsContext";
import { useState } from "react";
import { CgInfinity } from "react-icons/cg";

const Home: NextPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main className="w-screen h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="w-1/2 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white tracking-wider">
            Kandoro
          </h1>
          <h2 className="text-center text-white text-xl bold tracking-wider mt-1">
            <CgInfinity className="m-auto w-8 h-8" />
            Promote Focus.
            <br />
            Promote Productivity.
          </h2>
        </div>
        <div className="w-1/3 h-full">
          <SettingsContext.Provider
            value={{
              showSettings,
              setShowSettings,
              workMinutes,
              breakMinutes,
              setWorkMinutes,
              setBreakMinutes,
            }}
          >
            {showSettings ? (
              <div className="flex items-center justify-center h-1/2">
                <Settings />
              </div>
            ) : (
              <Timer />
            )}
          </SettingsContext.Provider>
        </div>
      </div>
    </main>
  );
};

export default Home;
