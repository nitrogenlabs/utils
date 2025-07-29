import {escape, unescape} from './escape.js';

describe('Escape Utilities', () => {
  describe('escape', () => {
    it('should escape HTML entities', () => {
      expect(escape('<script>alert("hello")</script>')).toBe('&lt;script&gt;alert(&quot;hello&quot;)&lt;/script&gt;');
      expect(escape('& < > " \'')).toBe('&amp; &lt; &gt; &quot; &#39;');
    });

    it('should handle empty string', () => {
      expect(escape('')).toBe('');
    });

    it('should handle strings without special characters', () => {
      expect(escape('hello world')).toBe('hello world');
      expect(escape('Hello World 123')).toBe('Hello World 123');
    });

    it('should handle individual special characters', () => {
      expect(escape('&')).toBe('&amp;');
      expect(escape('<')).toBe('&lt;');
      expect(escape('>')).toBe('&gt;');
      expect(escape('"')).toBe('&quot;');
      expect(escape("'")).toBe('&#39;');
    });

    it('should handle mixed content', () => {
      expect(escape('Hello & World < 10 > 5')).toBe('Hello &amp; World &lt; 10 &gt; 5');
      expect(escape('User said "Hello" and \'Goodbye\'')).toBe('User said &quot;Hello&quot; and &#39;Goodbye&#39;');
    });

    it('should handle multiple occurrences of the same character', () => {
      expect(escape('<<<<')).toBe('&lt;&lt;&lt;&lt;');
      expect(escape('&&&&')).toBe('&amp;&amp;&amp;&amp;');
      expect(escape('""""')).toBe('&quot;&quot;&quot;&quot;');
    });

    it('should handle strings with numbers and special characters', () => {
      expect(escape('Price: $10 < $20 > $5')).toBe('Price: $10 &lt; $20 &gt; $5');
      expect(escape('Count: 1 & 2 & 3')).toBe('Count: 1 &amp; 2 &amp; 3');
    });

    it('should handle newlines and other whitespace', () => {
      expect(escape('Hello\nWorld')).toBe('Hello\nWorld');
      expect(escape('Hello\tWorld')).toBe('Hello\tWorld');
      expect(escape('Hello\r\nWorld')).toBe('Hello\r\nWorld');
    });
  });

  describe('unescape', () => {
    it('should unescape HTML entities', () => {
      expect(unescape('&lt;script&gt;alert(&quot;hello&quot;)&lt;/script&gt;')).toBe('<script>alert("hello")</script>');
      expect(unescape('&amp; &lt; &gt; &quot; &#39;')).toBe('& < > " \'');
    });

    it('should handle empty string', () => {
      expect(unescape('')).toBe('');
    });

    it('should handle strings without HTML entities', () => {
      expect(unescape('hello world')).toBe('hello world');
      expect(unescape('Hello World 123')).toBe('Hello World 123');
    });

    it('should handle individual HTML entities', () => {
      expect(unescape('&amp;')).toBe('&');
      expect(unescape('&lt;')).toBe('<');
      expect(unescape('&gt;')).toBe('>');
      expect(unescape('&quot;')).toBe('"');
      expect(unescape('&#39;')).toBe('\'');
    });

    it('should handle mixed content', () => {
      expect(unescape('Hello &amp; World &lt; 10 &gt; 5')).toBe('Hello & World < 10 > 5');
      expect(unescape('User said &quot;Hello&quot; and &#39;Goodbye&#39;')).toBe('User said "Hello" and \'Goodbye\'');
    });

    it('should handle multiple occurrences of the same entity', () => {
      expect(unescape('&lt;&lt;&lt;&lt;')).toBe('<<<<');
      expect(unescape('&amp;&amp;&amp;&amp;')).toBe('&&&&');
      expect(unescape('&quot;&quot;&quot;&quot;')).toBe('""""');
    });

    it('should handle strings with numbers and HTML entities', () => {
      expect(unescape('Price: $10 &lt; $20 &gt; $5')).toBe('Price: $10 < $20 > $5');
      expect(unescape('Count: 1 &amp; 2 &amp; 3')).toBe('Count: 1 & 2 & 3');
    });

    it('should handle newlines and other whitespace', () => {
      expect(unescape('Hello\nWorld')).toBe('Hello\nWorld');
      expect(unescape('Hello\tWorld')).toBe('Hello\tWorld');
      expect(unescape('Hello\r\nWorld')).toBe('Hello\r\nWorld');
    });

    it('should handle partial entities', () => {
      expect(unescape('&amp')).toBe('&amp');
      expect(unescape('&lt')).toBe('&lt');
      expect(unescape('&gt')).toBe('&gt');
    });

    it('should handle unknown entities', () => {
      expect(unescape('&unknown;')).toBe('&unknown;');
      expect(unescape('&xyz;')).toBe('&xyz;');
    });
  });

  describe('round-trip consistency', () => {
    it('should maintain consistency when escaping and unescaping', () => {
      const original = '<script>alert("hello")</script>';
      const escaped = escape(original);
      const unescaped = unescape(escaped);
      expect(unescaped).toBe(original);
    });

    it('should handle complex mixed content', () => {
      const original = 'User said "Hello & Goodbye" < 10 > 5';
      const escaped = escape(original);
      const unescaped = unescape(escaped);
      expect(unescaped).toBe(original);
    });

    it('should handle multiple special characters', () => {
      const original = '& < > " \' & < > " \'';
      const escaped = escape(original);
      const unescaped = unescape(escaped);
      expect(unescaped).toBe(original);
    });
  });
});