/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

type ClassValue = string | number | boolean | null | undefined | Record<string, any> | ClassValue[];

/**
 * A utility function for conditionally joining class names together.
 * Optimized with modern ES features for better performance.
 *
 * @param inputs - Class names to join. Can be strings, numbers, booleans, objects, arrays, or null/undefined.
 * @returns A string of joined class names.
 *
 * @example
 * ```ts
 * cn('foo', 'bar') // => 'foo bar'
 * cn('foo', { bar: true, baz: false }) // => 'foo bar'
 * cn('foo', ['bar', { baz: true }]) // => 'foo bar baz'
 * cn('foo', null, undefined, false, 0, 'bar') // => 'foo 0 bar'
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  const classes: string[] = [];

  for (const input of inputs) {
    if (input === null || input === undefined) continue;

    if (typeof input === 'string') {
      if (input) classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (typeof input === 'boolean') {
      if (input) classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object' && !Array.isArray(input)) {
      for (const [key, value] of Object.entries(input)) {
        if (value && key && typeof value !== 'object') classes.push(key);
      }
    }
  }

  return classes.join(' ');
};