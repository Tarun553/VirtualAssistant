
import { createContext, useState } from "react";
import React from "react";
import run from '../gemini';

// Create the context
export const datacontext = createContext();

// UserContext provider component
function UserContext({ children }) {
  let [speaking, setspeaking] = useState(false);
  let [text, settext] = useState("listening...");
  let [prompt, setprompt] = useState(false);
  // Define the speak function
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "Hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
  let text =  await run(prompt);
  let newtext = text.split("**")&&text.split("*")&&text.replace("google","Neha")&&text.replace("Google","Neha");
  settext(newtext);
  speak(newtext);
  setprompt(true);
  setTimeout(() => {
      setspeaking(false);
  }, 8000);

  }
  let speechRecogination = window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;
  let recognition = new speechRecogination();
  recognition.onresult=(e) => {
    let current = e.resultIndex;
    let transcript = e.results[current][0].transcript;
    settext(transcript);
    aiResponse(transcript);
  }


  // The value provided by the context
  let value = {
    recognition,speaking, setspeaking, text, settext, prompt
  };

  // Return the provider wrapping the children
  return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext
