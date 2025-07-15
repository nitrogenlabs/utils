/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

export interface ThrottleOptions {
  readonly leading?: boolean;
  readonly trailing?: boolean;
}

export const throttle = (
  func: (...args: any[]) => any,
  wait: number,
  options: ThrottleOptions = {}
) => {
  const { leading = true, trailing = true } = options;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: any[] | undefined;
  let lastThis: any;
  let lastInvokeTime = 0;
  let trailingCallPending = false;

  const invokeFunc = (time: number) => {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = undefined;

    return func.apply(thisArg, args);
  };

  const startTimer = (wait: number) => {
    if (timeoutId === undefined) {
      timeoutId = setTimeout(timerExpired, wait);
    }
  };

  const timerExpired = () => {
    const time = Date.now();
    // Only execute trailing call if lastArgs is set and no new call has come in
    if (trailingCallPending && lastArgs && trailing) {
      invokeFunc(time);
      // Don't update lastInvokeTime for trailing calls
    }
    timeoutId = undefined;
    trailingCallPending = false;
    lastArgs = lastThis = undefined;
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastInvoke = time - lastInvokeTime;
    return timeSinceLastInvoke >= wait;
  };

  function throttled(this: any, ...args: any[]) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    const callForTrailing = trailing && wait > 0;

    if (isInvoking) {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
        trailingCallPending = false;
        lastArgs = lastThis = undefined;
      }
      lastInvokeTime = time;
      if (leading) {
        const result = func.apply(this, args);
        lastInvokeTime = time;

        if (callForTrailing) {
          startTimer(wait);
        }

        lastArgs = lastThis = undefined;
        trailingCallPending = false;
        return result;
      } else if (callForTrailing) {
        lastArgs = args;
        lastThis = this;
        trailingCallPending = true;
        startTimer(wait);
      }
    } else if (callForTrailing) {
      lastArgs = args;
      lastThis = this;
      trailingCallPending = true;
      if (timeoutId === undefined) {
        startTimer(wait - (time - lastInvokeTime));
      }
    }
  }

  throttled.cancel = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    lastInvokeTime = 0;
    lastArgs = lastThis = undefined;
    timeoutId = undefined;
    trailingCallPending = false;
  };

  throttled.flush = () => {
    if (timeoutId !== undefined && trailingCallPending && lastArgs) {
      clearTimeout(timeoutId);
      const result = invokeFunc(Date.now());
      timeoutId = undefined;
      trailingCallPending = false;

      return result;
    }

    return undefined;
  };

  return throttled;
};