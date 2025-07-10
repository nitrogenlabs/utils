import { replace } from './replace';

describe('Replace Utility', () => {
  describe('string pattern with string replacement', () => {
    it('should replace simple string patterns', () => {
      expect(replace('hello world', 'world', 'universe')).toBe('hello universe');
      expect(replace('hello hello hello', 'hello', 'hi')).toBe('hi hi hi');
    });

    it('should handle empty string pattern', () => {
      expect(replace('hello world', '', 'X')).toBe('XhXeXlXlXoX XwXoXrXlXdX');
    });

    it('should handle empty replacement', () => {
      expect(replace('hello world', 'world', '')).toBe('hello ');
      expect(replace('hello hello hello', 'hello', '')).toBe('  ');
    });

    it('should handle case-sensitive replacement', () => {
      expect(replace('Hello World', 'world', 'Universe')).toBe('Hello World');
      expect(replace('Hello World', 'World', 'Universe')).toBe('Hello Universe');
    });

    it('should handle special characters in pattern', () => {
      expect(replace('hello.world', '.', '-')).toBe('hello-world');
      expect(replace('hello*world', '*', ' ')).toBe('hello world');
    });

    it('should handle special characters in replacement', () => {
      expect(replace('hello world', 'world', 'universe!')).toBe('hello universe!');
      expect(replace('hello world', 'world', 'universe & beyond')).toBe('hello universe & beyond');
    });
  });

  describe('regex pattern with string replacement', () => {
    it('should replace regex patterns', () => {
      expect(replace('hello world', /world/, 'universe')).toBe('hello universe');
      expect(replace('hello world', /o/g, '0')).toBe('hell0 w0rld');
    });

    it('should handle global regex replacement', () => {
      expect(replace('hello hello hello', /hello/g, 'hi')).toBe('hi hi hi');
      expect(replace('hello world', /[aeiou]/g, '*')).toBe('h*ll* w*rld');
    });

    it('should handle case-insensitive regex', () => {
      expect(replace('Hello World', /world/i, 'Universe')).toBe('Hello Universe');
      expect(replace('HELLO WORLD', /hello/gi, 'hi')).toBe('hi WORLD');
    });

    it('should handle complex regex patterns', () => {
      expect(replace('hello123world', /\d+/g, '')).toBe('helloworld');
      expect(replace('hello world', /\s+/g, '-')).toBe('hello-world');
    });

    it('should handle regex with special characters', () => {
      expect(replace('hello.world', /\./g, '-')).toBe('hello-world');
      expect(replace('hello*world', /\*/g, ' ')).toBe('hello world');
    });
  });

  describe('string pattern with function replacement', () => {
    it('should use function replacement', () => {
      const result = replace('hello world', 'world', (match) => match.toUpperCase());
      expect(result).toBe('hello WORLD');
    });

    it('should pass match to function', () => {
      const result = replace('hello world', 'world', (match) => `[${match}]`);
      expect(result).toBe('hello [world]');
    });

    it('should handle multiple replacements with function', () => {
      // The index passed is the character index, not the match count
      const result = replace('hello hello hello', 'hello', (match, index) => `${match}${index}`);
      expect(result).toBe('hello0 hello6 hello12');
    });
  });

  describe('regex pattern with function replacement', () => {
    it('should use function with regex', () => {
      const result = replace('hello world', /[aeiou]/g, (match) => match.toUpperCase());
      expect(result).toBe('hEllO wOrld');
    });

    it('should pass regex groups to function', () => {
      const result = replace('hello world', /(hello) (world)/, (match, group1, group2) => `${group2} ${group1}`);
      expect(result).toBe('world hello');
    });

    it('should handle complex regex with function', () => {
      const result = replace('hello123world', /(\d+)/g, (match) => `[${match}]`);
      expect(result).toBe('hello[123]world');
    });

    it('should handle case-insensitive regex with function', () => {
      const result = replace('Hello World', /world/gi, (match) => match.toUpperCase());
      expect(result).toBe('Hello WORLD');
    });
  });

  describe('edge cases', () => {
    it('should handle empty input string', () => {
      expect(replace('', 'hello', 'world')).toBe('');
      expect(replace('', /hello/g, 'world')).toBe('');
    });

    it('should handle pattern not found', () => {
      expect(replace('hello world', 'universe', 'galaxy')).toBe('hello world');
      expect(replace('hello world', /universe/g, 'galaxy')).toBe('hello world');
    });

    it('should handle null/undefined replacement', () => {
      expect(replace('hello world', 'world', null as any)).toBe('hello null');
      expect(replace('hello world', 'world', undefined as any)).toBe('hello undefined');
    });

    it('should handle regex with no matches', () => {
      expect(replace('hello world', /\d+/g, 'X')).toBe('hello world');
      expect(replace('hello world', /[A-Z]/g, 'X')).toBe('hello world');
    });

    it('should handle regex with empty matches', () => {
      expect(replace('hello world', /(?=o)/g, 'X')).toBe('hellXo wXorld');
    });
  });

  describe('complex scenarios', () => {
    it('should handle multiple replacements in sequence', () => {
      let result = replace('hello world', 'hello', 'hi');
      result = replace(result, 'world', 'universe');
      expect(result).toBe('hi universe');
    });

    it('should handle regex with lookahead/lookbehind', () => {
      const result = replace('hello world', /(?<=hello)\s+(?=world)/g, ' beautiful ');
      expect(result).toBe('hello beautiful world');
    });

    it('should handle function that returns different types', () => {
      const result = replace('hello world', /o/g, () => 0 as any);
      expect(result).toBe('hell0 w0rld');
    });

    it('should handle nested replacements', () => {
      const result = replace('hello world', /hello/, (match) =>
        replace(match, /o/g, '0')
      );
      expect(result).toBe('hell0 world');
    });
  });
});