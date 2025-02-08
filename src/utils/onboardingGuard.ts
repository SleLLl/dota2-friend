import { redirect } from '@tanstack/react-router';

import { useAppStore } from '../store/app.ts';

export const onboardingGuard = () => {
  if (!useAppStore.getState().isUserOnboarded) {
    throw redirect({
      to: '/onboarding',
    });
  }
};
