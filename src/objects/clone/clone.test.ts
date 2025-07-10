import { cloneDeep } from './clone';

describe('cloneDeep', () => {
  it('should create a deep copy of an object', () => {
    const original = {a: 1, b: 2, c: 3};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should handle empty objects', () => {
    const original = {};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should handle objects with nested properties', () => {
    const original = {a: {x: 1, y: 2}, b: [1, 2, 3]};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    // Nested objects should be deep copied
    expect(cloned.a).not.toBe(original.a);
    expect(cloned.b).not.toBe(original.b);
  });

  it('should handle objects with functions', () => {
    const fn = () => 'test';
    const original = {a: 1, b: fn, c: 3};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).toBe(fn);
  });

  it('should handle objects with null and undefined values', () => {
    const original = {a: null, b: undefined, c: 3};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
  });

  it('should handle objects with arrays', () => {
    const original = {a: [1, 2, 3], b: {c: [4, 5, 6]}};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    // Arrays should be deep copied
    expect(cloned.a).not.toBe(original.a);
    expect(cloned.b).not.toBe(original.b);
  });

  it('should handle objects with symbols as keys', () => {
    const sym = Symbol('test');
    const original = {[sym]: 'value', a: 1};
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[sym]).toBe('value');
  });

  it('should handle objects with getters and setters', () => {
    const original = {
      _value: 0,
      get value() { return this._value; },
      set value(val: number) { this._value = val; }
    };
    const cloned = cloneDeep(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.value).toBe(0);
    cloned.value = 5;
    expect(cloned.value).toBe(5);
    expect(original.value).toBe(0); // Original should be unchanged
  });

  it('should handle non-enumerable properties', () => {
    const original = {a: 1, b: 2};
    Object.defineProperty(original, 'c', {
      value: 3,
      enumerable: false
    });
    const cloned = cloneDeep(original);
    expect(cloned).toEqual({a: 1, b: 2});
    expect(cloned).not.toBe(original);
  });
});