import {jest} from '@jest/globals';
import {debounceCompact} from './debounce-compact.js';

describe('debounceCompact', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce function calls and compact arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn('arg1', 'arg2');
    debouncedFn('arg3', 'arg4');
    debouncedFn('arg5', 'arg6');

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg5', 'arg6');
  });

  it('should handle empty arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith();
  });

  it('should handle mixed argument types', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn(1, 'string', {obj: true});
    debouncedFn(2, 'another', {obj: false});

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2, 'another', {obj: false});
  });

  it('should handle trailing execution only', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn('first');
    debouncedFn('second');

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('second');
  });

  it('should handle cancel functionality', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn('first');
    debouncedFn.cancel();

    jest.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();
  });

  it('should handle this context correctly', () => {
    const context = {value: 42};
    const fn = jest.fn(function(this: any) {
      expect(this).toBe(context);
    });
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn.call(context, 'arg');

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle edge case with zero delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 0);

    debouncedFn('arg');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg');
  });

  it('should handle negative delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, -100);

    debouncedFn('arg');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg');
  });

  it('should handle multiple rapid calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounceCompact(fn, 100);

    debouncedFn('call1');
    debouncedFn('call2');
    debouncedFn('call3');
    debouncedFn('call4');
    debouncedFn('call5');

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('call5');
  });
});