import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

import game from '../core/game.ts';
import { useAppStore } from '../store/app.ts';
import { checkForAppUpdates } from '../utils/updater.ts';
import { writeGSIFile } from '../utils/writeGSIFile.ts';

const Root = () => {
  const isUserOnboarded = useAppStore((state) => state.isUserOnboarded);

  useEffect(() => {
    game.init();

    checkForAppUpdates();

    if (isUserOnboarded) {
      writeGSIFile();
    }

    return () => {
      game.dispose();
    };
  }, [isUserOnboarded]);

  return <Outlet />;
};

export const Route = createRootRoute({
  component: Root,
});
