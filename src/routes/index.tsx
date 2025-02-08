import { createFileRoute } from '@tanstack/react-router';

import GameMode from '../pages/GameMode';
import { windowSetupForGameMode } from '../pages/GameMode/windowSetup.ts';
import { onboardingGuard } from '../utils/onboardingGuard.ts';
import { pipe } from '../utils/pipe.ts';

export const Route = createFileRoute('/')({
  component: GameMode,
  beforeLoad: pipe(onboardingGuard, windowSetupForGameMode),
});
