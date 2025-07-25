import React, { useState } from "react"
import reactLogo from "./assets/react.svg"
import { invoke } from "@tauri-apps/api/core"
import "./App.css"

enum Level {
  min = "min",
  max = "max",
}

function App() {
  const [greetMsg, setGreetMsg] = useState<string>("")
  const [level, setLevel] = useState<Level>(Level.min)

  async function getMessage() {
    setGreetMsg(await invoke("get_message", { level }))
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as Level;
    setLevel(value);
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div className="row">
        <select
          value={level}
          id="greet-input"
          onChange={onChange}>
          <option value={Level.min}>普通</option>
          <option value={Level.max}>火力全开</option>
        </select>
        <button type="button" onClick={() => {
          void getMessage()
        }}>
          Get Message
        </button>
      </div>
      <p>{greetMsg}</p>
    </main>
  )
}

export default App
