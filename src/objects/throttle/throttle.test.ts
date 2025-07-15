/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { throttle } from './throttle';

describe('throttle', () => {
  let mockFn: jest.Mock;
  let clock: ReturnType<typeof jest.useFakeTimers>;

  beforeEach(() => {
    mockFn = jest.fn();
    clock = jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('basic functionality', () => {
    it('should throttle function calls', () => {
      const throttled = throttle(mockFn, 100);

      // First call should execute immediately
      throttled('test1');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Second call should be ignored
      throttled('test2');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Advance time and trailing call should execute, then third call should execute as leading call
      clock.advanceTimersByTime(100);
      throttled('test3');
      expect(mockFn).toHaveBeenCalledWith('test3');
      expect(mockFn).toHaveBeenCalledTimes(3); // test1, test2 (trailing), test3 (leading)
    });

    it('should return the result of the function', () => {
      const testFn = jest.fn().mockReturnValue('test result');
      const throttled = throttle(testFn, 100);

      const result = throttled();
      expect(result).toBe('test result');
    });

    it('should pass arguments correctly', () => {
      const throttled = throttle(mockFn, 100);

      throttled('arg1', 'arg2', 123);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });
  });

  describe('leading edge', () => {
    it('should execute on leading edge by default', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test');
      expect(mockFn).toHaveBeenCalledWith('test');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should not execute on leading edge when leading is false', () => {
      const throttled = throttle(mockFn, 100, { leading: false });

      throttled('test');
      expect(mockFn).not.toHaveBeenCalled();

      // Should execute after wait time
      clock.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test');
    });
  });

  describe('trailing edge', () => {
    it('should execute on trailing edge by default', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // After wait time, should execute with last arguments
      clock.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test2');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should not execute on trailing edge when trailing is false', () => {
      const throttled = throttle(mockFn, 100, { trailing: false });

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // After wait time, should not execute
      clock.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('cancel method', () => {
    it('should cancel pending executions', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Cancel before wait time
      throttled.cancel();

      // After wait time, should not execute
      clock.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should reset internal state when cancelled', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test1');
      throttled.cancel();

      // Should be able to call again immediately
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test2');
    });
  });

  describe('flush method', () => {
    it('should immediately execute pending calls', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Flush before wait time
      const result = throttled.flush();
      expect(mockFn).toHaveBeenCalledWith('test2');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should return the result when flushing', () => {
      const testFn = jest.fn().mockReturnValue('flushed result');
      const throttled = throttle(testFn, 100);

      throttled('test1');
      throttled('test2');
      const result = throttled.flush();
      expect(result).toBe('flushed result');
    });

    it('should do nothing when no pending calls', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test');
      throttled.flush(); // Should do nothing since no pending call
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Flush again should do nothing
      throttled.flush();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple rapid calls correctly', () => {
      const throttled = throttle(mockFn, 100);

      // Multiple rapid calls
      for (let i = 0; i < 10; i++) {
        throttled(`test${i}`);
      }

      expect(mockFn).toHaveBeenCalledWith('test0');
      expect(mockFn).toHaveBeenCalledTimes(1);

      // After wait time, should execute with last arguments
      clock.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledWith('test9');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle zero wait time', () => {
      const throttled = throttle(mockFn, 0);

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledWith('test2');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle negative wait time', () => {
      const throttled = throttle(mockFn, -100);

      throttled('test1');
      throttled('test2');
      expect(mockFn).toHaveBeenCalledWith('test1');
      expect(mockFn).toHaveBeenCalledWith('test2');
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle function that returns undefined', () => {
      const undefinedFn = jest.fn().mockReturnValue(undefined);
      const throttled = throttle(undefinedFn, 100);

      const result = throttled('test');
      expect(result).toBeUndefined();
    });

    it('should handle function with no arguments', () => {
      const noArgFn = jest.fn().mockReturnValue('no args');
      const throttled = throttle(noArgFn, 100);

      const result = throttled();
      expect(result).toBe('no args');
      expect(noArgFn).toHaveBeenCalledWith();
    });
  });

  describe('timer management', () => {
    it('should properly manage timers', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test1');
      expect(clock.getTimerCount()).toBe(1);

      throttled('test2');
      expect(clock.getTimerCount()).toBe(1); // Should reuse timer

      clock.advanceTimersByTime(100);
      expect(clock.getTimerCount()).toBe(0); // Timer should be cleared
    });

    it('should clear timers when cancelled', () => {
      const throttled = throttle(mockFn, 100);

      throttled('test');
      expect(clock.getTimerCount()).toBe(1);

      throttled.cancel();
      expect(clock.getTimerCount()).toBe(0);
    });
  });

  describe('context binding', () => {
    it('should preserve function context', () => {
      const context = { value: 'test' };
      const contextFn = jest.fn(function(this: typeof context) {
        return this.value;
      });

      const throttled = throttle(contextFn, 100);
      const result = throttled.call(context);
      expect(result).toBe('test');
      expect(contextFn).toHaveBeenCalledWith();
    });
  });
});