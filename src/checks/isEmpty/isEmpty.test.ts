/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(false);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty({key: 'value'})).toBe(false);
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    expect(isEmpty(new Set([1, 2, 3]))).toBe(false);
  });

  it('should work with numbers', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(42)).toBe(false);
    expect(isEmpty(-1)).toBe(false);
    expect(isEmpty(NaN)).toBe(false);
    expect(isEmpty(Infinity)).toBe(false);
  });

  it('should work with booleans', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  it('should work with functions', () => {
    expect(isEmpty(() => {})).toBe(false);
    expect(isEmpty(function() {})).toBe(false);
  });

  it('should work with objects with properties', () => {
    expect(isEmpty({a: 1})).toBe(false);
    expect(isEmpty({a: 1, b: 2})).toBe(false);
    expect(isEmpty({length: 0})).toBe(false);
  });

  it('should work with arrays with elements', () => {
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty([null])).toBe(false);
    expect(isEmpty([undefined])).toBe(false);
  });

  it('should work with sparse arrays', () => {
    const sparse = new Array(3);
    expect(isEmpty(sparse)).toBe(false);
  });

  it('should work with objects with non-enumerable properties', () => {
    const obj = {};
    Object.defineProperty(obj, 'key', {
      value: 'value',
      enumerable: false
    });
    expect(isEmpty(obj)).toBe(true);
  });
});