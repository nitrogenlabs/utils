import {difference} from './difference.js';

describe('difference', () => {
  it('should return elements from first array not present in other arrays', () => {
    const array = [1, 2, 3, 4, 5];
    const result = difference(array, [2, 4], [3]);
    expect(result).toEqual([1, 5]);
  });

  it('should handle empty first array', () => {
    const array: number[] = [];
    const result = difference(array, [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it('should handle empty exclusion arrays', () => {
    const array = [1, 2, 3, 4];
    const result = difference(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle all elements being excluded', () => {
    const array = [1, 2, 3];
    const result = difference(array, [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it('should handle no elements being excluded', () => {
    const array = [1, 2, 3];
    const result = difference(array, [4, 5, 6]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should work with strings', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = difference(array, ['b', 'd'], ['a']);
    expect(result).toEqual(['c']);
  });

  it('should work with mixed types', () => {
    const array = [1, 'hello', true, {id: 1}];
    const result = difference(array, [1, 'hello'], [true]);
    expect(result).toEqual([{id: 1}]);
  });

  it('should handle duplicate values in exclusion arrays', () => {
    const array = [1, 2, 3, 4];
    const result = difference(array, [2, 2, 3], [3, 4]);
    expect(result).toEqual([1]);
  });

  it('should handle multiple exclusion arrays', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = difference(array, [1, 2], [3, 4], [5]);
    expect(result).toEqual([6]);
  });

  it('should handle objects with same reference', () => {
    const obj1 = {id: 1};
    const obj2 = {id: 2};
    const array = [obj1, obj2, {id: 3}];
    const result = difference(array, [obj1], [obj2]);
    expect(result).toEqual([{id: 3}]);
  });

  it('should handle nested arrays in exclusion', () => {
    const array = [1, 2, 3, 4];
    const result = difference(array, [1, 2], [3, 4]);
    expect(result).toEqual([]);
  });
});