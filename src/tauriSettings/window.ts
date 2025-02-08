import { CloseRequestedEvent, Window } from '@tauri-apps/api/window';

import { router } from '../router.ts';
import { useAppStore } from '../store/app.ts';
import { withTauri } from '../utils/withTauri.ts';

const setup = withTauri(async () => {
  const appWindow = new Window('main');

  appWindow.listen<CloseRequestedEvent>('tauri://close-requested', async () => {
    const isVisible = await appWindow.isVisible();

    const store = useAppStore.getState();

    if (isVisible && store.isUserOnboarded) {
      await router.navigate({
        to: '/',
      });
    } else {
      await appWindow.destroy();
    }
  });
});

setup();
