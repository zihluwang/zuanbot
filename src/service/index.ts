import { invoke } from "@tauri-apps/api/core"
import { Level } from "@/types"

/**
 * 从服务端获取下一条祖安语录
 * @param level 祖安级别
 */
export async function nextZuan(level?: Level) {
  return await invoke<string>("get_message", { level })
}
