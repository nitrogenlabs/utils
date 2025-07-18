import { orderBy } from './orderBy';

describe('orderBy', () => {
  it('should sort array by a single property in ascending order', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 }
    ];
    const result = orderBy(users, ['user'], ['asc']);
    expect(result).toEqual([
      { user: 'barney', age: 36 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 }
    ]);
  });

  it('should sort array by a single property in descending order', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 }
    ];
    const result = orderBy(users, ['user'], ['desc']);
    expect(result).toEqual([
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 36 },
      { user: 'barney', age: 34 }
    ]);
  });

  it('should sort array by multiple properties and different orders', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 }
    ];
    const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
    expect(result).toEqual([
      { user: 'barney', age: 36 },
      { user: 'barney', age: 34 },
      { user: 'fred', age: 48 },
      { user: 'fred', age: 40 }
    ]);
  });

  it('should handle custom iteratee functions', () => {
    const users = [
      { user: 'fred', age: 48 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'barney', age: 34 }
    ];
    const result = orderBy(users, [
      user => user.user.length,
      'age'
    ], ['desc', 'asc']);
    expect(result).toEqual([
      { user: 'barney', age: 34 },
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'fred', age: 48 }
    ]);
  });

  it('should handle empty arrays', () => {
    expect(orderBy([])).toEqual([]);
  });

  it('should handle arrays with one element', () => {
    const array = [{ a: 1 }];
    expect(orderBy(array, ['a'])).toEqual([{ a: 1 }]);
  });

  it('should handle null and undefined values', () => {
    const array = [
      { a: 3, b: 1 },
      { a: null, b: 2 },
      { a: 1, b: 3 },
      { a: undefined, b: 4 }
    ];
    const result = orderBy(array, ['a'], ['asc']);
    expect(result[0].a).toBeNull();
    expect(result[1].a).toBeUndefined();
    expect(result[2].a).toBe(1);
    expect(result[3].a).toBe(3);
  });

  it('should default to ascending order if orders not provided', () => {
    const array = [3, 1, 2];
    expect(orderBy(array, [a => a])).toEqual([1, 2, 3]);
  });

  it('should not mutate the original array', () => {
    const array = [3, 1, 2];
    const original = [...array];
    orderBy(array, [a => a]);
    expect(array).toEqual(original);
  });
});