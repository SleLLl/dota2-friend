import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  isUserOnboarded: boolean;
  isGSIsWritten: boolean;
  disableSounds: boolean;
  disableNotifications: boolean;
};

type Actions = {
  setIsUserOnboarded: (value: boolean) => void;
  setDisableSounds: (value: boolean) => void;
  setIsGSIsWritten: (value: boolean) => void;
  setDisableNotifications: (value: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  isUserOnboarded: false,
  isGSIsWritten: false,
  disableSounds: false,
  disableNotifications: false,
};

export const useAppStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setIsUserOnboarded: (value: boolean) => {
          set({ isUserOnboarded: value });
        },
        setDisableSounds: (value: boolean) => {
          set({ disableSounds: value });
        },
        setIsGSIsWritten: (value: boolean) => {
          set({ isGSIsWritten: value });
        },
        setDisableNotifications: (value: boolean) => {
          set({ disableNotifications: value });
        },
        reset: () => {
          set(initialState);
        },
      }),
      {
        name: 'app-state',
        version: 0,
      },
    ),
  ),
);
