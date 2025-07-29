/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isFunction} from './isFunction.js';

describe('isFunction', () => {
  it('should return true for function values', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function() {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function*() {})).toBe(true);
    expect(isFunction(async function*() {})).toBe(true);
  });

  it('should return false for non-function values', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(42)).toBe(false);
    expect(isFunction('string')).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction(new Date())).toBe(false);
  });

  it('should work with built-in functions', () => {
    expect(isFunction(Array.isArray)).toBe(true);
    expect(isFunction(Object.keys)).toBe(true);
    expect(isFunction(parseInt)).toBe(true);
    expect(isFunction(console.log)).toBe(true);
  });

  it('should work with class constructors', () => {
    class TestClass {}
    expect(isFunction(TestClass)).toBe(true);
    expect(isFunction(Date)).toBe(true);
    expect(isFunction(Array)).toBe(true);
  });

  it('should work with arrow functions', () => {
    const arrowFn = () => {};
    expect(isFunction(arrowFn)).toBe(true);
  });

  it('should work with function expressions', () => {
    const fnExpr = function() {};
    expect(isFunction(fnExpr)).toBe(true);
  });

  it('should work with async functions', () => {
    const asyncFn = async () => {};
    expect(isFunction(asyncFn)).toBe(true);
  });

  it('should work with generator functions', () => {
    function* genFn() { yield 1; }
    expect(isFunction(genFn)).toBe(true);
  });

  it('should work with async generator functions', () => {
    async function* asyncGenFn() { yield 1; }
    expect(isFunction(asyncGenFn)).toBe(true);
  });
});