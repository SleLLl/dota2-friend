import { invoke } from '@tauri-apps/api/core';
import { create, exists, mkdir } from '@tauri-apps/plugin-fs';

import { useAppStore } from '../store/app.ts';
import { withTauri } from './withTauri.ts';

const fileContent = `"gamestate_integration"
{
    "uri"          "http://localhost:3000/"
    "timeout"      "5.0"
    "buffer"       "0.1"
    "throttle"     "0.1"
    "heartbeat"    "10.0"

    "data"
    {
        "map"             "1"
        "player"          "1"
        "hero"            "1"
        "abilities"       "1"
        "items"           "1"
        "events"          "1"
        "buildings"       "1"
        "league"          "1"
        "draft"           "1"
        "minimap"         "1"
        "roshan"          "1"
        "neutralitems"    "1"
    }
}
`;

export const writeGSIFile = withTauri(async () => {
  const isGSIsWritten = useAppStore.getState().isGSIsWritten;

  if (isGSIsWritten) {
    return;
  }

  const gamePath: string = await invoke('get_app_path');
  if (gamePath === 'None') {
    console.error('Game path not found.');
    return;
  }

  const gsiFolder = `${gamePath}\\game\\dota\\cfg\\gamestate_integration\\`;
  const fileName = 'gamestate_integration_dota2-imba-gsi.cfg';
  const isFileWritten = await exists(gsiFolder + fileName);

  if (isFileWritten) {
    return;
  }

  const isFolderExists = await exists(gsiFolder);
  if (!isFolderExists) {
    await mkdir(gsiFolder);
  }

  const file = await create(gsiFolder + fileName);
  await file.write(new TextEncoder().encode(fileContent));
  await file.close();
  useAppStore.getState().setIsGSIsWritten(true);
  console.log('File written to: ' + file);
});
