/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

type OrderDirection = 'asc' | 'desc';
type Iteratee<T> = (item: T) => any;

/**
 * Creates a sorted array of elements based on the specified iteratee functions and sort orders.
 *
 * @param array - The array to sort
 * @param iteratees - Array of iteratee functions or property paths to sort by
 * @param orders - Array of sort orders ('asc' or 'desc')
 * @returns The sorted array
 */
export const orderBy = <T>(
  array: T[],
  iteratees: Array<Iteratee<T> | string> = ['asc'],
  orders: OrderDirection[] = []
): T[] => {
  if (!Array.isArray(array) || array.length <= 1) {
    return [...array];
  }

  // Convert string paths to iteratee functions
  const normalizedIteratees = iteratees.map((iteratee) =>
    typeof iteratee === 'string'
      ? (item: T) => item[iteratee as keyof T]
      : iteratee
  );

  // If only one argument is provided and it's 'asc' or 'desc', treat it as orders
  if (
    iteratees.length === 1 &&
    typeof iteratees[0] === 'string' &&
    ['asc', 'desc'].includes(iteratees[0])
  ) {
    normalizedIteratees.pop();
    orders = [iteratees[0] as OrderDirection];
  }

  // Default to ascending order if not specified
  const normalizedOrders = orders.length > 0
    ? orders.map((order) => (order === 'desc' ? -1 : 1))
    : Array(normalizedIteratees.length).fill(1);

  return [...array].sort((a, b) => {
    for (let i = 0; i < normalizedIteratees.length; i++) {
      const iteratee = normalizedIteratees[i];
      const order = normalizedOrders[i] || 1;

      const aValue = iteratee(a);
      const bValue = iteratee(b);

      if (aValue !== bValue) {
        if (aValue === null || aValue === undefined) return order;
        if (bValue === null || bValue === undefined) return -order;

        return aValue < bValue ? -order : order;
      }
    }
    return 0;
  });
};