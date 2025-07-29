import {flatten} from './flatten.js';

describe('flatten', () => {
  it('should flatten a nested array by one level', () => {
    expect(flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, [3, 4], 5]);
  });

  it('should flatten an array of arrays', () => {
    expect(flatten([[1, 2], [3, 4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should handle already flat arrays', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('should handle empty arrays', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should handle arrays with empty nested arrays', () => {
    expect(flatten([1, [], 2, [3, 4], []])).toEqual([1, 2, 3, 4]);
  });

  it('should handle deeply nested arrays (only flattens one level)', () => {
    expect(flatten([1, [2, [3, [4, 5]]], 6])).toEqual([1, 2, [3, [4, 5]], 6]);
  });

  it('should handle mixed types', () => {
    expect(flatten([1, ['a', 'b'], true, [null, undefined]])).toEqual([1, 'a', 'b', true, null, undefined]);
  });

  it('should handle objects in arrays', () => {
    const obj1 = {a: 1};
    const obj2 = {b: 2};
    expect(flatten([obj1, [obj2, {c: 3}]])).toEqual([obj1, obj2, {c: 3}]);
  });

  it('should handle functions in arrays', () => {
    const fn1 = () => 1;
    const fn2 = () => 2;
    const fn3 = () => 3;
    const result = flatten([fn1, [fn2, fn3]]);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe(fn1);
    expect(result[1]).toBe(fn2);
    expect(result[2]).toBe(fn3);
  });

  it('should handle sparse arrays', () => {
    const sparse = [1, undefined, 3];
    sparse[1] = [2, 4] as any;
    const result = flatten(sparse);
    expect(result).toEqual([1, 2, 4, 3]);
  });

  it('should handle arrays with null and undefined values', () => {
    expect(flatten([null, [undefined, 1], 2])).toEqual([null, undefined, 1, 2]);
  });

  it('should handle non-array inputs', () => {
    expect(flatten([])).toEqual([]);
  });

  it('should not mutate the original array', () => {
    const original = [1, [2, 3], 4];
    const result = flatten(original);

    expect(result).toEqual([1, 2, 3, 4]);
    expect(original).toEqual([1, [2, 3], 4]);
  });

  it('should handle arrays with only nested arrays', () => {
    expect(flatten([[1], [2], [3]])).toEqual([1, 2, 3]);
  });

  it('should handle arrays with mixed nesting levels', () => {
    expect(flatten([1, [2, [3, 4]], [5, 6], 7])).toEqual([1, 2, [3, 4], 5, 6, 7]);
  });

  it('should handle arrays with single element nested arrays', () => {
    expect(flatten([1, [2], 3, [4]])).toEqual([1, 2, 3, 4]);
  });

  it('should handle arrays with complex nested structures', () => {
    const complex = [
      {id: 1, tags: ['a', 'b']},
      [{id: 2, tags: ['c']}, {id: 3}],
      {id: 4, tags: []}
    ];
    const result = flatten(complex);

    expect(result).toEqual([
      {id: 1, tags: ['a', 'b']},
      {id: 2, tags: ['c']},
      {id: 3},
      {id: 4, tags: []}
    ]);
  });
});