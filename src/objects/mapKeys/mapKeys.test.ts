import {jest} from '@jest/globals';
import {mapKeys} from './mapKeys';

describe('mapKeys', () => {
  it('should transform object keys using iteratee function', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number, key: string | symbol) => key.toString().toUpperCase() as string;
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({A: 1, B: 2, C: 3});
  });

  it('should handle empty object', () => {
    const obj = {};
    const iteratee = (value: any, key: string | symbol) => key.toString().toUpperCase() as string;
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({});
  });

  it('should pass correct parameters to iteratee', () => {
    const obj = {a: 1, b: 2};
    const iteratee = jest.fn((value: number, key: string | symbol) => key.toString() + '_' + value);
    const result = mapKeys(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a');
    expect(iteratee).toHaveBeenCalledWith(2, 'b');
    expect(result).toEqual({'a_1': 1, 'b_2': 2});
  });

  it('should handle iteratee that returns same keys', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number, key: string | symbol) => key.toString();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should handle iteratee that returns duplicate keys', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number, key: string | symbol) => 'same';
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({same: 3}); // Last value overwrites previous ones
  });

  it('should handle iteratee that returns empty string keys', () => {
    const obj = {a: 1, b: 2};
    const iteratee = (value: number, key: string | symbol) => '';
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({'': 2}); // Last value overwrites previous ones
  });

  it('should handle iteratee that returns number as string keys', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number, key: string | symbol) => value.toString();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({'1': 1, '2': 2, '3': 3});
  });

  it('should handle iteratee that returns boolean as string keys', () => {
    const obj = {a: 1, b: 2};
    const iteratee = (value: number, key: string | symbol) => (value > 1).toString();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({'false': 1, 'true': 2});
  });

  it('should handle object with nested values', () => {
    const obj = {a: {x: 1}, b: [1, 2, 3]};
    const iteratee = (value: any, key: string | symbol) => key.toString() + '_nested';
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({
      'a_nested': {x: 1},
      'b_nested': [1, 2, 3]
    });
  });

  it('should handle object with functions as values', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const iteratee = (value: any, key: string | symbol) => key.toString() + '_' + typeof value;
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({
      'a_number': 1,
      'b_function': fn,
      'c_number': 3
    });
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const iteratee = (value: any, key: string | symbol) => key.toString() + '_' + (value === null ? 'null' : value === undefined ? 'undefined' : 'value');
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({
      'a_null': null,
      'b_undefined': undefined,
      'c_value': 3
    });
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1};
    const iteratee = (value: any, key: string | symbol) => typeof key === 'symbol' ? 'symbol_key' : key.toUpperCase();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({
      'symbol_key': 'value',
      'A': 1
    });
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const iteratee = (value: any, key: string | symbol) => key.toString().startsWith('_') ? 'private_' + key.toString().slice(1) : key.toString().toUpperCase();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({
      'private_value': 0,
      'VALUE': 0
    });
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const iteratee = (value: number, key: string | symbol) => key.toString().toUpperCase();
    const result = mapKeys(obj, iteratee);
    expect(result).toEqual({A: 1, B: 2, C: 3});
  });

  it('should handle null and undefined input', () => {
    const iteratee = (value: any, key: string | symbol) => key.toString().toUpperCase();
    expect(mapKeys(null as any, iteratee)).toEqual({});
    expect(mapKeys(undefined as any, iteratee)).toEqual({});
  });
});