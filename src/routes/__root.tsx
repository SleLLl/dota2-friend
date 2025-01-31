import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useEffect } from 'react';

import game from '../core/game.ts';

const Root = () => {
  useEffect(() => {
    game.init();

    return () => {
      game.dispose();
    };
  }, []);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
