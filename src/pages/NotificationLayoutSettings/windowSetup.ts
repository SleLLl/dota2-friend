import { Window } from '@tauri-apps/api/window';

import { withTauri } from '../../utils/withTauri.ts';

export const windowSetupForNotificationLayoutSettings = withTauri(async () => {
  const appWindow = new Window('main');

  await Promise.all([
    appWindow.setAlwaysOnTop(false),
    appWindow.setSkipTaskbar(false),
    appWindow.setIgnoreCursorEvents(false),
    appWindow.setDecorations(true),
    appWindow.maximize(),
  ]);
});
