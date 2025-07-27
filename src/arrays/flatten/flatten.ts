/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

import { isArray } from '../../checks/isArray/isArray';

/**
 * Flattens a nested array by one level.
 *
 * @param array - The array to flatten
 * @returns A new flattened array
 *
 * @example
 * ```typescript
 * flatten([1, [2, [3, 4]], 5])
 * // => [1, 2, [3, 4], 5]
 *
 * flatten([[1, 2], [3, 4], [5, 6]])
 * // => [1, 2, 3, 4, 5, 6]
 *
 * flatten([1, 2, 3])
 * // => [1, 2, 3]
 *
 * flatten([])
 * // => []
 * ```
 */
export const flatten = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  // Use modern ES features for better performance
  return array.flatMap(item => isArray(item) ? item : [item]);
};