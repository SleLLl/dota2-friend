/* eslint-disable @typescript-eslint/no-explicit-any */

import { isTauri } from '@tauri-apps/api/core';

export const withTauri = <T extends (...args: any[]) => any>(fn: T) => {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> | void {
    if (isTauri()) {
      return fn.apply(this, args);
    }
  };
};
