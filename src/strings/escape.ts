export const escape = (string: string): string =>
  string.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
      }[char] || char)
  );

export const unescape = (string: string): string =>
  string.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;/g,
    (char) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': '\''
      }[char] || char)
  );
