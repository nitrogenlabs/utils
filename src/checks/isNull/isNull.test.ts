/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isNull} from './isNull.js';

describe('isNull', () => {
  it('should return true for null values', () => {
    expect(isNull(null)).toBe(true);
  });

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull({})).toBe(false);
    expect(isNull(() => {})).toBe(false);
    expect(isNull(42)).toBe(false);
    expect(isNull('hello')).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(NaN)).toBe(false);
    expect(isNull(Infinity)).toBe(false);
    expect(isNull(-Infinity)).toBe(false);
  });

  it('should work with objects', () => {
    expect(isNull({})).toBe(false);
    expect(isNull({key: 'value'})).toBe(false);
    expect(isNull(new Date())).toBe(false);
    expect(isNull(new Array())).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isNull([])).toBe(false);
    expect(isNull([1, 2, 3])).toBe(false);
    expect(isNull([null])).toBe(false);
  });

  it('should work with functions', () => {
    expect(isNull(() => {})).toBe(false);
    expect(isNull(function() {})).toBe(false);
    expect(isNull(async () => {})).toBe(false);
  });

  it('should work with primitives', () => {
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull(true)).toBe(false);
    expect(isNull(42)).toBe(false);
    expect(isNull('hello')).toBe(false);
  });

  it('should work with special values', () => {
    expect(isNull(NaN)).toBe(false);
    expect(isNull(Infinity)).toBe(false);
    expect(isNull(-Infinity)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull(-0)).toBe(false);
  });
});