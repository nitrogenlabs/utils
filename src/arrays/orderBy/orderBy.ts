/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
type OrderDirection = 'asc' | 'desc';
type Iteratee<T> = (item: T) => any;

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
        if (aValue === null && bValue !== null) return -order;
        if (bValue === null && aValue !== null) return order;
        if (aValue === undefined && bValue !== undefined && bValue !== null) return -order;
        if (bValue === undefined && aValue !== undefined && aValue !== null) return order;

        return aValue < bValue ? -order : order;
      }
    }
    return 0;
  });
};