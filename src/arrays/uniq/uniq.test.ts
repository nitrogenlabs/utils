import { uniq, uniqBy } from './uniq';

describe('uniq', () => {
  it('should remove duplicate values from array', () => {
    const array = [1, 2, 2, 3, 3, 4];
    const result = uniq(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle empty array', () => {
    const array: number[] = [];
    const result = uniq(array);
    expect(result).toEqual([]);
  });

  it('should handle array with no duplicates', () => {
    const array = [1, 2, 3, 4];
    const result = uniq(array);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should handle array with all duplicates', () => {
    const array = [1, 1, 1, 1];
    const result = uniq(array);
    expect(result).toEqual([1]);
  });

  it('should work with strings', () => {
    const array = ['a', 'b', 'a', 'c', 'b'];
    const result = uniq(array);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should work with mixed types', () => {
    const array = [1, 'hello', 1, true, 'hello', false];
    const result = uniq(array);
    expect(result).toEqual([1, 'hello', true, false]);
  });

  it('should handle objects with different references', () => {
    const array = [{id: 1}, {id: 2}, {id: 1}, {id: 3}];
    const result = uniq(array);
    expect(result).toEqual([{id: 1}, {id: 2}, {id: 1}, {id: 3}]);
  });

  it('should handle objects with same reference', () => {
    const obj = {id: 1};
    const array = [obj, {id: 2}, obj, {id: 3}];
    const result = uniq(array);
    expect(result).toEqual([obj, {id: 2}, {id: 3}]);
  });

  it('should preserve order', () => {
    const array = [3, 1, 2, 1, 3, 2];
    const result = uniq(array);
    expect(result).toEqual([3, 1, 2]);
  });
});

describe('uniqBy', () => {
  it('should remove duplicates based on iteratee function', () => {
    const array = [
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 1, name: 'Alice'},
      {id: 3, name: 'Charlie'}
    ];
    const result = uniqBy(array, (item) => item.id);
    expect(result).toEqual([
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'}
    ]);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const result = uniqBy(array, (item) => item.id);
    expect(result).toEqual([]);
  });

  it('should handle array with no duplicates based on iteratee', () => {
    const array = [
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 3, name: 'Charlie'}
    ];
    const result = uniqBy(array, (item) => item.id);
    expect(result).toEqual(array);
  });

  it('should work with string iteratee', () => {
    const array = ['hello', 'world', 'hello', 'test'];
    const result = uniqBy(array, (item) => item.length);
    expect(result).toEqual(['hello', 'test']);
  });

  it('should work with number iteratee', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = uniqBy(array, (item) => item % 2);
    expect(result).toEqual([1, 2]);
  });

  it('should handle complex iteratee functions', () => {
    const array = [
      {name: 'Alice', age: 25},
      {name: 'Bob', age: 30},
      {name: 'Alice', age: 26},
      {name: 'Charlie', age: 25}
    ];
    const result = uniqBy(array, (item) => `${item.name}-${item.age}`);
    expect(result).toEqual([
      {name: 'Alice', age: 25},
      {name: 'Bob', age: 30},
      {name: 'Alice', age: 26},
      {name: 'Charlie', age: 25}
    ]);
  });

  it('should preserve order', () => {
    const array = [
      {id: 3, name: 'Charlie'},
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
      {id: 1, name: 'Alice'},
      {id: 3, name: 'Charlie'}
    ];
    const result = uniqBy(array, (item) => item.id);
    expect(result).toEqual([
      {id: 3, name: 'Charlie'},
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'}
    ]);
  });

  it('should handle null and undefined values in iteratee', () => {
    const array = [
      {id: 1, value: 'a'},
      {id: 2, value: null},
      {id: 3, value: undefined},
      {id: 4, value: null}
    ];
    const result = uniqBy(array, (item) => item.value);
    expect(result).toEqual([
      {id: 1, value: 'a'},
      {id: 2, value: null},
      {id: 3, value: undefined}
    ]);
  });
});