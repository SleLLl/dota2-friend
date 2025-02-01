import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';

import game from '../core/game.ts';

const Root = () => {
  useEffect(() => {
    game.init();

    return () => {
      game.dispose();
    };
  }, []);

  return <Outlet />;
};

export const Route = createRootRoute({
  component: Root,
});
