import {jest} from '@jest/globals';
import {debounce} from './debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should debounce function calls', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call function with correct arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle immediate execution', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 100, {leading: true});

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);

    debouncedFn();
    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle different delay times', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 200);

    debouncedFn();

    jest.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple debounced functions', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const debouncedFn1 = debounce(fn1, 100);
    const debouncedFn2 = debounce(fn2, 200);

    debouncedFn1();
    debouncedFn2();

    jest.advanceTimersByTime(100);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('should handle this context correctly', () => {
    const context = {value: 42};
    const fn = jest.fn(function(this: any) {
      expect(this).toBe(context);
    });
    const debouncedFn = debounce(fn, 100);

    debouncedFn.call(context);

    jest.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle edge case with zero delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 0);

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle negative delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, -100);

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});