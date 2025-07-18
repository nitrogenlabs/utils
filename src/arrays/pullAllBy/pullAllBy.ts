/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

type Iteratee<T> = (value: T) => any;

/**
 * Removes all elements from `array` that have iteratee values matching elements in `values`.
 * Unlike Lodash's implementation, this function does not mutate the original array.
 *
 * @param array - The array to modify
 * @param values - The values to remove
 * @param iteratee - The iteratee invoked per element
 * @returns A new array with matched elements removed
 */
export const pullAllBy = <T>(
  array: T[],
  values: T[],
  iteratee: Iteratee<T> | keyof T
): T[] => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (!Array.isArray(values) || values.length === 0) {
    return [...array];
  }

  // Convert string property path to iteratee function
  const func = typeof iteratee === 'function'
    ? iteratee
    : (value: T) => value[iteratee];

  // Create a Set of iteratee values from the values array for O(1) lookups
  const valueSet = new Set(values.map(func));

  // Filter out elements that match any value in the values array
  return array.filter(item => !valueSet.has(func(item)));
};