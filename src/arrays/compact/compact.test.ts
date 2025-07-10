import { compact } from './compact';

describe('compact', () => {
  it('should remove falsy values from array', () => {
    const array = [0, 1, false, 2, '', 3, null, undefined, NaN];
    const result = compact(array);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle empty array', () => {
    const array: any[] = [];
    const result = compact(array);
    expect(result).toEqual([]);
  });

  it('should handle array with only falsy values', () => {
    const array = [false, 0, '', null, undefined, NaN];
    const result = compact(array);
    expect(result).toEqual([]);
  });

  it('should handle array with only truthy values', () => {
    const array = [1, 'hello', true, {}, []];
    const result = compact(array);
    expect(result).toEqual([1, 'hello', true, {}, []]);
  });

  it('should handle array with mixed types', () => {
    const array = [0, 'hello', false, 42, '', true, null];
    const result = compact(array);
    expect(result).toEqual(['hello', 42, true]);
  });

  it('should handle array with objects', () => {
    const array = [null, {id: 1}, undefined, {name: 'test'}, false];
    const result = compact(array);
    expect(result).toEqual([{id: 1}, {name: 'test'}]);
  });

  it('should handle array with functions', () => {
    const fn = () => {};
    const array = [null, fn, undefined, false];
    const result = compact(array);
    expect(result).toEqual([fn]);
  });

  it('should handle array with zero as falsy value', () => {
    const array = [0, 1, 2, 3];
    const result = compact(array);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should handle array with empty string as falsy value', () => {
    const array = ['', 'hello', '', 'world'];
    const result = compact(array);
    expect(result).toEqual(['hello', 'world']);
  });
});