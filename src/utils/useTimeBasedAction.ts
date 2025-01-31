import { useCallback, useRef, useState } from 'react';

interface Params {
  time: number;
  callback?: () => void;
}

export const useTimeBasedAction = (params: Params) => {
  const [active, setActive] = useState<boolean>(false);
  const timerRef = useRef<number | undefined>();

  const trigger = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }

    setActive(true);
    if (params.callback) params.callback();

    timerRef.current = window.setTimeout(() => setActive(false), params.time);
  }, [params.time, params.callback]);

  return [active, trigger] as const;
};
