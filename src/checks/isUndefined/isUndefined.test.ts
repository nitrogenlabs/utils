/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { isUndefined } from './isUndefined';

describe('isUndefined', () => {
  it('should return true for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return false for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined(() => {})).toBe(false);
    expect(isUndefined(42)).toBe(false);
    expect(isUndefined('hello')).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined(Infinity)).toBe(false);
    expect(isUndefined(-Infinity)).toBe(false);
  });

  it('should work with objects', () => {
    expect(isUndefined({})).toBe(false);
    expect(isUndefined({key: 'value'})).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Array())).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isUndefined([])).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined([undefined])).toBe(false);
  });

  it('should work with functions', () => {
    expect(isUndefined(() => {})).toBe(false);
    expect(isUndefined(function() {})).toBe(false);
    expect(isUndefined(async () => {})).toBe(false);
  });

  it('should work with primitives', () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(42)).toBe(false);
    expect(isUndefined('hello')).toBe(false);
  });

  it('should work with special values', () => {
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined(Infinity)).toBe(false);
    expect(isUndefined(-Infinity)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(-0)).toBe(false);
  });

  it('should work with null', () => {
    expect(isUndefined(null)).toBe(false);
  });

  it('should work with falsy values that are not undefined', () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
  });
});