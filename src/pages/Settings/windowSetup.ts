import { Window } from '@tauri-apps/api/window';

import { withTauri } from '../../utils/withTauri.ts';

export const windowSetupForSettings = withTauri(async () => {
  const appWindow = new Window('main');

  await Promise.all([
    appWindow.setSkipTaskbar(false),
    appWindow.setAlwaysOnTop(false),
    appWindow.setIgnoreCursorEvents(false),
    appWindow.setDecorations(true),
    appWindow.unmaximize(),
  ]);
});
