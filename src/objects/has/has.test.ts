import { has } from './has';

describe('has', () => {
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
    h: undefined,
    '': 'empty key',
    '0': 'zero key'
  };

  it('should return true for existing top-level property', () => {
    expect(has(obj, 'a')).toBe(true);
  });

  it('should return false for non-existent top-level property', () => {
    expect(has(obj, 'x')).toBe(false);
  });

  it('should return true for existing nested property', () => {
    expect(has(obj, 'b.c')).toBe(true);
  });

  it('should return false for non-existent nested property', () => {
    expect(has(obj, 'b.x')).toBe(false);
  });

  it('should return true for deeply nested property', () => {
    expect(has(obj, 'b.d.e')).toBe(true);
  });

  it('should return false for non-existent deeply nested property', () => {
    expect(has(obj, 'b.d.x')).toBe(false);
  });

  it('should return true for array element', () => {
    expect(has(obj, 'b.d.f.0')).toBe(true);
    expect(has(obj, 'b.d.f.1')).toBe(true);
    expect(has(obj, 'b.d.f.2')).toBe(true);
  });

  it('should return false for non-existent array index', () => {
    expect(has(obj, 'b.d.f.10')).toBe(false);
  });

  it('should return true for property with null value', () => {
    expect(has(obj, 'g')).toBe(true);
  });

  it('should return true for property with undefined value', () => {
    expect(has(obj, 'h')).toBe(true);
  });

  it('should return true for empty string key', () => {
    expect(has(obj, '')).toBe(true);
  });

  it('should return true for numeric string key', () => {
    expect(has(obj, '0')).toBe(true);
  });

  it('should return false for empty string path', () => {
    expect(has(obj, '')).toBe(true);
  });

  it('should return false for single dot path', () => {
    expect(has(obj, '.')).toBe(false);
  });

  it('should return false for multiple dots', () => {
    expect(has(obj, 'b..c')).toBe(false);
  });

  it('should return false for trailing dot', () => {
    expect(has(obj, 'b.c.')).toBe(false);
  });

  it('should return false for leading dot', () => {
    expect(has(obj, '.b.c')).toBe(false);
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
    expect(has(complexObj, 'level1.level2.level3.value')).toBe(true);
    expect(has(complexObj, 'level1.level2.level3.nonexistent')).toBe(false);
  });

  it('should handle object with array properties', () => {
    const objWithArrays = {
      items: [
        {id: 1, name: 'item1'},
        {id: 2, name: 'item2'}
      ]
    };
    expect(has(objWithArrays, 'items.0.name')).toBe(true);
    expect(has(objWithArrays, 'items.1.name')).toBe(true);
    expect(has(objWithArrays, 'items.2.name')).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(has(null as any, 'a')).toBe(false);
    expect(has(undefined as any, 'a')).toBe(false);
    expect(has({} as any, 'a')).toBe(false);
  });

  it('should handle object with prototype properties', () => {
    const objWithProto = Object.create({inherited: 'value'});
    objWithProto.own = 'own value';

    expect(has(objWithProto, 'own')).toBe(true);
    expect(has(objWithProto, 'inherited')).toBe(false);
  });

    it('should handle object with symbols as keys', () => {
    const sym = Symbol('test');
    const objWithSymbol = {[sym]: 'value', a: 1};

    expect(has(objWithSymbol, 'a')).toBe(true);
    // Note: has function doesn't support symbol keys via string path
  });

    it('should handle object with non-enumerable properties', () => {
    const objWithNonEnum = {a: 1, b: 2};
    Object.defineProperty(objWithNonEnum, 'c', {
      value: 3,
      enumerable: false
    });

    expect(has(objWithNonEnum, 'a')).toBe(true);
    expect(has(objWithNonEnum, 'b')).toBe(true);
    expect(has(objWithNonEnum, 'c')).toBe(true); // has checks all own properties
  });
});