import { createFileRoute } from '@tanstack/react-router';

import NotificationLayoutSettings from '../pages/NotificationLayoutSettings';
import { windowSetupForNotificationLayoutSettings } from '../pages/NotificationLayoutSettings/windowSetup.ts';
import { onboardingGuard } from '../utils/onboardingGuard.ts';
import { pipe } from '../utils/pipe.ts';

export const Route = createFileRoute('/notification-layout-settings')({
  component: NotificationLayoutSettings,
  beforeLoad: pipe(onboardingGuard, windowSetupForNotificationLayoutSettings),
});
