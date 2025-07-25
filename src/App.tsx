import React, { useState } from "react"
import { invoke } from "@tauri-apps/api/core"

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
    const value = event.target.value as Level
    setLevel(value)
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <select value={level} id="greet-input" onChange={onChange}>
          <option value={Level.min}>普通</option>
          <option value={Level.max}>火力全开</option>
        </select>
        <button
          type="button"
          onClick={() => {
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
