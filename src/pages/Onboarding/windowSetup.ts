import { Window } from '@tauri-apps/api/window';

import { withTauri } from '../../utils/withTauri.ts';

export const windowSetupForOnboarding = withTauri(async () => {
  const appWindow = new Window('main');

  await Promise.all([
    appWindow.setSkipTaskbar(false),
    appWindow.setIgnoreCursorEvents(false),
    appWindow.setAlwaysOnTop(false),
    appWindow.setDecorations(true),
    appWindow.unmaximize(),
  ]);
});
