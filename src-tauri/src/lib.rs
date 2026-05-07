mod bridge;
mod commands;
mod models;
mod persistence;
mod playback;
mod support;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::playback_commands::get_playback_boundary_status
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
