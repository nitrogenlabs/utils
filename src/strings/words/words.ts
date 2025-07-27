/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {isString} from '../../checks/isString/isString';

export const words = (
  string: string,
  pattern?: string | RegExp
): string[] => {
  if (!isString(string)) {
    return [];
  }

  if (string === '') {
    return [];
  }

  const defaultPattern = /[^\s]+/g;

  if (pattern === undefined) {
    const wordGroups = string.split(/\s+/);
    const result: string[] = [];

    for (const group of wordGroups) {
      if (group.length === 0) continue;

      const parts = group.split(/[-_.]+/);

      for (const part of parts) {
        if (part.length === 0) continue;

        // Special handling for parts that contain only non-Latin Unicode letters (like Cyrillic)
        // This excludes ASCII letters and numbers to allow camelCase splitting
        if (/^[^\u0000-\u007F]+$/u.test(part)) {
          result.push(part);
          continue;
        }

        const camelCaseParts = part.match(/[A-Z]?[a-z\u00C0-\u017F]+(?:'[a-z\u00C0-\u017F]+)*|[A-Z]+(?=[A-Z][a-z]|\b)|[0-9]+|[\u00C0-\u017F]+/g) || [];
        result.push(...camelCaseParts.filter(p => p.length > 0));
      }
    }

    return result;
  }

  if (isString(pattern)) {
    const regex = new RegExp(pattern, 'g');
    return string.match(regex) || [];
  }

  if (pattern instanceof RegExp) {
    return string.match(pattern) || [];
  }

  return string.match(defaultPattern) || [];
};