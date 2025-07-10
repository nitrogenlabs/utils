/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const cloneDeep = <T>(obj: T): T => {
  if(obj === null || typeof obj !== 'object') {
    return obj;
  }

  if(Array.isArray(obj)) {
    return obj.map(cloneDeep) as T;
  }

  // Check if object has symbol keys - if so, use manual implementation
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  const hasSymbols = symbolKeys.length > 0;

  if(!hasSymbols && typeof structuredClone === 'function') {
    try {
      return structuredClone(obj);
    } catch{}
  }

  const cloned: Record<string | symbol, any> = {};

  // Handle string keys
  for(const key in obj) {
    if(Object.hasOwn(obj, key)) {
      cloned[key] = cloneDeep(obj[key]);
    }
  }

  // Handle symbol keys
  for(const key of symbolKeys) {
    cloned[key] = cloneDeep((obj as any)[key]);
  }

  return cloned as T;
};