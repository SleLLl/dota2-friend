import { createFileRoute } from '@tanstack/react-router';

import Settings from '../pages/Settings';
import { windowSetupForSettings } from '../pages/Settings/windowSetup.ts';
import { onboardingGuard } from '../utils/onboardingGuard.ts';
import { pipe } from '../utils/pipe.ts';

export const Route = createFileRoute('/settings')({
  component: Settings,
  beforeLoad: pipe(onboardingGuard, windowSetupForSettings),
});
