import { pullAllBy } from './pullAllBy';

describe('pullAllBy', () => {
  it('should remove elements with matching iteratee values', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
    const values = [{ x: 1 }, { x: 3 }];
    const result = pullAllBy(array, values, 'x');
    expect(result).toEqual([{ x: 2 }]);
  });

  it('should work with a custom iteratee function', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
    const values = [{ x: 1 }, { x: 3 }];
    const result = pullAllBy(array, values, obj => obj.x);
    expect(result).toEqual([{ x: 2 }]);
  });

  it('should handle empty array', () => {
    expect(pullAllBy([], [{ x: 1 }], 'x')).toEqual([]);
  });

  it('should handle empty values array', () => {
    const array = [{ x: 1 }, { x: 2 }];
    expect(pullAllBy(array, [], 'x')).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it('should handle objects with multiple properties', () => {
    const array = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 3 }
    ];
    const values = [{ x: 1, y: 0 }, { x: 3, y: 0 }];
    const result = pullAllBy(array, values, 'x');
    expect(result).toEqual([{ x: 2, y: 1 }]);
  });

  it('should not modify the original array', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const values = [{ x: 1 }];
    const original = [...array];
    pullAllBy(array, values, 'x');
    expect(array).toEqual(original);
  });

  it('should handle different object structures with the same property', () => {
    type ObjWithX = { x: number; [key: string]: any };
    const array: ObjWithX[] = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, z: 4 }
    ];
    const values: ObjWithX[] = [{ x: 1 }, { x: 3, a: 5 }];
    const result = pullAllBy(array, values, 'x');
    expect(result).toEqual([{ x: 2, y: 1 }]);
  });

  it('should handle numeric values with custom iteratee', () => {
    const array = [1, 2, 3, 4];
    const values = [1, 3];
    const result = pullAllBy(array, values, num => num);
    expect(result).toEqual([2, 4]);
  });

  it('should handle complex nested objects with path access', () => {
    interface User { id: number; name: string; }
    interface UserContainer { user: User; }

    const array: UserContainer[] = [
      { user: { id: 1, name: 'John' } },
      { user: { id: 2, name: 'Jane' } },
      { user: { id: 3, name: 'Bob' } }
    ];

    const result = pullAllBy(array, array.filter(item => [1, 3].includes(item.user.id)), obj => obj.user.id);
    expect(result).toEqual([{ user: { id: 2, name: 'Jane' } }]);
  });
});