import {lowerCaseKeys, toQueryString} from './objects';

describe('Object Parsers', () => {
  describe('lowerCaseKeys', () => {
    it('should convert object keys to lowercase', () => {
      const input = { Name: 'John', AGE: 30, City: 'New York' };
      const expected = { name: 'John', age: 30, city: 'New York' };
      expect(lowerCaseKeys(input)).toEqual(expected);
    });

    it('should handle empty object', () => {
      expect(lowerCaseKeys({})).toEqual({});
    });

    it('should handle object with already lowercase keys', () => {
      const input = { name: 'John', age: 30 };
      expect(lowerCaseKeys(input)).toEqual(input);
    });

    it('should handle object with mixed case keys', () => {
      const input = { Name: 'John', age: 30, CITY: 'New York' };
      const expected = { name: 'John', age: 30, city: 'New York' };
      expect(lowerCaseKeys(input)).toEqual(expected);
    });

    it('should handle object with special characters in keys', () => {
      const input = { 'User-Name': 'John', 'EMAIL_ADDRESS': 'test@example.com' };
      const expected = { 'user-name': 'John', 'email_address': 'test@example.com' };
      expect(lowerCaseKeys(input)).toEqual(expected);
    });

    it('should handle object with numbers in keys', () => {
      const input = { 'User1': 'John', 'TEST2': 'value' };
      const expected = { 'user1': 'John', 'test2': 'value' };
      expect(lowerCaseKeys(input)).toEqual(expected);
    });

    it('should handle default parameter', () => {
      expect(lowerCaseKeys()).toEqual({});
    });

    it('should not modify the original object', () => {
      const input = { Name: 'John', AGE: 30 };
      const result = lowerCaseKeys(input);
      expect(input).toEqual({ Name: 'John', AGE: 30 });
      expect(result).toEqual({ name: 'John', age: 30 });
    });
  });

  describe('toQueryString', () => {
    it('should convert object to query string', () => {
      const input = { name: 'John', age: '30', city: 'New York' };
      const expected = 'name=John&age=30&city=New%20York';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle empty object', () => {
      expect(toQueryString({})).toBe('');
    });

    it('should handle object with special characters', () => {
      const input = { name: 'John Doe', email: 'test@example.com', query: 'hello world' };
      const expected = 'name=John%20Doe&email=test%40example.com&query=hello%20world';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle object with numbers', () => {
      const input = { id: 123, count: 0, price: 99.99 };
      const expected = 'id=123&count=0&price=99.99';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle object with boolean values', () => {
      const input = { active: true, verified: false };
      const expected = 'active=true&verified=false';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle object with null and undefined values', () => {
      const input = { name: 'John', age: null, city: undefined };
      const expected = 'name=John&age=null&city=undefined';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle object with array values', () => {
      const input = { tags: ['javascript', 'typescript'], ids: [1, 2, 3] };
      const expected = 'tags=javascript,typescript&ids=1,2,3';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle object with nested objects', () => {
      const input = { user: { name: 'John', age: 30 } };
      const expected = 'user=%5Bobject%20Object%5D';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle default parameter', () => {
      expect(toQueryString()).toBe('');
    });

    it('should preserve key order', () => {
      const input = { z: 'last', a: 'first', m: 'middle' };
      const result = toQueryString(input);
      expect(result).toMatch(/^z=last&a=first&m=middle$/);
    });

    it('should handle empty string values', () => {
      const input = { name: '', description: 'test' };
      const expected = 'name=&description=test';
      expect(toQueryString(input)).toBe(expected);
    });

    it('should handle zero values', () => {
      const input = { count: 0, price: 0.0 };
      const expected = 'count=0&price=0';
      expect(toQueryString(input)).toBe(expected);
    });
  });
});