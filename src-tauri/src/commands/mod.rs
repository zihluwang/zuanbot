#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn get_message(level: &str) -> String {
    println!("level = {level}");
    "".to_string()
}