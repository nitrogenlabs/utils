import {mapValues} from './mapValues';

describe('mapValues', () => {
  it('should transform object values using iteratee function', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number) => value * 2;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: 2, b: 4, c: 6});
  });

  it('should handle empty object', () => {
    const obj = {};
    const iteratee = (value: any) => value;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({});
  });

  it('should pass correct parameters to iteratee', () => {
    const obj = {a: 1, b: 2};
    const iteratee = jest.fn((value: number, key: string | symbol) => value + '_' + key.toString());
    const result = mapValues(obj, iteratee);

    expect(iteratee).toHaveBeenCalledWith(1, 'a');
    expect(iteratee).toHaveBeenCalledWith(2, 'b');
    expect(result).toEqual({a: '1_a', b: '2_b'});
  });

  it('should handle iteratee that returns same values', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number) => value;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should handle iteratee that returns different types', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number) => value > 1;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: false, b: true, c: true});
  });

  it('should handle iteratee that returns strings', () => {
    const obj = {a: 1, b: 2, c: 3};
    const iteratee = (value: number) => value.toString();
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: '1', b: '2', c: '3'});
  });

  it('should handle object with nested values', () => {
    const obj = {a: {x: 1}, b: [1, 2, 3]};
    const iteratee = (value: any, key: string | symbol) => key.toString() + '_' + JSON.stringify(value);
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({
      a: 'a_{"x":1}',
      b: 'b_[1,2,3]'
    });
  });

  it('should handle object with functions as values', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const iteratee = (value: any) => typeof value;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({
      a: 'number',
      b: 'function',
      c: 'number'
    });
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const iteratee = (value: any) => value === null ? 'null' : value === undefined ? 'undefined' : value;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({
      a: 'null',
      b: 'undefined',
      c: 3
    });
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1};
    const iteratee = (value: any, key: string | symbol) => typeof key === 'symbol' ? 'symbol_value' : value.toString();
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({
      [sym]: 'symbol_value',
      a: '1'
    });
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const iteratee = (value: any, key: string | symbol) => key.toString().startsWith('_') ? 'private_' + value : value.toString();
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({
      _value: 'private_0',
      value: '0'
    });
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const iteratee = (value: number) => value * 2;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: 2, b: 4, c: 6});
  });

  it('should handle null and undefined input', () => {
    const iteratee = (value: any) => value;
    expect(mapValues(null as any, iteratee)).toEqual({});
    expect(mapValues(undefined as any, iteratee)).toEqual({});
  });

  it('should handle object with empty string keys', () => {
    const obj = {'': 'empty', a: 1};
    const iteratee = (value: any, key: string | symbol) => key.toString() === '' ? 'empty_key' : value.toString();
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({'': 'empty_key', a: '1'});
  });

  it('should handle object with numeric string keys', () => {
    const obj = {'0': 'zero', '1': 'one', '2': 'two'};
    const iteratee = (value: string) => value.toUpperCase();
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({'0': 'ZERO', '1': 'ONE', '2': 'TWO'});
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';
    const iteratee = (value: string) => value.toUpperCase();
    const result = mapValues(objWithProto, iteratee);
    expect(result).toEqual({own: 'OWN VALUE'});
  });

  it('should handle object with all enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });
    const iteratee = (value: number) => value * 2;
    const result = mapValues(obj, iteratee);
    expect(result).toEqual({a: 2, b: 4, c: 6});
  });
});