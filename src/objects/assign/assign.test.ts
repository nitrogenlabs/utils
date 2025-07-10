import { assign } from './assign';

describe('assign', () => {
  it('should merge multiple objects into target', () => {
    const target = {a: 1, b: 2};
    const source1 = {b: 3, c: 4};
    const source2 = {c: 5, d: 6};
    const result = assign(target, source1, source2);
    expect(result).toEqual({a: 1, b: 3, c: 5, d: 6});
  });

  it('should return the target object', () => {
    const target = {a: 1};
    const source = {b: 2};
    const result = assign(target, source);
    expect(result).toBe(target);
  });

  it('should handle empty source objects', () => {
    const target = {a: 1, b: 2};
    const result = assign(target, {}, {});
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle no source objects', () => {
    const target = {a: 1, b: 2};
    const result = assign(target);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should override properties from left to right', () => {
    const target = {a: 1, b: 2};
    const source1 = {b: 3, c: 4};
    const source2 = {b: 5, c: 6};
    const result = assign(target, source1, source2);
    expect(result).toEqual({a: 1, b: 5, c: 6});
  });

  it('should handle null and undefined sources', () => {
    const target = {a: 1, b: 2};
    const result = assign(target, null as any, undefined as any);
    expect(result).toEqual({a: 1, b: 2});
  });

  it('should handle nested objects', () => {
    const target = {a: {x: 1}, b: 2};
    const source = {a: {y: 2}, c: 3};
    const result = assign(target, source);
    expect(result).toEqual({a: {y: 2}, b: 2, c: 3});
  });

  it('should handle arrays', () => {
    const target = {a: [1, 2], b: 2};
    const source = {a: [3, 4], c: 3};
    const result = assign(target, source);
    expect(result).toEqual({a: [3, 4], b: 2, c: 3});
  });

  it('should handle functions', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;
    const target = {a: fn1, b: 2};
    const source = {a: fn2, c: 3};
    const result = assign(target, source);
    expect(result).toEqual({a: fn2, b: 2, c: 3});
  });
});