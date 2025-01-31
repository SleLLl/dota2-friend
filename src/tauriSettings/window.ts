import { CloseRequestedEvent, Window } from '@tauri-apps/api/window';

import { withTauri } from '../utils/withTauri.ts';

const setup = withTauri(async () => {
  const appWindow = new Window('main');

  appWindow.listen<CloseRequestedEvent>('tauri://close-requested', async () => {
    const isVisible = await appWindow.isVisible();

    const store = (await import('../store/app.ts')).useAppStore.getState();

    if (isVisible && store.isUserOnboarded) {
      await appWindow.hide();
      const module = await import('../app.tsx');
      await module.router.navigate({
        to: '/',
      });
    } else {
      await appWindow.destroy();
    }
  });
});

setup();
