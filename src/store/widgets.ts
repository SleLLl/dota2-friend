import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Size = {
  width: number;
  height: number;
};

type Position = {
  x: number;
  y: number;
};

type WidgetsState = {
  [key: string]: {
    show: boolean;
    leadTime: number;
    position: Position;
    size: Size;
  };
};

type Actions = {
  setWidgetSize: (id: string, value: Size) => void;
  setWidgetPosition: (id: string, value: Position) => void;
  setShowWidget: (id: string, value: boolean) => void;
  setWidgetLeadTime: (id: string, value: number) => void;
  reset: () => void;
};

type Store = {
  state: WidgetsState;
} & Actions;

const initialState: WidgetsState = {
  wisdom: {
    show: true,
    leadTime: 15,
    position: {
      x: 140,
      y: 30,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
  stackCamp: {
    show: true,
    leadTime: 10,
    position: {
      x: 299,
      y: 32,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
  creepsPulling: {
    show: true,
    leadTime: 10,
    position: {
      x: 449,
      y: 30,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
  miniMap: {
    show: true,
    leadTime: 10,
    position: {
      x: 20,
      y: 20,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
  performance: {
    show: true,
    leadTime: 10,
    position: {
      x: 20,
      y: 20,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
};

export const useWidgetsStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        state: initialState,
        setWidgetSize: (id, value) => {
          set((store) => ({
            state: {
              ...store.state,
              [id]: {
                ...store.state[id],
                size: value,
              },
            },
          }));
        },
        setWidgetPosition: (id, value) => {
          set((store) => ({
            state: {
              ...store.state,
              [id]: {
                ...store.state[id],
                position: value,
              },
            },
          }));
        },
        setShowWidget: (id: string, value: boolean) => {
          set((store) => ({
            state: {
              ...store.state,
              [id]: {
                ...store.state[id],
                show: value,
              },
            },
          }));
        },
        setWidgetLeadTime: (id: string, value: number) => {
          set((store) => ({
            state: {
              ...store.state,
              [id]: {
                ...store.state[id],
                leadTime: value,
              },
            },
          }));
        },
        reset: () => {
          set(() => initialState);
        },
      }),
      {
        name: 'widget-state',
        version: 0,
      },
    ),
  ),
);
