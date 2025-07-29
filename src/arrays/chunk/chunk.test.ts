import {chunk} from './chunk.js';

describe('chunk', () => {
  it('should split an array into chunks of specified size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = chunk(array, 3);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]]);
  });

  it('should handle empty array', () => {
    const array: number[] = [];
    const result = chunk(array, 2);
    expect(result).toEqual([]);
  });

  it('should handle chunk size larger than array length', () => {
    const array = [1, 2, 3];
    const result = chunk(array, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should handle chunk size of 1', () => {
    const array = [1, 2, 3];
    const result = chunk(array, 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it('should handle chunk size of 0', () => {
    const array = [1, 2, 3, 4];
    const result = chunk(array, 0);
    expect(result).toEqual([]);
  });

  it('should handle negative chunk size', () => {
    const array = [1, 2, 3, 4];
    const result = chunk(array, -1);
    expect(result).toEqual([]);
  });

  it('should work with different data types', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const result = chunk(array, 2);
    expect(result).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
  });

  it('should work with objects', () => {
    const array = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
    const result = chunk(array, 2);
    expect(result).toEqual([[{id: 1}, {id: 2}], [{id: 3}, {id: 4}]]);
  });

  it('should handle array with exact multiple of chunk size', () => {
    const array = [1, 2, 3, 4];
    const result = chunk(array, 2);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });
});