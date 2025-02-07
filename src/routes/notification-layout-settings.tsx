import { createFileRoute } from '@tanstack/react-router';

import NotificationLayoutSettings from '../components/NotificationLayoutSettings';
import { beforeLoadGuard } from '../utils/beforeLoadGuard.ts';

export const Route = createFileRoute('/notification-layout-settings')({
  component: NotificationLayoutSettings,
  beforeLoad: beforeLoadGuard,
});
