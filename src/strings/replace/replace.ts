/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const replace = (
  string: string,
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: any[]) => string)
): string => {
  // If pattern is a string, create a global regex to replace all occurrences
  if (typeof pattern === 'string') {
    // Handle empty string pattern specially
    if (pattern === '') {
      // Insert replacement between every character, including start and end
      if (typeof replacement === 'function') {
        // Not supported by native replace, so fallback to default
        return string;
      }
      return replacement + string.split('').join(replacement) + replacement;
    }
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    return string.replace(regex, replacement as any);
  }
  return string.replace(pattern, replacement as any);
};
