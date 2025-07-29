use rusqlite::Connection;
use std::path::PathBuf;
use std::sync::Mutex;
use anyhow::Result;
use tauri::Manager;

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    /// 初始化数据库连接
    pub fn new(app_handle: &tauri::AppHandle) -> Result<Self> {
        let db_path = get_bundled_database_path(app_handle)?;
        let conn = Connection::open_with_flags(
            db_path,
            rusqlite::OpenFlags::SQLITE_OPEN_READ_ONLY,
        )?;
        
        Ok(Database { conn: Mutex::from(conn) })
    }
    
    /// 获取数据库连接的引用
    pub fn connection(&self) -> &Mutex<Connection> {
        &self.conn
    }
}

/// 获取打包的数据库文件路径
fn get_bundled_database_path(app_handle: &tauri::AppHandle) -> Result<PathBuf> {
    let resource_path = app_handle
        .path()
        .resolve("../../resources/data.db", tauri::path::BaseDirectory::Resource)?;
    
    println!("Database path: {:?}", resource_path);
    Ok(resource_path)
}