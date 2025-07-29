/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isBoolean} from './isBoolean.js';

describe('isBoolean', () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(Boolean(true))).toBe(true);
    expect(isBoolean(Boolean(false))).toBe(true);
  });

  it('should return false for non-boolean values', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean('false')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean(Infinity)).toBe(false);
    expect(isBoolean(-Infinity)).toBe(false);
  });

  it('should work with boolean objects', () => {
    expect(isBoolean(new Boolean(true))).toBe(false);
    expect(isBoolean(new Boolean(false))).toBe(false);
  });

  it('should work with falsy values', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
  });

  it('should work with truthy values', () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean('hello')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});