import { Window } from '@tauri-apps/api/window';

import { withTauri } from '../../utils/withTauri.ts';

export const windowSetupForGameMode = withTauri(async () => {
  const appWindow = new Window('main');

  await Promise.all([
    appWindow.setDecorations(false),
    appWindow.setSkipTaskbar(true),
    appWindow.setAlwaysOnTop(true),
    appWindow.setIgnoreCursorEvents(true),
    appWindow.maximize(),
  ]);
});
