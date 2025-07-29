/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isPlainObject} from './isPlainObject.js';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({key: 'value'})).toBe(true);
    expect(isPlainObject({a: 1, b: 2})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('should return false for non-plain objects', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
  });

  it('should work with built-in objects', () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Array())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new RegExp(''))).toBe(false);
    expect(isPlainObject(new Error())).toBe(false);
  });

  it('should work with class instances', () => {
    class TestClass {}
    expect(isPlainObject(new TestClass())).toBe(false);
  });

  it('should work with functions', () => {
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(function() {})).toBe(false);
    expect(isPlainObject(async () => {})).toBe(false);
  });

  it('should work with arrays', () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(new Array())).toBe(false);
  });

  it('should work with primitives', () => {
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(NaN)).toBe(false);
    expect(isPlainObject(Infinity)).toBe(false);
  });

  it('should work with null and undefined', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('should work with objects created with Object.create', () => {
    expect(isPlainObject(Object.create({}))).toBe(false);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('should work with objects that have prototypes', () => {
    const obj = {};
    Object.setPrototypeOf(obj, {});
    expect(isPlainObject(obj)).toBe(false);
  });
});