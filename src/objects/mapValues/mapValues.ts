/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const mapValues = <T, U>(
  obj: Record<string | symbol, T>,
  iteratee: (value: T, key: string | symbol) => U
): Record<string | symbol, U> => {
  if(!obj || typeof obj !== 'object') {
    return {};
  }

  const result: Record<string | symbol, U> = {};

  // Handle all own property names (including non-enumerable)
  const propertyNames = Object.getOwnPropertyNames(obj);
  for(const key of propertyNames) {
    result[key] = iteratee(obj[key]!, key);
  }

  // Handle all own symbol properties (including non-enumerable)
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for(const key of symbolKeys) {
    result[key] = iteratee(obj[key]!, key);
  }

  return result;
};
