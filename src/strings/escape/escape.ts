/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const escape = (string: string): string =>
  string.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '"': '&quot;',
        '&': '&amp;',
        '\'': '&#39;',
        '<': '&lt;',
        '>': '&gt;'
      }[char] || char)
  );

export const unescape = (string: string): string =>
  string.replace(
    /&amp;|&lt;|&gt;|&quot;|&#39;/g,
    (char) =>
      ({
        '&#39;': '\'',
        '&amp;': '&',
        '&gt;': '>',
        '&lt;': '<',
        '&quot;': '"'
      }[char] || char)
  );
