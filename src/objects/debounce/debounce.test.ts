import {debounce} from './debounce.js';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce function calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call function with correct arguments', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should handle immediate execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100, {leading: true});

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);

    debouncedFn();
    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle different delay times', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 200);

    debouncedFn();

    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple debounced functions', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const debouncedFn1 = debounce(fn1, 100);
    const debouncedFn2 = debounce(fn2, 200);

    debouncedFn1();
    debouncedFn2();

    vi.advanceTimersByTime(100);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('should handle this context correctly', () => {
    const context = {value: 42};
    const fn = vi.fn(function(this: any) {
      expect(this).toBe(context);
    });
    const debouncedFn = debounce(fn, 100);

    debouncedFn.call(context);

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle edge case with zero delay', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 0);

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle negative delay', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, -100);

    debouncedFn();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});