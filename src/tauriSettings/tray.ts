import { isTauri } from '@tauri-apps/api/core';
import { Menu } from '@tauri-apps/api/menu';
import { TrayIcon } from '@tauri-apps/api/tray';
import { Window } from '@tauri-apps/api/window';
import { relaunch } from '@tauri-apps/plugin-process';

if (isTauri()) {
  const menu = await Menu.new({
    items: [
      {
        id: 'notification-layout-settings',
        text: 'Notification layout settings',
        action: async () => {
          const module = await import('../app.tsx');
          const appWindow = new Window('main');

          await module.router.navigate({
            to: '/notification-layout-settings',
          });

          await Promise.all([
            appWindow.setDecorations(true),
            appWindow.maximize(),
            appWindow.setIgnoreCursorEvents(false),
          ]);

          await appWindow.show();
        },
      },
      {
        id: 'settings',
        text: 'Settings',
        action: async () => {
          const module = await import('../app.tsx');

          await module.router.navigate({
            to: '/settings',
          });

          const appWindow = new Window('main');
          await Promise.all([
            appWindow.setDecorations(true),
            appWindow.unmaximize(),
            appWindow.setIgnoreCursorEvents(false),
          ]);

          await appWindow.show();
        },
      },
      {
        id: 'hard-reset',
        text: 'Reset settings',
        action: async () => {
          window.localStorage.clear();
          await relaunch();
        },
      },
      {
        id: 'quit',
        text: 'Quit',
        action: () => {
          Window.getAll().then((windows) => {
            windows.forEach((window) => {
              window.close();
            });
          });
        },
      },
    ],
  });

  const options = {
    menu,
    menuOnLeftClick: true,
    icon: 'icons/32x32.png',
    tooltip: 'Dota 2 friend',
  };

  await TrayIcon.new(options);
}
