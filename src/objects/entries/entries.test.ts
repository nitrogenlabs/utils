import {entries} from './entries.js';

describe('entries', () => {
  it('should return array of key-value pairs', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = entries(obj);
    expect(result).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = entries(obj);
    expect(result).toEqual([]);
  });

  it('should handle object with string keys', () => {
    const obj = {'hello': 'world', 'test': 'value'};
    const result = entries(obj);
    expect(result).toEqual([['hello', 'world'], ['test', 'value']]);
  });

  it('should handle object with number keys', () => {
    const obj = {1: 'one', 2: 'two', 3: 'three'};
    const result = entries(obj);
    expect(result).toEqual([['1', 'one'], ['2', 'two'], ['3', 'three']]);
  });

  it('should handle object with mixed key types', () => {
    const obj = {a: 1, '2': 'two', c: true};
    const result = entries(obj);
    expect(result).toHaveLength(3);
    expect(result).toContainEqual(['a', 1]);
    expect(result).toContainEqual(['2', 'two']);
    expect(result).toContainEqual(['c', true]);
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const result = entries(obj);
    expect(result).toEqual([['a', null], ['b', undefined], ['c', 3]]);
  });

  it('should handle object with nested objects', () => {
    const obj = {a: {x: 1, y: 2}, b: [1, 2, 3]};
    const result = entries(obj);
    expect(result).toEqual([['a', {x: 1, y: 2}], ['b', [1, 2, 3]]]);
  });

  it('should handle object with functions', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const result = entries(obj);
    expect(result).toEqual([['a', 1], ['b', fn], ['c', 3]]);
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1};
    const result = entries(obj);
    expect(result).toEqual([['a', 1]]);
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const result = entries(obj);
    expect(result).toEqual([['_value', 0], ['value', 0]]);
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const result = entries(obj);
    expect(result).toEqual([['a', 1], ['b', 2]]);
  });

  it('should handle null and undefined input', () => {
    expect(() => entries(null as any)).toThrow();
    expect(() => entries(undefined as any)).toThrow();
  });
});