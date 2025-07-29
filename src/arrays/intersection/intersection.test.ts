import {intersection} from './intersection.js';

describe('intersection', () => {
  it('should return common elements from all arrays', () => {
    const result = intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]);
    expect(result).toEqual([3]);
  });

  it('should handle empty arrays', () => {
    const result = intersection([], [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it('should handle no arrays', () => {
    const result = intersection();
    expect(result).toEqual([]);
  });

  it('should handle single array', () => {
    const result = intersection([1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle no common elements', () => {
    const result = intersection([1, 2, 3], [4, 5, 6], [7, 8, 9]);
    expect(result).toEqual([]);
  });

  it('should handle all elements being common', () => {
    const result = intersection([1, 2, 3], [1, 2, 3], [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should work with strings', () => {
    const result = intersection(['a', 'b', 'c'], ['b', 'c', 'd'], ['c', 'd', 'e']);
    expect(result).toEqual(['c']);
  });

  it('should work with mixed types', () => {
    const result = intersection([1, 'hello', true], [1, 'world', true], [1, 'test', true]);
    expect(result).toEqual([1, true]);
  });

  it('should handle duplicate values', () => {
    const result = intersection([1, 1, 2, 3], [1, 2, 2, 4], [1, 2, 3, 3]);
    expect(result).toEqual([1, 2]);
  });

  it('should handle objects with same reference', () => {
    const obj1 = {id: 1};
    const obj2 = {id: 2};
    const result = intersection([obj1, obj2], [obj1, {id: 3}], [obj1, obj2]);
    expect(result).toEqual([obj1]);
  });

  it('should handle arrays with different lengths', () => {
    const result = intersection([1, 2, 3, 4], [2, 3], [3, 4, 5]);
    expect(result).toEqual([3]);
  });

  it('should preserve order from first array', () => {
    const result = intersection([3, 1, 2], [2, 1, 3], [1, 3, 2]);
    expect(result).toEqual([3, 1, 2]);
  });
});