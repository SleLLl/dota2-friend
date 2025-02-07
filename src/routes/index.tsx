import { createFileRoute } from '@tanstack/react-router';
import { Window } from '@tauri-apps/api/window';
import { useLayoutEffect } from 'react';

import GameModeLayout from '../components/GameModeLayout';
import { useAppStore } from '../store/app.ts';
import { beforeLoadGuard } from '../utils/beforeLoadGuard.ts';
import { checkForAppUpdates } from '../utils/updater.ts';
import { withTauri } from '../utils/withTauri.ts';
import { writeGSIFile } from '../utils/writeGSIFile.ts';

const HomePage = () => {
  const isUserOnboarded = useAppStore((state) => state.isUserOnboarded);

  useLayoutEffect(() => {
    const configure = withTauri(async () => {
      const appWindow = new Window('main');
      await Promise.all([
        appWindow.setDecorations(false),
        appWindow.maximize(),
        appWindow.setIgnoreCursorEvents(true),
      ]);
    });

    if (isUserOnboarded) {
      writeGSIFile();
      configure();
    }

    checkForAppUpdates();
  }, []);

  return <GameModeLayout />;
};

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: beforeLoadGuard,
});
