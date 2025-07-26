import React, { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

enum Level {
  min = "min",
  max = "max",
}

export default function App() {
  // 文本内容状态
  const [text, setText] = useState<string>("")
  const [isLast, setIsLast] = useState<boolean>(false)
  const [last, setLast] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      await getMessage()
    })()
  }, [])

  const getMessage = async (level?: Level) => {
    // 保存上一条信息
    setLast(text)

    // 获取下一条信息
    const nextMessage = await invoke<string>("get_message", { level })
    setText(nextMessage)
  }

  const showLast = () => {
    setIsLast(true)
    setText(last)
  }

  // 复制文字到剪贴板
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          alert("复制成功！")
        },
        () => {
          alert("复制失败，请手动复制！")
        }
      )
    } else {
      alert("当前浏览器不支持复制功能")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 flex flex-col">
      <header className="bg-purple-700 text-white flex flex-col md:flex-row items-center md:justify-between px-6 py-5 sticky top-0 z-40 shadow-md">
        <h3 className="text-xl font-semibold mb-2 md:mb-0">骂人宝典</h3>
        <nav className="flex space-x-6 text-sm md:text-base"></nav>
      </header>

      <main className="flex-grow max-w-4xl mx-auto p-4">
        <section className="mb-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => getMessage(Level.min)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            😤 火力全开
          </button>

          <button
            onClick={() => getMessage(Level.max)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            🙂 口吐莲花
          </button>
        </section>

        {text}

        <section className="mb-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={showLast}
            disabled={isLast}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            上一条
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-md transition">
            复制
          </button>
        </section>

        <div className="text-center pt-8 text-sm text-red-600">
          ⚠️ 不管怎么说骂人都是不对的，请不要主动攻击别人。
        </div>
      </main>
    </div>
  )
}
