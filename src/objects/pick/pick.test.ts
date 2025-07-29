import {pick} from './pick.js';

describe('pick', () => {
  it('should pick specified properties from object', () => {
    const obj = {a: 1, b: 2, c: 3, d: 4};
    const result = pick(obj, ['a', 'c']);
    expect(result).toEqual({a: 1, c: 3});
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = pick(obj as any, ['a', 'b']);
    expect(result).toEqual({});
  });

  it('should handle empty paths array', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = pick(obj, []);
    expect(result).toEqual({});
  });

  it('should handle single property to pick', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = pick(obj, ['b']);
    expect(result).toEqual({b: 2});
  });

  it('should handle all properties to pick', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = pick(obj, ['a', 'b', 'c']);
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should handle object with nested properties', () => {
    const obj = {a: {x: 1}, b: 2, c: [1, 2, 3]};
    const result = pick(obj, ['a', 'c']);
    expect(result).toEqual({a: {x: 1}, c: [1, 2, 3]});
  });

  it('should handle object with functions', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const result = pick(obj, ['b']);
    expect(result).toEqual({b: fn});
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const result = pick(obj, ['a', 'b']);
    expect(result).toEqual({a: null, b: undefined});
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1, b: 2};
    const result = pick(obj as any, [sym]);
    expect(result).toEqual({[sym]: 'value'});
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    } as any;
    const result = pick(obj, ['value']);
    expect(result).toHaveProperty('value');
    expect(result).not.toHaveProperty('_value');
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const result = pick(obj as any, ['c']);
    expect(result).toEqual({c: 3});
  });

  it('should handle null and undefined input', () => {
    expect(() => pick(null as any, ['a'])).toThrow();
    expect(() => pick(undefined as any, ['a'])).toThrow();
  });

  it('should handle array input', () => {
    const arr = ['a', 'b', 'c'];
    const result = pick(arr as any, ['1']);
    expect(result).toEqual({'1': 'b'});
  });

  it('should handle string input', () => {
    expect(() => pick('hello' as any, ['1'])).toThrow();
  });

  it('should handle object with empty string keys', () => {
    const obj = {'': 'empty', a: 1, b: 2};
    const result = pick(obj, ['']);
    expect(result).toEqual({'': 'empty'});
  });

  it('should handle object with numeric string keys', () => {
    const obj = {'0': 'zero', '1': 'one', '2': 'two'};
    const result = pick(obj, ['1']);
    expect(result).toEqual({'1': 'one'});
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';
    const result = pick(objWithProto as any, ['own']);
    expect(result).toEqual({own: 'own value'});
  });

  it('should handle object with all enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });
    const result = pick(obj as any, ['c']);
    expect(result).toEqual({c: 3});
  });

  it('should handle duplicate properties in paths array', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = pick(obj, ['b', 'b', 'c']);
    expect(result).toEqual({b: 2, c: 3});
  });

  it('should handle mixed property types in paths array', () => {
    const sym = Symbol('test');
    const obj = {a: 1, b: 2, [sym]: 'value'};
    const result = pick(obj as any, ['a', sym]);
    expect(result).toEqual({a: 1, [sym]: 'value'});
  });

  it('should handle partial property selection', () => {
    const obj = {a: 1, b: 2, c: 3, d: 4, e: 5};
    const result = pick(obj, ['a', 'c', 'e']);
    expect(result).toEqual({a: 1, c: 3, e: 5});
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
    const result = pick(obj, ['a', 'b', 'c']);
    expect(result).toEqual({
      a: {nested: true},
      b: [1, 2, 3],
      c: fn
    });
  });
});