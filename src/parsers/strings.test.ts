import {parseArangoId, parseChar, parseEmail, parseId} from './strings';

describe('StringService', () => {
  describe('.parseArangoId', () => {
    it('should trim id', () => {
      expect(parseArangoId(' hello/world ')).toEqual('hello/world');
    });

    it('should return empty string for incorrect format', () => {
      expect(parseArangoId('hello')).toEqual('');
    });

    it('should filter commands', () => {
      expect(parseArangoId('hello/world) FILTER h.test == "test"')).toEqual('hello/worldFILTERhtesttest');
    });
  });

  describe('.parseChar', () => {
    it('should trim whitespace', () => {
      expect(parseChar(' test ')).toEqual('test');
    });

    it('should filter numbers', () => {
      expect(parseChar('test123')).toEqual('test');
    });

    it('should filter punctuation', () => {
      expect(parseChar('test@gmail.com')).toEqual('testgmailcom');
    });
  });

  describe('.parseEmail', () => {
    it('should trim whitespace', () => {
      expect(parseEmail(' test@gmail.com ')).toEqual('test@gmail.com');
    });

    it('should change to lowercase', () => {
      expect(parseEmail('TestING@gmail.com')).toEqual('testing@gmail.com');
    });

    it('should not filter numbers', () => {
      expect(parseEmail('test.1@gmail.com')).toEqual('test.1@gmail.com');
    });

    it('should not allow invalid punctuation', () => {
      expect(parseEmail('test.1!@gmail.com')).toEqual('');
    });
  });

  describe('.parseId', () => {
    it('should trim whitespace', () => {
      expect(parseId(' abc123 ')).toEqual('abc123');
    });

    it('should change to lowercase', () => {
      const formatId: string = parseId('qazwsxedcrfvtgbyhnujmikolp1234567890qazwsxedcrf');
      expect(formatId.length).toEqual(32);
    });

    it('should return string on undefined', () => {
      expect(parseId(undefined)).toEqual('');
    });
  });
});
