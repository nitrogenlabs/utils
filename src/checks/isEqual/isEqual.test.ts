/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isEqual} from './isEqual.js';

describe('isEqual', () => {
  it('should return true for identical primitive values', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(false, false)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(isEqual([1, 2], [2, 1])).toBe(false);
  });

  it('should work with objects', () => {
    expect(isEqual({a: 1, b: 2}, {a: 1, b: 2})).toBe(true);
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({a: 1}, {a: 2})).toBe(false);
    expect(isEqual({a: 1}, {b: 1})).toBe(false);
  });

  it('should work with nested objects', () => {
    const obj1 = {a: {b: 1, c: 2}};
    const obj2 = {a: {b: 1, c: 2}};
    expect(isEqual(obj1, obj2)).toBe(true);
  });

  it('should work with nested arrays', () => {
    const arr1 = [[1, 2], [3, 4]];
    const arr2 = [[1, 2], [3, 4]];
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it('should handle mixed types', () => {
    const mixed1 = {a: [1, 2], b: {c: 3}};
    const mixed2 = {a: [1, 2], b: {c: 3}};
    expect(isEqual(mixed1, mixed2)).toBe(true);
  });

  it('should handle edge cases', () => {
    expect(isEqual(NaN, NaN)).toBe(false);
    expect(isEqual(0, -0)).toBe(true);
    expect(isEqual(Infinity, Infinity)).toBe(true);
    expect(isEqual(-Infinity, -Infinity)).toBe(true);
  });

  it('should handle functions', () => {
    const fn1 = () => {};
    const fn2 = () => {};
    expect(isEqual(fn1, fn1)).toBe(true);
    expect(isEqual(fn1, fn2)).toBe(false);
  });

  it('should handle dates', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    const date3 = new Date('2023-01-02');
    expect(isEqual(date1, date2)).toBe(true);
    expect(isEqual(date1, date3)).toBe(false);
  });
});