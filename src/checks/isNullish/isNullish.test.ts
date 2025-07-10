/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { isNullish } from './isNullish';

describe('isNullish', () => {
  it('should return true for nullish values', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('should return false for non-nullish values', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish(() => {})).toBe(false);
    expect(isNullish(42)).toBe(false);
    expect(isNullish('hello')).toBe(false);
    expect(isNullish(true)).toBe(false);
    expect(isNullish(NaN)).toBe(false);
    expect(isNullish(Infinity)).toBe(false);
    expect(isNullish(-Infinity)).toBe(false);
  });

  it('should work with falsy values that are not nullish', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish(NaN)).toBe(false);
  });

  it('should work with objects', () => {
    expect(isNullish({})).toBe(false);
    expect(isNullish({key: 'value'})).toBe(false);
    expect(isNullish(new Date())).toBe(false);
    expect(isNullish(new Array())).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isNullish([])).toBe(false);
    expect(isNullish([1, 2, 3])).toBe(false);
    expect(isNullish([null])).toBe(false);
    expect(isNullish([undefined])).toBe(false);
  });

  it('should work with functions', () => {
    expect(isNullish(() => {})).toBe(false);
    expect(isNullish(function() {})).toBe(false);
    expect(isNullish(async () => {})).toBe(false);
  });

  it('should work with primitives', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish(true)).toBe(false);
    expect(isNullish(42)).toBe(false);
    expect(isNullish('hello')).toBe(false);
  });

  it('should work with special values', () => {
    expect(isNullish(NaN)).toBe(false);
    expect(isNullish(Infinity)).toBe(false);
    expect(isNullish(-Infinity)).toBe(false);
    expect(isNullish(0)).toBe(false);
    expect(isNullish(-0)).toBe(false);
  });
});