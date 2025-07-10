/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const mapKeys = <T>(
  obj: Record<string | symbol, T>,
  iteratee: (value: T, key: string | symbol) => string
): Record<string, T> => {
  if(!obj || typeof obj !== 'object') {
    return {};
  }

  const result: Record<string, T> = {};

  // Handle all own property names (including non-enumerable)
  const propertyNames = Object.getOwnPropertyNames(obj);
  for(const key of propertyNames) {
    result[iteratee(obj[key]!, key)] = obj[key]!;
  }

  // Handle all own symbol properties (including non-enumerable)
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for(const key of symbolKeys) {
    result[iteratee(obj[key]!, key)] = obj[key]!;
  }

  return result;
};
