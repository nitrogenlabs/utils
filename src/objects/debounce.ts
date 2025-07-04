export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void; flush: () => void } => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let result: ReturnType<T>;
  const { leading = false, trailing = true } = options;

  const invokeFunc = (time: number, ...args: any[]) => {
    result = func.apply(undefined, args);
    return result;
  };

  const startTimer = (pendingFunc: () => void, wait: number) =>
    setTimeout(pendingFunc, wait);
  const cancelTimer = (id: ReturnType<typeof setTimeout>) => clearTimeout(id);

  const leadingEdge = (time: number, ...args: any[]) => {
    timeoutId = startTimer(timerExpired, wait);
    return leading ? invokeFunc(time, ...args) : result;
  };

  const remainingWait = (time: number) => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeWaiting = wait - timeSinceLastCall;
    return timeWaiting > 0 ? timeWaiting : 0;
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
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timeoutId = startTimer(timerExpired, remainingWait(time));
    return undefined;
  };

  const trailingEdge = (time: number) => {
    timeoutId = undefined;
    if (trailing && lastCallTime) {
      return invokeFunc(time);
    }
    lastCallTime = undefined;
    return result;
  };

  const cancel = () => {
    if (timeoutId !== undefined) {
      cancelTimer(timeoutId);
    }
    lastCallTime = undefined;
    timeoutId = undefined;
  };

  const flush = () =>
    timeoutId === undefined ? result : trailingEdge(Date.now());

  const debounced = function (this: any, ...args: any[]) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastCallTime = time;
    if (isInvoking) {
      if (timeoutId === undefined) {
        return leadingEdge(lastCallTime, ...args);
      }
      if (trailing) {
        timeoutId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime, ...args);
      }
    }
    if (timeoutId === undefined) {
      timeoutId = startTimer(timerExpired, wait);
    }
    return result;
  } as T & { cancel: () => void; flush: () => void };

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};
