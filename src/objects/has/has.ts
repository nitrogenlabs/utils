/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const has = (obj: any, path: string | string[]): boolean => {
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = obj;
  for(const key of keys) {
    if(current == null || !Object.hasOwn(current, key)) {
      return false;
    }
    current = current[key];
  }
  return true;
};
