/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { isArray } from './isArray';

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(['a', 'b', 'c'])).toBe(true);
    expect(isArray([null, undefined])).toBe(true);
    expect(isArray([{key: 'value'}])).toBe(true);
  });

  it('should return false for non-arrays', () => {
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(42)).toBe(false);
    expect(isArray('string')).toBe(false);
    expect(isArray(true)).toBe(false);
    expect(isArray(false)).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(() => {})).toBe(false);
    expect(isArray(new Date())).toBe(false);
    expect(isArray(new Map())).toBe(false);
    expect(isArray(new Set())).toBe(false);
  });

  it('should work with array-like objects', () => {
    expect(isArray({length: 0, [0]: 'a'})).toBe(false);
    expect(isArray(document.querySelectorAll('div'))).toBe(false);
  });

  it('should work with typed arrays', () => {
    expect(isArray(new Uint8Array())).toBe(false);
    expect(isArray(new Int32Array())).toBe(false);
    expect(isArray(new Float64Array())).toBe(false);
  });

  it('should work with empty arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray(new Array())).toBe(true);
    expect(isArray(Array())).toBe(true);
  });

  it('should work with sparse arrays', () => {
    const sparse = new Array(3);
    expect(isArray(sparse)).toBe(true);
  });
});