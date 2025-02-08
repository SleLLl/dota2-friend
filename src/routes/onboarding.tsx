import { createFileRoute } from '@tanstack/react-router';

import Onboarding from '../pages/Onboarding';
import { windowSetupForOnboarding } from '../pages/Onboarding/windowSetup.ts';

export const Route = createFileRoute('/onboarding')({
  component: Onboarding,
  beforeLoad: windowSetupForOnboarding,
});
