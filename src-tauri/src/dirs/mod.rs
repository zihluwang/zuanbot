use anyhow::Result;
use std::path::PathBuf;

/// Get system-wide data dir.
pub fn get_global_data_dir() -> Result<PathBuf> {
    #[cfg(target_os = "macos")]
    let global_data_dir = PathBuf::from("/Library/Application Support/");

    #[cfg(target_os = "windows")]
    let global_data_dir = PathBuf::from("C:\\ProgramData\\");

    #[cfg(target_os = "linux")]
    let global_data_dir = PathBuf::from("/var/lib/");

    Ok(global_data_dir)
}