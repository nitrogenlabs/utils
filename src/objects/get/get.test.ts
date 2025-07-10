import { get } from './get';

describe('get', () => {
  const obj = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3,
        f: [4, 5, 6]
      }
    },
    g: null,
    h: undefined
  };

  it('should get top-level property', () => {
    expect(get(obj, 'a')).toBe(1);
  });

  it('should get nested property using dot notation', () => {
    expect(get(obj, 'b.c')).toBe(2);
  });

  it('should get deeply nested property', () => {
    expect(get(obj, 'b.d.e')).toBe(3);
  });

  it('should get array element', () => {
    expect(get(obj, 'b.d.f.0')).toBe(4);
    expect(get(obj, 'b.d.f.1')).toBe(5);
    expect(get(obj, 'b.d.f.2')).toBe(6);
  });

  it('should return undefined for non-existent property', () => {
    expect(get(obj, 'x')).toBeUndefined();
  });

  it('should return undefined for non-existent nested property', () => {
    expect(get(obj, 'b.x')).toBeUndefined();
  });

  it('should return undefined for non-existent array index', () => {
    expect(get(obj, 'b.d.f.10')).toBeUndefined();
  });

  it('should return default value for non-existent property', () => {
    expect(get(obj, 'x', 'default')).toBe('default');
  });

  it('should return default value for non-existent nested property', () => {
    expect(get(obj, 'b.x', 'default')).toBe('default');
  });

  it('should handle null values', () => {
    expect(get(obj, 'g')).toBeUndefined();
  });

  it('should handle undefined values', () => {
    expect(get(obj, 'h')).toBeUndefined();
  });

  it('should handle empty string path', () => {
    expect(get(obj, '')).toBeUndefined();
  });

  it('should handle single dot path', () => {
    expect(get(obj, '.')).toBeUndefined();
  });

  it('should handle multiple dots', () => {
    expect(get(obj, 'b..c')).toBeUndefined();
  });

  it('should handle trailing dot', () => {
    expect(get(obj, 'b.c.')).toBeUndefined();
  });

  it('should handle leading dot', () => {
    expect(get(obj, '.b.c')).toBeUndefined();
  });

  it('should handle array notation for object', () => {
    expect(get(obj, 'b.d.f[0]')).toBeUndefined();
  });

  it('should handle complex nested structure', () => {
    const complexObj = {
      level1: {
        level2: {
          level3: {
            value: 'deep'
          }
        }
      }
    };
    expect(get(complexObj, 'level1.level2.level3.value')).toBe('deep');
  });

  it('should handle object with array properties', () => {
    const objWithArrays = {
      items: [
        {id: 1, name: 'item1'},
        {id: 2, name: 'item2'}
      ]
    };
    expect(get(objWithArrays, 'items.0.name')).toBe('item1');
    expect(get(objWithArrays, 'items.1.name')).toBe('item2');
  });

  it('should handle edge cases', () => {
    expect(get(null as any, 'a')).toBeUndefined();
    expect(get(undefined as any, 'a')).toBeUndefined();
    expect(get({} as any, 'a')).toBeUndefined();
  });
});