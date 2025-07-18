/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const camelCase = (string: string): string => {
  // Handle PascalCase conversion to camelCase
  if(/^[A-Z][a-z]/.test(string)) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }
  // Handle kebab-case, snake_case, and space-separated strings
  return string.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));
};

export const kebabCase = (string: string): string =>
  // Handle consecutive uppercase letters and numbers
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
;

export const snakeCase = (string: string): string =>
  // Handle consecutive uppercase letters and numbers
  string
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
    .toLowerCase()
;

export const upperFirst = (string: string): string =>
  (string ? string.charAt(0).toUpperCase() + string.slice(1) : '');
