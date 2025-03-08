import React, { useContext } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import va from "../public/ai.png";
import { datacontext } from "./context/UserContext";
import ai from "../public/aiVoice.gif";
function App() {
  let { recognition, speaking, setspeaking, text, prompt,settext } =
    useContext(datacontext);
  return (
    <div className=" h-screen w-screen flex flex-col p-9 items-center justify-center overflow-hidden bg-black text-white">
      <img className=" w-[20%]" src={va} alt="" />
      <span className="font-semibold text-center mt-2.5 bg-gradient-to-r from-blue-500 to-green-500 text-2xl text-transparent bg-clip-text">
        I'm Neha, Your Advanced Vitual Assistant
      </span>
      {!speaking ? (
        <button
          onClick={() => {
            settext("listening...");
            setspeaking(true);
            recognition.start();
          }}
          className="rounded-full cursor-pointer shadow-[0px_0px_15px_2px_rgba(0,255,255,0.75)] border font-semibold mt-2 gap-1 border-white p-2 flex items-center text-xl bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-[0px_0px_25px_4px_rgba(0,255,255,0.9)]"
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          {!prompt ? (
            <img className=" w-[10%]" src={`./speak.gif`} alt="" />
          ) : (
            <img className=" h-[80px] w-[50vh]" src={ai} alt="" />
          )}

          <span className=" font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-xl text-transparent bg-clip-text">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
