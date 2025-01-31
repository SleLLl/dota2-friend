import { createFileRoute } from '@tanstack/react-router';

import NotificationLayoutSettings from '../components/NotificationLayoutSettings';

export const Route = createFileRoute('/notification-layout-settings')({
  component: NotificationLayoutSettings,
});
