/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isNumber} from './isNumber.js';

describe('isNumber', () => {
  it('should return true for number values', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(42)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
  });

  it('should return false for non-number values', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber('')).toBe(false);
    expect(isNumber('42')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber(() => {})).toBe(false);
  });

  it('should work with number objects', () => {
    expect(isNumber(new Number(42))).toBe(false);
    expect(isNumber(Number(42))).toBe(true);
  });

  it('should work with edge cases', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
  });

  it('should work with special number values', () => {
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true);
  });

  it('should work with string numbers', () => {
    expect(isNumber('42')).toBe(false);
    expect(isNumber('3.14')).toBe(false);
    expect(isNumber('0')).toBe(false);
    expect(isNumber('')).toBe(false);
  });

  it('should work with boolean values', () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });

  it('should work with objects', () => {
    expect(isNumber({})).toBe(false);
    expect(isNumber({valueOf: () => 42})).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isNumber([])).toBe(false);
    expect(isNumber([42])).toBe(false);
  });

  it('should work with functions', () => {
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(function() {})).toBe(false);
  });
});