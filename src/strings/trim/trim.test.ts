import {trim, trimEnd, trimStart} from './trim.js';

describe('Trim Utilities', () => {
  describe('trim', () => {
    describe('default whitespace trimming', () => {
      it('should trim whitespace from both ends', () => {
        expect(trim('  hello world  ')).toBe('hello world');
        expect(trim('\t\nhello world\r\n')).toBe('hello world');
        expect(trim('   ')).toBe('');
      });

      it('should handle strings with no leading/trailing whitespace', () => {
        expect(trim('hello world')).toBe('hello world');
        expect(trim('')).toBe('');
      });

      it('should handle strings with only leading whitespace', () => {
        expect(trim('  hello world')).toBe('hello world');
        expect(trim('\t\nhello world')).toBe('hello world');
      });

      it('should handle strings with only trailing whitespace', () => {
        expect(trim('hello world  ')).toBe('hello world');
        expect(trim('hello world\r\n')).toBe('hello world');
      });

      it('should handle strings with mixed whitespace', () => {
        expect(trim(' \t \n hello world \r \n ')).toBe('hello world');
      });
    });

    describe('custom character trimming', () => {
      it('should trim custom characters from both ends', () => {
        expect(trim('***hello world***', '*')).toBe('hello world');
        expect(trim('---hello world---', '-')).toBe('hello world');
        expect(trim('###hello world###', '#')).toBe('hello world');
      });

      it('should handle multiple custom characters', () => {
        expect(trim('***hello world---', '*-')).toBe('hello world');
        expect(trim('###hello world***', '#*')).toBe('hello world');
      });

      it('should handle special regex characters', () => {
        expect(trim('.*hello world.*', '.*')).toBe('hello world');
        expect(trim('+hello world+', '+')).toBe('hello world');
        expect(trim('?hello world?', '?')).toBe('hello world');
        expect(trim('^hello world^', '^')).toBe('hello world');
        expect(trim('$hello world$', '$')).toBe('hello world');
        expect(trim('{hello world}', '{}')).toBe('hello world');
        expect(trim('(hello world)', '()')).toBe('hello world');
        expect(trim('[hello world]', '[]')).toBe('hello world');
        expect(trim('\\hello world\\', '\\')).toBe('hello world');
      });

      it('should handle strings with no leading/trailing custom chars', () => {
        expect(trim('hello world', '*')).toBe('hello world');
        expect(trim('', '*')).toBe('');
      });

      it('should handle strings with only leading custom chars', () => {
        expect(trim('***hello world', '*')).toBe('hello world');
        expect(trim('---hello world', '-')).toBe('hello world');
      });

      it('should handle strings with only trailing custom chars', () => {
        expect(trim('hello world***', '*')).toBe('hello world');
        expect(trim('hello world---', '-')).toBe('hello world');
      });

      it('should handle case-sensitive trimming', () => {
        expect(trim('***hello world***', '*')).toBe('hello world');
        expect(trim('***hello world***', 'A')).toBe('***hello world***');
      });
    });

    describe('edge cases', () => {
      it('should handle empty string', () => {
        expect(trim('')).toBe('');
        expect(trim('', '*')).toBe('');
      });

      it('should handle string with only trimming characters', () => {
        expect(trim('   ')).toBe('');
        expect(trim('***', '*')).toBe('');
      });

      it('should handle string with mixed trimming characters', () => {
        expect(trim(' * * * ', ' *')).toBe('');
        expect(trim('***---', '*-')).toBe('');
      });
    });
  });

  describe('trimStart', () => {
    describe('default whitespace trimming', () => {
      it('should trim whitespace from start only', () => {
        expect(trimStart('  hello world  ')).toBe('hello world  ');
        expect(trimStart('\t\nhello world\r\n')).toBe('hello world\r\n');
        expect(trimStart('   ')).toBe('');
      });

      it('should handle strings with no leading whitespace', () => {
        expect(trimStart('hello world')).toBe('hello world');
        expect(trimStart('hello world  ')).toBe('hello world  ');
        expect(trimStart('')).toBe('');
      });

      it('should handle strings with only leading whitespace', () => {
        expect(trimStart('  hello world')).toBe('hello world');
        expect(trimStart('\t\nhello world')).toBe('hello world');
      });
    });

    describe('custom character trimming', () => {
      it('should trim custom characters from start only', () => {
        expect(trimStart('***hello world***', '*')).toBe('hello world***');
        expect(trimStart('---hello world---', '-')).toBe('hello world---');
        expect(trimStart('###hello world###', '#')).toBe('hello world###');
      });

      it('should handle multiple custom characters', () => {
        expect(trimStart('***hello world---', '*-')).toBe('hello world---');
        expect(trimStart('###hello world***', '#*')).toBe('hello world***');
      });

      it('should handle special regex characters', () => {
        expect(trimStart('.*hello world.*', '.*')).toBe('hello world.*');
        expect(trimStart('+hello world+', '+')).toBe('hello world+');
        expect(trimStart('?hello world?', '?')).toBe('hello world?');
      });

      it('should handle strings with no leading custom chars', () => {
        expect(trimStart('hello world', '*')).toBe('hello world');
        expect(trimStart('hello world***', '*')).toBe('hello world***');
      });
    });
  });

  describe('trimEnd', () => {
    describe('default whitespace trimming', () => {
      it('should trim whitespace from end only', () => {
        expect(trimEnd('  hello world  ')).toBe('  hello world');
        expect(trimEnd('\t\nhello world\r\n')).toBe('\t\nhello world');
        expect(trimEnd('   ')).toBe('');
      });

      it('should handle strings with no trailing whitespace', () => {
        expect(trimEnd('hello world')).toBe('hello world');
        expect(trimEnd('  hello world')).toBe('  hello world');
        expect(trimEnd('')).toBe('');
      });

      it('should handle strings with only trailing whitespace', () => {
        expect(trimEnd('hello world  ')).toBe('hello world');
        expect(trimEnd('hello world\r\n')).toBe('hello world');
      });
    });

    describe('custom character trimming', () => {
      it('should trim custom characters from end only', () => {
        expect(trimEnd('***hello world***', '*')).toBe('***hello world');
        expect(trimEnd('---hello world---', '-')).toBe('---hello world');
        expect(trimEnd('###hello world###', '#')).toBe('###hello world');
      });

      it('should handle multiple custom characters', () => {
        expect(trimEnd('***hello world---', '*-')).toBe('***hello world');
        expect(trimEnd('###hello world***', '#*')).toBe('###hello world');
      });

      it('should handle special regex characters', () => {
        expect(trimEnd('.*hello world.*', '.*')).toBe('.*hello world');
        expect(trimEnd('+hello world+', '+')).toBe('+hello world');
        expect(trimEnd('?hello world?', '?')).toBe('?hello world');
      });

      it('should handle strings with no trailing custom chars', () => {
        expect(trimEnd('hello world', '*')).toBe('hello world');
        expect(trimEnd('***hello world', '*')).toBe('***hello world');
      });
    });
  });

  describe('consistency between functions', () => {
    it('should maintain consistency between trim, trimStart, and trimEnd', () => {
      const input = '  hello world  ';
      const startTrimmed = trimStart(input);
      const endTrimmed = trimEnd(startTrimmed);
      const fullyTrimmed = trim(input);

      expect(endTrimmed).toBe('hello world');
      expect(fullyTrimmed).toBe('hello world');
    });

    it('should handle custom characters consistently', () => {
      const input = '***hello world***';
      const startTrimmed = trimStart(input, '*');
      const endTrimmed = trimEnd(startTrimmed, '*');
      const fullyTrimmed = trim(input, '*');

      expect(endTrimmed).toBe('hello world');
      expect(fullyTrimmed).toBe('hello world');
    });
  });
});