/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const values = <T>(obj: Record<string | symbol, any>): T[] => {
  if(!obj || typeof obj !== 'object') {
    return [];
  }

  const result: T[] = [];

  // Get all own property names (including non-enumerable)
  const propertyNames = Object.getOwnPropertyNames(obj);
  for(const key of propertyNames) {
    result.push(obj[key]);
  }

  // Get all own symbol properties (including non-enumerable)
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for(const key of symbolKeys) {
    result.push(obj[key]);
  }

  return result;
};
