import { ask } from '@tauri-apps/plugin-dialog';
import { relaunch } from '@tauri-apps/plugin-process';
import { check } from '@tauri-apps/plugin-updater';

import { withTauri } from './withTauri.ts';

export const checkForAppUpdates = withTauri(async () => {
  try {
    const update = await check();

    if (update?.available) {
      const yes = await ask(
        `
Update to ${update.version} is available!
Release notes: ${update.body}
        `,
        {
          title: 'Update Now!',
          kind: 'info',
          okLabel: 'Update',
          cancelLabel: 'Cancel',
        },
      );

      if (yes) {
        await update.downloadAndInstall();
        await relaunch();
      }
    }
  } catch (error) {
    console.error(`Error during update: ${error}`);
  }
});
