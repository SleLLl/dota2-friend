import { createFileRoute } from '@tanstack/react-router';

import Settings from '../components/Settings';
import { beforeLoadGuard } from '../utils/beforeLoadGuard.ts';

export const Route = createFileRoute('/settings')({
  component: Settings,
  beforeLoad: beforeLoadGuard,
});
