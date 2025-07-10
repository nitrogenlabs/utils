/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void; flush: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let result: ReturnType<T>;
  let lastArgs: any[] | undefined;
  let lastThis: any;
  let calledLeading = false;
  const {leading = false, trailing = true} = options;

  const invokeFunc = (time: number, context: any, args: any[]) => {
    result = func.apply(context, args);
    return result;
  };

  const startTimer = (pendingFunc: () => void, wait: number) =>
    setTimeout(pendingFunc, wait);
  const cancelTimer = (id: ReturnType<typeof setTimeout>) => clearTimeout(id);

  const leadingEdge = (time: number, context: any, args: any[]) => {
    calledLeading = true;
    // Only schedule trailing timeout if trailing is true and leading is false
    if(trailing && !leading && !timeoutId) {
      timeoutId = startTimer(timerExpired, wait);
    }
    const callResult = leading ? invokeFunc(time, context, args) : result;
    // Clear args if not trailing
    if(!trailing) {
      lastArgs = undefined;
      lastThis = undefined;
    }
    return callResult;
  };

  const shouldInvoke = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0
    );
  };

  const timerExpired = () => {
    const time = Date.now();
    if(trailing && lastArgs && (!leading || !calledLeading)) {
      return trailingEdge(time);
    }
    timeoutId = undefined;
    lastArgs = undefined;
    lastThis = undefined;
    lastCallTime = undefined;
    calledLeading = false;
    return result;
  };

  const trailingEdge = (time: number) => {
    timeoutId = undefined;
    if(trailing && lastArgs) {
      const context = lastThis;
      const args = lastArgs;
      lastArgs = undefined;
      lastThis = undefined;
      lastCallTime = undefined;
      calledLeading = false;
      return invokeFunc(time, context, args);
    }
    lastArgs = undefined;
    lastThis = undefined;
    lastCallTime = undefined;
    calledLeading = false;
    return result;
  };

  const cancel = () => {
    if(timeoutId !== undefined) {
      cancelTimer(timeoutId);
    }
    lastCallTime = undefined;
    timeoutId = undefined;
    lastArgs = undefined;
    lastThis = undefined;
    calledLeading = false;
  };

  const flush = () =>
    (timeoutId === undefined ? result : trailingEdge(Date.now()));

  const debounced = function(this: any, ...args: any[]) {
    if(wait <= 0) {
      return func.apply(this, args);
    }
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    const isFirstCall = timeoutId === undefined;
    lastCallTime = time;
    lastArgs = args;
    lastThis = this;

    if(isInvoking) {
      if(isFirstCall) {
        return leadingEdge(lastCallTime, lastThis, lastArgs);
      }
    }

    // Schedule trailing timeout only if trailing is true and leading is false
    if(trailing && !leading && !timeoutId) {
      timeoutId = startTimer(timerExpired, wait);
    }

    return result;
  } as T & { cancel: () => void; flush: () => void };

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};
