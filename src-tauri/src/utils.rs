use std::path::{Path, PathBuf};
use vdf_parser::{parse_vdf_text, VdfAttribute, VdfValue};
use winreg::enums::*;
use winreg::RegKey;

pub struct SteamUtils;

impl SteamUtils {
    pub fn get_game_path(game_id: u32) -> Option<PathBuf> {
        let steam_path = Self::get_steam_install_path()?;
        let libraries_file = steam_path.join("steamapps").join("libraryfolders.vdf");

        let library_data = std::fs::read_to_string(libraries_file).ok()?;
        let root = parse_vdf_text(&library_data).ok()?;

        // Get library folders
        if let VdfValue::Block(library_folders) = &root.value {
            for (_, library) in library_folders {
                if let VdfValue::Block(lib_data) = &library.value {
                    // Get library path
                    if let Some(VdfAttribute {
                        value: VdfValue::String(library_path),
                        ..
                    }) = lib_data.get("path")
                    {
                        let manifest_path = Path::new(library_path)
                            .join("steamapps")
                            .join(format!("appmanifest_{}.acf", game_id));

                        // Parse app manifest
                        if let Some(install_dir) = Self::parse_appmanifest(&manifest_path) {
                            let game_path = Path::new(library_path)
                                .join("steamapps")
                                .join("common")
                                .join(install_dir);

                            if game_path.exists() {
                                return Some(game_path);
                            }
                        }
                    }
                }
            }
        }

        None
    }

    fn get_steam_install_path() -> Option<PathBuf> {
        let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);

        let paths_to_try = [
            "SOFTWARE\\Valve\\Steam",
            "SOFTWARE\\Wow6432Node\\Valve\\Steam",
        ];

        for path in paths_to_try {
            if let Ok(steam_key) = hklm.open_subkey_with_flags(path, KEY_READ) {
                if let Ok(install_path) = steam_key.get_value::<String, _>("InstallPath") {
                    return Some(PathBuf::from(install_path));
                }
            }
        }

        None
    }

    fn parse_appmanifest(path: &Path) -> Option<String> {
        let manifest = std::fs::read_to_string(path).ok()?;
        let root = parse_vdf_text(&manifest).ok()?;

        if let VdfValue::Block(app_state) = &root.value {
            if let Some(VdfAttribute {
                value: VdfValue::String(install_dir),
                ..
            }) = app_state.get("installdir")
            {
                return Some(install_dir.clone());
            }
        }

        None
    }
}
