/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import { isString } from './isString';

describe('isString', () => {
  it('should return true for string values', () => {
    expect(isString('')).toBe(true);
    expect(isString('hello')).toBe(true);
    expect(isString('42')).toBe(true);
    expect(isString(String('hello'))).toBe(true);
  });

  it('should return false for non-string values', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(42)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(() => {})).toBe(false);
  });

  it('should work with string objects', () => {
    expect(isString(new String('hello'))).toBe(false);
    expect(isString(String('hello'))).toBe(true);
  });

  it('should work with empty strings', () => {
    expect(isString('')).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString(`""`)).toBe(true);
  });

  it('should work with template literals', () => {
    expect(isString(`hello`)).toBe(true);
    expect(isString(`hello ${'world'}`)).toBe(true);
  });

  it('should work with special characters', () => {
    expect(isString('\\n')).toBe(true);
    expect(isString('\\t')).toBe(true);
    expect(isString('\\r')).toBe(true);
    expect(isString('\\b')).toBe(true);
    expect(isString('\\f')).toBe(true);
    expect(isString('\\v')).toBe(true);
  });

  it('should work with unicode strings', () => {
    expect(isString('🎉')).toBe(true);
    expect(isString('🚀')).toBe(true);
    expect(isString('Hello 世界')).toBe(true);
  });

  it('should work with numbers', () => {
    expect(isString(0)).toBe(false);
    expect(isString(42)).toBe(false);
    expect(isString(-1)).toBe(false);
    expect(isString(3.14)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString(Infinity)).toBe(false);
  });

  it('should work with booleans', () => {
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
  });

  it('should work with objects', () => {
    expect(isString({})).toBe(false);
    expect(isString({toString: () => 'hello'})).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isString([])).toBe(false);
    expect(isString(['hello'])).toBe(false);
  });

  it('should work with functions', () => {
    expect(isString(() => {})).toBe(false);
    expect(isString(function() {})).toBe(false);
  });

  it('should work with null and undefined', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });
});