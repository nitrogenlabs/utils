import {set} from './set.js';

describe('set', () => {
  it('should set value at path', () => {
    const obj = {a: 1, b: 2};
    const result = set(obj, 'c', 3);
    expect(result).toEqual({a: 1, b: 2, c: 3});
  });

  it('should override existing value', () => {
    const obj = {a: 1, b: 2};
    const result = set(obj, 'b', 5);
    expect(result).toEqual({a: 1, b: 5});
  });

  it('should set nested property', () => {
    const obj = {a: 1, b: {c: 2}};
    const result = set(obj, 'b.d', 3);
    expect(result).toEqual({a: 1, b: {c: 2, d: 3}});
  });

  it('should set deeply nested property', () => {
    const obj = {a: {b: {c: 1}}};
    const result = set(obj, 'a.b.d', 2);
    expect(result).toEqual({a: {b: {c: 1, d: 2}}});
  });

  it('should create nested objects if they do not exist', () => {
    const obj = {a: 1};
    const result = set(obj, 'b.c.d', 3);
    expect(result).toEqual({a: 1, b: {c: {d: 3}}});
  });

  it('should handle array indices', () => {
    const obj = {a: [1, 2, 3]};
    const result = set(obj, 'a.1', 5);
    expect(result).toEqual({a: [1, 5, 3]});
  });

  it('should create array if it does not exist', () => {
    const obj = {a: 1};
    const result = set(obj, 'b.0', 2);
    expect(result).toEqual({a: 1, b: {'0': 2}});
  });

  it('should handle mixed array and object paths', () => {
    const obj = {a: [{b: 1}, {b: 2}]};
    const result = set(obj, 'a.1.c', 3);
    expect(result).toEqual({a: [{b: 1}, {b: 2, c: 3}]});
  });

  it('should handle empty string path', () => {
    const obj = {a: 1};
    const result = set(obj, '', 2);
    expect(result).toEqual({a: 1, '': 2});
  });

  it('should handle single dot path', () => {
    const obj = {a: 1};
    const result = set(obj, '.', 2);
    expect(result).toEqual({a: 1, '': {'': 2}});
  });

  it('should handle multiple dots', () => {
    const obj = {a: 1};
    const result = set(obj, 'b..c', 2);
    expect(result).toEqual({a: 1, b: {'': {c: 2}}});
  });

  it('should handle trailing dot', () => {
    const obj = {a: 1};
    const result = set(obj, 'b.', 2);
    expect(result).toEqual({a: 1, b: {'': 2}});
  });

  it('should handle leading dot', () => {
    const obj = {a: 1};
    const result = set(obj, '.b', 2);
    expect(result).toEqual({a: 1, '': {b: 2}});
  });

  it('should handle null and undefined values', () => {
    const obj = {a: 1};
    const result1 = set(obj, 'b', null);
    const result2 = set(obj, 'c', undefined);
    expect(result1).toEqual({a: 1, b: null});
    expect(result2).toEqual({a: 1, c: undefined});
  });

  it('should handle functions as values', () => {
    const fn = () => 'test';
    const obj = {a: 1};
    const result = set(obj, 'b', fn);
    expect(result).toEqual({a: 1, b: fn});
  });

  it('should handle objects as values', () => {
    const obj = {a: 1};
    const value = {x: 1, y: 2};
    const result = set(obj, 'b', value);
    expect(result).toEqual({a: 1, b: {x: 1, y: 2}});
  });

  it('should handle arrays as values', () => {
    const obj = {a: 1};
    const value = [1, 2, 3];
    const result = set(obj, 'b', value);
    expect(result).toEqual({a: 1, b: [1, 2, 3]});
  });

  it('should handle symbols as keys', () => {
    const sym = Symbol('test');
    const obj = {a: 1};
    const result = set(obj, sym.toString(), 'value');
    expect(result).toEqual({a: 1, [sym.toString()]: 'value'});
  });

  it('should handle edge cases', () => {
    expect(set({} as any, 'a', 1)).toEqual({a: 1});
  });

  it('should handle complex nested structures', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            value: 'deep'
          }
        }
      }
    };
    const result = set(obj, 'level1.level2.level3.newValue', 'new');
    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            value: 'deep',
            newValue: 'new'
          }
        }
      }
    });
  });

  it('should handle object with array properties', () => {
    const obj = {
      items: [
        {id: 1, name: 'item1'},
        {id: 2, name: 'item2'}
      ]
    };
    const result = set(obj, 'items.0.name', 'updated');
    expect(result).toEqual({
      items: [
        {id: 1, name: 'updated'},
        {id: 2, name: 'item2'}
      ]
    });
  });

  it('should handle setting value in non-existent array', () => {
    const obj = {a: 1};
    const result = set(obj, 'b.2', 'value');
    expect(result).toEqual({a: 1, b: {'2': 'value'}});
  });

  it('should handle setting value in existing array with gaps', () => {
    const obj = {a: [1, undefined, 3]};
    const result = set(obj, 'a.1', 2);
    expect(result).toEqual({a: [1, 2, 3]});
  });
});