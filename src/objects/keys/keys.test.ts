import {keys} from './keys.js';

describe('keys', () => {
  it('should return array of object keys', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = keys(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = keys(obj);
    expect(result).toEqual([]);
  });

  it('should handle object with string keys', () => {
    const obj = {'hello': 'world', 'test': 'value'};
    const result = keys(obj);
    expect(result).toEqual(['hello', 'test']);
  });

  it('should handle object with number keys', () => {
    const obj = {1: 'one', 2: 'two', 3: 'three'};
    const result = keys(obj);
    expect(result).toEqual(['1', '2', '3']);
  });

  it('should handle object with mixed key types', () => {
    const obj = {a: 1, '2': 'two', c: true};
    const result = keys(obj);
    expect(result).toHaveLength(3);
    expect(result).toContain('a');
    expect(result).toContain('2');
    expect(result).toContain('c');
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const result = keys(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle object with nested objects', () => {
    const obj = {a: {x: 1, y: 2}, b: [1, 2, 3]};
    const result = keys(obj);
    expect(result).toEqual(['a', 'b']);
  });

  it('should handle object with functions', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const result = keys(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1};
    const result = keys(obj);
    expect(result).toEqual(['a']);
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const result = keys(obj);
    expect(result).toEqual(['_value', 'value']);
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const result = keys(obj);
    expect(result).toEqual(['a', 'b']);
  });

  it('should handle null and undefined input', () => {
    expect(() => keys(null as any)).toThrow();
    expect(() => keys(undefined as any)).toThrow();
  });

  it('should handle array input', () => {
    const arr = ['a', 'b', 'c'];
    const result = keys(arr);
    expect(result).toEqual(['0', '1', '2']);
  });

  it('should handle string input', () => {
    const str = 'hello';
    const result = keys(str);
    expect(result).toEqual(['0', '1', '2', '3', '4']);
  });

  it('should handle object with empty string key', () => {
    const obj = {'': 'empty', a: 1};
    const result = keys(obj);
    expect(result).toEqual(['', 'a']);
  });

  it('should handle object with numeric string keys', () => {
    const obj = {'0': 'zero', '1': 'one', '2': 'two'};
    const result = keys(obj);
    expect(result).toEqual(['0', '1', '2']);
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';
    const result = keys(objWithProto);
    expect(result).toEqual(['own']);
  });

  it('should handle object with all enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });
    const result = keys(obj);
    expect(result).toEqual(['a', 'b', 'c']);
  });
});