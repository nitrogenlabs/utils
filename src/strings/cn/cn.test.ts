import {cn} from './cn.js';

describe('cn', () => {
  it('should join simple strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('should handle empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar');
    expect(cn('', 'foo', '')).toBe('foo');
  });

  it('should handle numbers', () => {
    expect(cn('foo', 123)).toBe('foo 123');
    expect(cn(0, 'foo', 1)).toBe('0 foo 1');
  });

  it('should handle boolean values', () => {
    expect(cn('foo', true)).toBe('foo true');
    expect(cn('foo', false)).toBe('foo');
  });

  it('should handle null and undefined', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar');
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
    expect(cn(null, undefined, 'foo')).toBe('foo');
  });

  it('should handle objects', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    expect(cn({ foo: true, bar: true })).toBe('foo bar');
    expect(cn({ foo: false, bar: false })).toBe('');
  });

  it('should handle arrays', () => {
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz');
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    expect(cn(['foo', null, 'bar'])).toBe('foo bar');
  });

  it('should handle nested arrays', () => {
    expect(cn('foo', ['bar', ['baz', 'qux']])).toBe('foo bar baz qux');
    expect(cn(['foo', ['bar', 'baz']], 'qux')).toBe('foo bar baz qux');
  });

  it('should handle mixed inputs', () => {
    expect(cn('foo', { bar: true }, ['baz', { qux: true }])).toBe('foo bar baz qux');
    expect(cn('foo', null, { bar: true }, undefined, ['baz'])).toBe('foo bar baz');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null)).toBe('');
    expect(cn(undefined)).toBe('');
    expect(cn(false)).toBe('');
    expect(cn([])).toBe('');
    expect(cn({})).toBe('');
  });

  it('should handle complex nested structures', () => {
    const result = cn(
      'base-class',
      { 'conditional-class': true, 'hidden-class': false },
      ['array-class', { 'nested-conditional': true }],
      null,
      undefined,
      false,
      '',
      0,
      'final-class'
    );
    expect(result).toBe('base-class conditional-class array-class nested-conditional 0 final-class');
  });

  it('should handle object keys with falsy values', () => {
    expect(cn({ '': true, 'foo': false, 'bar': 0, 'baz': null })).toBe('');
    expect(cn({ 'foo': true, 'bar': false, 'baz': true })).toBe('foo baz');
  });

  it('should handle recursive object structures', () => {
    const obj = {
      foo: true,
      bar: {
        baz: true,
        qux: false
      }
    };
    // Note: nested objects are not flattened, only top-level keys are processed
    expect(cn(obj)).toBe('foo');
  });

  it('should handle edge cases', () => {
    expect(cn('foo', NaN)).toBe('foo NaN');
    expect(cn('foo', Infinity)).toBe('foo Infinity');
    expect(cn('foo', -Infinity)).toBe('foo -Infinity');
  });

  it('should preserve whitespace in strings', () => {
    expect(cn('foo bar', 'baz qux')).toBe('foo bar baz qux');
    expect(cn('  foo  ', '  bar  ')).toBe('  foo     bar  ');
  });
});