import { defaultWindowIcon } from '@tauri-apps/api/app';
import { Menu } from '@tauri-apps/api/menu';
import { TrayIcon } from '@tauri-apps/api/tray';
import { Window } from '@tauri-apps/api/window';
import { relaunch } from '@tauri-apps/plugin-process';

import { router } from '../router.ts';
import { withTauri } from '../utils/withTauri.ts';

const setup = withTauri(async () => {
  const menu = await Menu.new({
    items: [
      {
        id: 'notification-layout-settings',
        text: 'Notification layout settings',
        action: async () => {
          await router.navigate({
            to: '/notification-layout-settings',
          });
        },
      },
      {
        id: 'settings',
        text: 'Settings',
        action: async () => {
          await router.navigate({
            to: '/settings',
          });
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
    icon: (await defaultWindowIcon()) ?? undefined,
    tooltip: 'Dota 2 friend',
  };

  await TrayIcon.new(options);
});

setup();
