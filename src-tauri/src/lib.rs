use tauri::Manager;
use crate::commands::{get_message};
use crate::database::Database;

mod commands;
mod database;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // 初始化数据库
            match Database::new(app.handle()) {
                Ok(db) => {
                    println!("Database initialized successfully");
                    // 可以将数据库实例存储到应用状态中，供后续使用
                    app.manage(db);
                },
                Err(e) => {
                    eprintln!("Failed to initialize database: {}", e);
                    return Err(Box::from(e));
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
