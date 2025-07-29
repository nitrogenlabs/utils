import {merge} from './merge.js';

describe('merge', () => {
  it('should merge multiple objects', () => {
    const obj1 = {a: 1, b: 2};
    const obj2 = {b: 3, c: 4};
    const obj3 = {c: 5, d: 6};
    const result = merge(obj1, obj2, obj3);
    expect(result).toEqual({a: 1, b: 3, c: 5, d: 6});
  });

  it('should return the target object', () => {
    const target = {a: 1};
    const source = {b: 2};
    const result = merge(target, source);
    expect(result).toBe(target);
  });

  it('should handle empty source objects', () => {
    const target = {a: 1, b: 2};
    const result = merge(target, {}, {});
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle no source objects', () => {
    const target = {a: 1, b: 2};
    const result = merge(target);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should override properties from left to right', () => {
    const target = {a: 1, b: 2};
    const source1 = {b: 3, c: 4};
    const source2 = {b: 5, c: 6};
    const result = merge(target, source1, source2);
    expect(result).toEqual({a: 1, b: 5, c: 6});
  });

  it('should handle null and undefined sources', () => {
    const target = {a: 1, b: 2};
    const result = merge(target, null as any, undefined as any);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle nested objects', () => {
    const target = {a: {x: 1}, b: 2};
    const source = {a: {y: 2}, c: 3};
    const result = merge(target, source);
    expect(result).toEqual({a: {x: 1, y: 2}, b: 2, c: 3});
  });

  it('should handle arrays', () => {
    const target = {a: [1, 2], b: 2};
    const source = {a: [3, 4], c: 3};
    const result = merge(target, source);
    expect(result).toEqual({a: [3, 4], b: 2, c: 3});
  });

  it('should handle functions', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;
    const target = {a: fn1, b: 2};
    const source = {a: fn2, c: 3};
    const result = merge(target, source);
    expect(result).toEqual({a: fn2, b: 2, c: 3});
  });

  it('should handle deep nested objects', () => {
    const target = {
      a: {
        b: {
          c: 1,
          d: 2
        },
        e: 3
      },
      f: 4
    };
    const source = {
      a: {
        b: {
          c: 5,
          g: 6
        },
        h: 7
      },
      i: 8
    };
    const result = merge(target, source);
    expect(result).toEqual({
      a: {
        b: {
          c: 5,
          d: 2,
          g: 6
        },
        e: 3,
        h: 7
      },
      f: 4,
      i: 8
    });
  });

  it('should handle objects with null and undefined values', () => {
    const target = {a: 1, b: null, c: 3};
    const source = {b: undefined, d: 4};
    const result = merge(target, source);
    expect(result).toEqual({a: 1, b: undefined, c: 3, d: 4});
  });

  it('should handle objects with symbols as keys', () => {
    const sym = Symbol('test');
    const target = {[sym]: 'value1', a: 1};
    const source = {[sym]: 'value2', b: 2};
    const result = merge(target, source);
    expect(result).toEqual({[sym]: 'value2', a: 1, b: 2});
  });

  it('should handle objects with getters and setters', () => {
    const target = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const source = {
      _value: 5,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const result = merge(target, source);
    expect(result).toEqual({
      _value: 5,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    });
  });

  it('should handle objects with non-enumerable properties', () => {
    const target = {a: 1, b: 2};
    Object.defineProperty(target, 'c', {
      value: 3,
      enumerable: false
    });
    const source = {d: 4};
    const result = merge(target, source);
    expect(result).toEqual({a: 1, b: 2, d: 4});
  });

  it('should handle edge cases', () => {
    expect(merge(null as any)).toBeNull();
    expect(merge(undefined as any)).toBeUndefined();
    expect(merge({})).toEqual({});
  });

  it('should handle primitive values', () => {
    expect(merge(1 as any)).toBe(1);
    expect(merge('string' as any)).toBe('string');
    expect(merge(true as any)).toBe(true);
  });

  it('should handle arrays', () => {
    const target = [1, 2, 3];
    const source = [4, 5, 6];
    const result = merge(target, source);
    expect(result).toEqual([4, 5, 6]);
  });

  it('should handle mixed types', () => {
    const target = {a: 1, b: [1, 2], c: {x: 1}};
    const source = {b: [3, 4], c: {y: 2}, d: 5};
    const result = merge(target, source);
    expect(result).toEqual({
      a: 1,
      b: [3, 4],
      c: {x: 1, y: 2},
      d: 5
    });
  });
});