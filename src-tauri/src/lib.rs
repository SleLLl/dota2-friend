use crate::utils::SteamUtils;

mod server;
mod utils;

#[tauri::command]
fn get_app_path() -> String {
    if let Some(path) = SteamUtils::get_game_path(570) {
        path.display().to_string()
    } else {
        eprintln!("Cannot find the game path to start the server.");
        "None".into()
    }
}

#[cfg(debug_assertions)]
fn prevent_default() -> tauri::plugin::TauriPlugin<tauri::Wry> {
    use tauri_plugin_prevent_default::Flags;

    tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all().difference(Flags::DEV_TOOLS | Flags::RELOAD | Flags::CONTEXT_MENU))
        .build()
}

#[cfg(not(debug_assertions))]
fn prevent_default() -> tauri::plugin::TauriPlugin<tauri::Wry> {
    tauri_plugin_prevent_default::init()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Run the Tauri application
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(prevent_default())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![get_app_path])
        .plugin(tauri_plugin_opener::init())
        .setup(|_| {
            // Spawn the server as an asynchronous task
            tauri::async_runtime::spawn(async {
                if let Err(e) = server::start_server().await {
                    eprintln!("Failed to start the server: {}", e);
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
