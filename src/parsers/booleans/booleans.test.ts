import {parseBoolean} from './booleans.js';

describe('parseBoolean', () => {
  describe('basic boolean values', () => {
    it('should return true for boolean true', () => {
      expect(parseBoolean(true)).toBe(true);
    });

    it('should return false for boolean false', () => {
      expect(parseBoolean(false)).toBe(false);
    });
  });

  describe('string values', () => {
    it('should return true for string "true"', () => {
      expect(parseBoolean('true')).toBe(true);
    });

    it('should return false for string "false"', () => {
      expect(parseBoolean('false')).toBe(false);
    });

    it('should return true for any non-"false" string', () => {
      expect(parseBoolean('hello')).toBe(true);
      expect(parseBoolean('0')).toBe(true);
      expect(parseBoolean('null')).toBe(true);
      expect(parseBoolean('undefined')).toBe(true);
    });
  });

  describe('null and undefined values', () => {
    it('should return false for null when not strict', () => {
      expect(parseBoolean(null)).toBe(false);
    });

    it('should return false for undefined when not strict', () => {
      expect(parseBoolean(undefined)).toBe(false);
    });

    it('should return null for null when strict', () => {
      expect(parseBoolean(null, true)).toBe(null);
    });

    it('should return undefined for undefined when strict', () => {
      expect(parseBoolean(undefined, true)).toBe(undefined);
    });
  });

  describe('falsy values', () => {
    it('should return false for empty string', () => {
      expect(parseBoolean('')).toBe(false);
    });
  });

  describe('truthy values', () => {
    it('should return true for non-empty strings', () => {
      expect(parseBoolean('hello')).toBe(true);
      expect(parseBoolean('0')).toBe(true);
      expect(parseBoolean('false')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle mixed case strings', () => {
      expect(parseBoolean('TRUE')).toBe(true);
      expect(parseBoolean('True')).toBe(true);
      expect(parseBoolean('FALSE')).toBe(false);
      expect(parseBoolean('False')).toBe(false);
    });

    it('should handle whitespace in strings', () => {
      expect(parseBoolean(' true ')).toBe(true);
      expect(parseBoolean(' false ')).toBe(false);
    });

    it('should handle special string values', () => {
      expect(parseBoolean('yes')).toBe(true);
      expect(parseBoolean('no')).toBe(true);
      expect(parseBoolean('on')).toBe(true);
      expect(parseBoolean('off')).toBe(true);
      expect(parseBoolean('1')).toBe(true);
      expect(parseBoolean('0')).toBe(true);
    });
  });
});