import React, { useEffect, useState } from "react"
import { Level } from "@/types"
import * as service from "@/service"

export default function App() {
  const [text, setText] = useState<string>("")
  const [isLast, setIsLast] = useState<boolean>(false)
  const [last, setLast] = useState<string>("")

  useEffect(() => {
    // 加载一条祖安语录
    ;(async () => {
      await getMessage()
    })()
    // 第一条消息，禁用上一条功能
    setIsLast(true)
  }, [])

  /**
   * 获取一条祖安语录
   * @param level 语录等级
   */
  const getMessage = async (level?: Level) => {
    // 开放上一条功能
    setIsLast(false)

    // 保存上一条信息
    setLast(text)

    // 获取下一条信息
    const nextZuanMessage = await service.nextZuan(level)
    setText(nextZuanMessage)
  }

  /**
   * 展示上一条祖安语录
   */
  const showLast = () => {
    setIsLast(true)
    setText(last)
  }

  /**
   * 复制文字到剪贴板
   */
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
      alert("暂时不支持复制功能")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700 flex flex-col">
      <main className="flex-grow max-w-[800px] p-4 row-auto">
        <section className="mb-6 flex flex-wrap justify-center gap-4 columns-2">
          <button
            onClick={() => getMessage(Level.max)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition">
            😤 火力全开
          </button>

          <button
            onClick={() => getMessage(Level.min)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition">
            🙂 口吐莲花
          </button>
        </section>

        <textarea
          className="mb-6 p-2 border rounded-md block mx-auto w-full max-w-[400px] columns-1"
          rows={4}
          value={text}
          readOnly
        />

        <section className="mb-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={showLast}
            disabled={isLast}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded shadow-md transition disabled:bg-[#CCCCCC]">
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
