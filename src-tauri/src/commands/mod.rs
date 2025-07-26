use tauri::{State};
use rusqlite::{OptionalExtension};
use crate::database::Database; // 自己定义的含互斥锁包装 SQLite 连接的结构

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn get_message(state: State<'_, Database>, level: Option<String>) -> Result<String, String> {
    let conn = state.connection().lock().map_err(|e| e.to_string())?;

    let mut stmt = if let Some(ref _level) = level {
        conn.prepare("SELECT `text` FROM `main` WHERE LEVEL = ?1 ORDER BY RANDOM() LIMIT 1")
            .map_err(|e| e.to_string())?
    } else {
        conn.prepare("SELECT `text` FROM `main` ORDER BY RANDOM() LIMIT 1")
            .map_err(|e| e.to_string())?
    };

    let message_opt: Option<String> = if let Some(_level) = &level {
        stmt.query_row([_level], |row| row.get(0)).optional().map_err(|e| e.to_string())?
    } else {
        stmt.query_row([], |row| row.get(0)).optional().map_err(|e| e.to_string())?
    };

    Ok(message_opt.unwrap_or_default())
}