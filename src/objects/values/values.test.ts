import {values} from './values.js';

describe('values', () => {
  it('should return array of object values', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = values(obj);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = values(obj);
    expect(result).toEqual([]);
  });

  it('should handle object with string values', () => {
    const obj = {a: 'hello', b: 'world', c: 'test'};
    const result = values(obj);
    expect(result).toEqual(['hello', 'world', 'test']);
  });

  it('should handle object with mixed value types', () => {
    const obj = {a: 1, b: 'string', c: true, d: null};
    const result = values(obj);
    expect(result).toEqual([1, 'string', true, null]);
  });

  it('should handle object with nested objects', () => {
    const obj = {a: {x: 1}, b: [1, 2, 3], c: 'test'};
    const result = values(obj);
    expect(result).toEqual([{x: 1}, [1, 2, 3], 'test']);
  });

  it('should handle object with functions', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const result = values(obj);
    expect(result).toEqual([1, fn, 3]);
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const result = values(obj);
    expect(result).toEqual([null, undefined, 3]);
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1};
    const result = values(obj);
    expect(result).toHaveLength(2);
    expect(result).toContain('value');
    expect(result).toContain(1);
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const result = values(obj);
    expect(result).toEqual([0, 0]);
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const result = values(obj);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle null and undefined input', () => {
    expect(values(null as any)).toEqual([]);
    expect(values(undefined as any)).toEqual([]);
  });

  it('should handle object with empty string keys', () => {
    const obj = {'': 'empty', a: 1};
    const result = values(obj);
    expect(result).toEqual(['empty', 1]);
  });

  it('should handle object with numeric string keys', () => {
    const obj = {'0': 'zero', '1': 'one', '2': 'two'};
    const result = values(obj);
    expect(result).toEqual(['zero', 'one', 'two']);
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';
    const result = values(objWithProto);
    expect(result).toEqual(['own value']);
  });

  it('should handle object with all enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });
    const result = values(obj);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle object with complex values', () => {
    const fn = () => 'function';
    const obj = {
      a: {nested: true},
      b: [1, 2, 3],
      c: fn,
      d: null,
      e: undefined
    };
    const result = values(obj);
    expect(result).toHaveLength(5);
    expect(result).toContainEqual({nested: true});
    expect(result).toContainEqual([1, 2, 3]);
    expect(result).toContain(fn);
    expect(result).toContain(null);
    expect(result).toContain(undefined);
  });

  it('should handle object with boolean values', () => {
    const obj = {a: true, b: false, c: 1};
    const result = values(obj);
    expect(result).toEqual([true, false, 1]);
  });

  it('should handle object with number values', () => {
    const obj = {a: 1, b: 2.5, c: -3, d: 0};
    const result = values(obj);
    expect(result).toEqual([1, 2.5, -3, 0]);
  });

  it('should handle object with array values', () => {
    const obj = {a: [1, 2], b: ['a', 'b'], c: []};
    const result = values(obj);
    expect(result).toEqual([[1, 2], ['a', 'b'], []]);
  });

  it('should handle object with object values', () => {
    const obj = {a: {x: 1}, b: {}, c: {nested: {deep: true}}};
    const result = values(obj);
    expect(result).toEqual([{x: 1}, {}, {nested: {deep: true}}]);
  });
});