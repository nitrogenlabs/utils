import {omit} from './omit';

describe('omit', () => {
  it('should omit specified properties from object', () => {
    const obj = {a: 1, b: 2, c: 3, d: 4};
    const result = omit(obj, ['b', 'd']);
    expect(result).toEqual({a: 1, c: 3});
  });

  it('should handle empty object', () => {
    const obj = {};
    const result = omit(obj as any, ['a', 'b']);
    expect(result).toEqual({});
  });

  it('should handle empty paths array', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omit(obj, []);
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should handle single property to omit', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omit(obj, ['b']);
    expect(result).toEqual({a: 1, c: 3});
  });

  it('should handle all properties to omit', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omit(obj, ['a', 'b', 'c']);
    expect(result).toEqual({});
  });

  it('should handle object with nested properties', () => {
    const obj = {a: {x: 1}, b: 2, c: [1, 2, 3]};
    const result = omit(obj, ['b']);
    expect(result).toEqual({a: {x: 1}, c: [1, 2, 3]});
  });

  it('should handle object with functions', () => {
    const fn = () => 'test';
    const obj = {a: 1, b: fn, c: 3};
    const result = omit(obj, ['b']);
    expect(result).toEqual({a: 1, c: 3});
  });

  it('should handle object with null and undefined values', () => {
    const obj = {a: null, b: undefined, c: 3};
    const result = omit(obj, ['a']);
    expect(result).toEqual({b: undefined, c: 3});
  });

  it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {[sym]: 'value', a: 1, b: 2};
    const result = omit(obj as any, [sym]);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle object with getters and setters', () => {
    const obj = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    } as any;
    const result = omit(obj, ['_value']);
    expect(result).toHaveProperty('value');
    expect(result).not.toHaveProperty('_value');
  });

  it('should handle object with non-enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: false
    });
    const result = omit(obj as any, ['c']);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle null and undefined input', () => {
    expect(omit(null as any, ['a'])).toEqual({});
    expect(omit(undefined as any, ['a'])).toEqual({});
  });

  it('should handle array input', () => {
    const arr = ['a', 'b', 'c'];
    const result = omit(arr as any, ['1']);
    expect(result).toEqual({'0': 'a', '2': 'c'});
  });

  it('should handle string input', () => {
    const str = 'hello';
    const result = omit(str as any, ['1', '3']);
    expect(result).toEqual({'0': 'h', '2': 'l', '4': 'o'});
  });

  it('should handle object with empty string keys', () => {
    const obj = {'': 'empty', a: 1, b: 2};
    const result = omit(obj, ['']);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle object with numeric string keys', () => {
    const obj = {'0': 'zero', '1': 'one', '2': 'two'};
    const result = omit(obj, ['1']);
    expect(result).toEqual({'0': 'zero', '2': 'two'});
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';
    const result = omit(objWithProto as any, ['own']);
    expect(result).toEqual({});
  });

  it('should handle object with all enumerable properties', () => {
    const obj = {a: 1, b: 2};
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });
    const result = omit(obj as any, ['c']);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle duplicate properties in paths array', () => {
    const obj = {a: 1, b: 2, c: 3};
    const result = omit(obj, ['b', 'b', 'c']);
    expect(result).toEqual({a: 1});
  });
});