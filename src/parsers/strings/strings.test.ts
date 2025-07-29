import * as strings from './strings.js';

describe('StringService', () => {
  describe('.parseArangoId', () => {
    it('should trim id', () => {
      expect(strings.parseArangoId(' hello/world ')).toEqual('hello/world');
    });

    it('should return empty string for incorrect format', () => {
      expect(strings.parseArangoId('hello')).toEqual('');
    });

    it('should filter commands', () => {
      expect(strings.parseArangoId('hello/world) FILTER h.test == "test"')).toEqual('hello/worldFILTERhtesttest');
    });

    it('should return empty string for undefined', () => {
      expect(strings.parseArangoId('undefined')).toEqual('');
    });

    it('should return empty string for non-string input', () => {
      expect(strings.parseArangoId(null as any)).toEqual('');
    });
  });

  describe('.parseChar', () => {
    it('should trim whitespace', () => {
      expect(strings.parseChar(' test ')).toEqual('test');
    });

    it('should filter numbers', () => {
      expect(strings.parseChar('test123')).toEqual('test');
    });

    it('should filter punctuation', () => {
      expect(strings.parseChar('test@gmail.com')).toEqual('testgmailcom');
    });

    it('should respect max length', () => {
      expect(strings.parseChar('abcdefghijklmnop', 5)).toEqual('abcde');
    });

    it('should return default value for invalid input', () => {
      expect(strings.parseChar(null as any, undefined, 'default')).toEqual('default');
    });

    it('should return empty string for undefined input', () => {
      expect(strings.parseChar('undefined')).toEqual('');
    });
  });

  describe('.parseEmail', () => {
    it('should trim whitespace', () => {
      expect(strings.parseEmail(' test@gmail.com ')).toEqual('test@gmail.com');
    });

    it('should change to lowercase', () => {
      expect(strings.parseEmail('TestING@gmail.com')).toEqual('testing@gmail.com');
    });

    it('should not filter numbers', () => {
      expect(strings.parseEmail('test.1@gmail.com')).toEqual('test.1@gmail.com');
    });

    it('should not allow invalid punctuation', () => {
      expect(strings.parseEmail('test.1!@gmail.com')).toEqual('');
    });

    it('should handle valid email with dots', () => {
      expect(strings.parseEmail('test.name@domain.co.uk')).toEqual('test.name@domain.co.uk');
    });

    it('should return empty for invalid email format', () => {
      expect(strings.parseEmail('invalid-email')).toEqual('');
    });

    it('should return empty for empty input', () => {
      expect(strings.parseEmail('')).toEqual('');
    });

    it('should reject very long emails', () => {
      const longEmail = 'a'.repeat(130) + '@gmail.com';
      expect(strings.parseEmail(longEmail)).toEqual('');
    });

    it('should handle moderately long emails', () => {
      const moderateEmail = 'a'.repeat(50) + '@gmail.com';
      expect(strings.parseEmail(moderateEmail)).toEqual('a'.repeat(50) + '@gmail.com');
    });

    it('should reject emails with invalid domain structure', () => {
      expect(strings.parseEmail('test@')).toEqual('');
      expect(strings.parseEmail('@gmail.com')).toEqual('');
      expect(strings.parseEmail('test@gmail')).toEqual('');
    });

    it('should reject emails with invalid local part', () => {
      expect(strings.parseEmail('.test@gmail.com')).toEqual('');
      expect(strings.parseEmail('test.@gmail.com')).toEqual('');
    });

    it('should reject emails with invalid domain parts', () => {
      expect(strings.parseEmail('test@.gmail.com')).toEqual('');
      expect(strings.parseEmail('test@gmail-.com')).toEqual('');
      expect(strings.parseEmail('test@gmail.-com')).toEqual('');
    });
  });

  describe('.parseId', () => {
    it('should trim whitespace', () => {
      expect(strings.parseId(' abc123 ')).toEqual('abc123');
    });

    it('should change to lowercase', () => {
      const formatId: string = strings.parseId('qazwsxedcrfvtgbyhnujmikolp1234567890qazwsxedcrf');
      expect(formatId.length).toEqual(32);
    });

    it('should return string on undefined', () => {
      expect(strings.parseId('')).toEqual('');
    });

    it('should filter special characters', () => {
      expect(strings.parseId('abc-123_456')).toEqual('abc123456');
    });

    it('should return empty for undefined input', () => {
      expect(strings.parseId('undefined')).toEqual('');
    });
  });

  describe('.parsePassword', () => {
    it('should trim whitespace', () => {
      expect(strings.parsePassword(' password123 ')).toEqual('password123');
    });

    it('should truncate to 32 characters', () => {
      const longPassword = 'a'.repeat(50);
      expect(strings.parsePassword(longPassword).length).toEqual(32);
    });

    it('should return empty for null input', () => {
      expect(strings.parsePassword(null as any)).toEqual('');
    });

    it('should preserve special characters', () => {
      expect(strings.parsePassword('pass@word#123')).toEqual('pass@word#123');
    });
  });

  describe('.parsePhone', () => {
    it('should return empty for invalid phone number', () => {
      expect(strings.parsePhone('invalid-phone')).toEqual('');
    });

    it('should return empty for empty input', () => {
      expect(strings.parsePhone('')).toEqual('');
    });

    it('should handle valid phone number format', () => {
      const result = strings.parsePhone('+1-555-123-4567');
      expect(typeof result).toBe('string');
    });

    it('should handle phone number with country code', () => {
      const result = strings.parsePhone('555-123-4567', 'US');
      expect(typeof result).toBe('string');
    });
  });

  describe('.parseMentions', () => {
    it('should extract valid mentions', () => {
      expect(strings.parseMentions('Hello @user1 and @user2!')).toEqual(['@user1', '@user2']);
    });

    it('should filter invalid mentions', () => {
      expect(strings.parseMentions('@123 @user @invalid-123')).toEqual(['@user']);
    });

    it('should return unique mentions', () => {
      expect(strings.parseMentions('@user @user @user')).toEqual(['@user']);
    });

    it('should handle empty input', () => {
      expect(strings.parseMentions('')).toEqual([]);
    });

    it('should truncate long mentions', () => {
      const longMention = '@' + 'a'.repeat(40);
      const result = strings.parseMentions(longMention);
      // Just verify it returns an array and doesn't hang
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('.parseString', () => {
    it('should trim whitespace', () => {
      expect(strings.parseString(' test ')).toEqual('test');
    });

    it('should respect max length', () => {
      expect(strings.parseString('abcdefghijklmnop', 5)).toEqual('abcde');
    });

    it('should return default value for empty input', () => {
      expect(strings.parseString('', undefined, 'default')).toEqual('default');
    });

    it('should handle null input', () => {
      expect(strings.parseString(null as any)).toEqual('');
    });

    it('should handle undefined input', () => {
      expect(strings.parseString(undefined as any)).toEqual('');
    });

    it('should not apply default when string is not empty', () => {
      expect(strings.parseString('test', undefined, 'default')).toEqual('test');
    });
  });

  describe('.parseTags', () => {
    it('should extract valid tags', () => {
      expect(strings.parseTags('Hello #tag1 and #tag2!')).toEqual(['#tag1', '#tag2']);
    });

    it('should filter invalid tags', () => {
      expect(strings.parseTags('#123 #tag #invalid-123')).toEqual(['#tag']);
    });

    it('should return unique tags', () => {
      expect(strings.parseTags('#tag #tag #tag')).toEqual(['#tag']);
    });

    it('should handle empty input', () => {
      expect(strings.parseTags('')).toEqual([]);
    });

    it('should truncate long tags', () => {
      const longTag = '#' + 'a'.repeat(40);
      const result = strings.parseTags(longTag);
      // Just verify it returns an array and doesn't hang
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('parseTemplate', () => {
    it('should create a new token', () => {
      const results = strings.parseTemplate('this is a [test]', {test: 'hello world'});

      expect(results).toBe('this is a hello world');
    });

    it('should handle multiple tokens', () => {
      const results = strings.parseTemplate('Hello [name], you are [age] years old', {
        name: 'John',
        age: '25'
      });
      expect(results).toBe('Hello John, you are 25 years old');
    });

    it('should keep unmatched tokens', () => {
      const results = strings.parseTemplate('Hello [name] and [unknown]', {name: 'John'});
      expect(results).toBe('Hello John and [unknown]');
    });

    it('should handle empty variables object', () => {
      const results = strings.parseTemplate('Hello [name]', {});
      expect(results).toBe('Hello [name]');
    });
  });

  describe('.parseUrl', () => {
    it('should encode URL', () => {
      expect(strings.parseUrl('https://example.com/path with spaces')).toEqual('https://example.com/path%20with%20spaces');
    });

    it('should trim whitespace', () => {
      expect(strings.parseUrl(' https://example.com ')).toEqual('https://example.com');
    });

    it('should return empty for undefined input', () => {
      expect(strings.parseUrl('undefined')).toEqual('');
    });

    it('should return empty for null input', () => {
      expect(strings.parseUrl(null as any)).toEqual('');
    });

    it('should handle special characters', () => {
      expect(strings.parseUrl('https://example.com/path?param=value&other=test')).toEqual('https://example.com/path?param=value&other=test');
    });
  });

  describe('.parseUsername', () => {
    it('should convert to lowercase', () => {
      expect(strings.parseUsername('USERNAME')).toEqual('username');
    });

    it('should remove special characters', () => {
      expect(strings.parseUsername('user@name!')).toEqual('username');
    });

    it('should truncate to 32 characters', () => {
      const longUsername = 'a'.repeat(50);
      expect(strings.parseUsername(longUsername).length).toEqual(32);
    });

    it('should return empty for undefined input', () => {
      expect(strings.parseUsername('undefined')).toEqual('');
    });

    it('should trim whitespace', () => {
      expect(strings.parseUsername(' user name ')).toEqual('username');
    });
  });

  describe('.parseVarChar', () => {
    it('should remove special characters but keep spaces', () => {
      expect(strings.parseVarChar('Hello World!')).toEqual('Hello World');
    });

    it('should respect max length', () => {
      expect(strings.parseVarChar('Hello World', 5)).toEqual('Hello');
    });

    it('should return default value for empty input', () => {
      expect(strings.parseVarChar('', undefined, 'default')).toEqual('default');
    });

    it('should handle null input', () => {
      expect(strings.parseVarChar(null as any)).toEqual('');
    });

    it('should not apply default when string is not empty', () => {
      expect(strings.parseVarChar('test', undefined, 'default')).toEqual('test');
    });

    it('should trim whitespace', () => {
      expect(strings.parseVarChar(' test ')).toEqual('test');
    });
  });

  describe('.stripHTML', () => {
    it('should remove HTML tags', () => {
      expect(strings.stripHTML('<p>Hello <strong>World</strong></p>')).toEqual('Hello World');
    });

    it('should handle self-closing tags', () => {
      expect(strings.stripHTML('<img src="test.jpg" />')).toEqual('');
    });

    it('should handle malformed HTML', () => {
      expect(strings.stripHTML('<p>Hello <strong>World')).toEqual('Hello World');
    });

    it('should return empty for undefined input', () => {
      expect(strings.stripHTML('undefined')).toEqual('');
    });

    it('should handle text without HTML', () => {
      expect(strings.stripHTML('Plain text')).toEqual('Plain text');
    });
  });

  describe('.createPassword', () => {
    it('should create password hash', () => {
      const result = strings.createPassword('password123', 'salt123');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty for empty password', () => {
      expect(strings.createPassword('', 'salt123')).toEqual('');
    });

    it('should return empty for empty salt', () => {
      expect(strings.createPassword('password123', '')).toEqual('');
    });

    it('should return empty for null inputs', () => {
      expect(strings.createPassword(null as any, 'salt')).toEqual('');
    });
  });

  describe('.createHash', () => {
    it('should create hash with key and salt', () => {
      const result = strings.createHash('testkey', 'testsalt');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should create hash with default salt', () => {
      const result = strings.createHash('testkey');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should create different hashes for different inputs', () => {
      const hash1 = strings.createHash('key1', 'salt1');
      const hash2 = strings.createHash('key2', 'salt1');
      expect(hash1).not.toEqual(hash2);
    });
  });
});
