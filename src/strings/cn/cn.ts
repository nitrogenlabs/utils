/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

type ClassValue = string | number | boolean | null | undefined | Record<string, any> | ClassValue[];

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