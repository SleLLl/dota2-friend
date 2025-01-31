import { Window } from '@tauri-apps/api/window';

export const windowSetupForNotificationLayoutSettings = async () => {
  const appWindow = new Window('main');

  await Promise.all([
    appWindow.setDecorations(true),
    appWindow.maximize(),
    appWindow.setIgnoreCursorEvents(false),
  ]);
};
