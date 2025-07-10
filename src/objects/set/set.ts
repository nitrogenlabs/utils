/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const set = (obj: any, path: string | string[], value: any): any => {
  if(!obj || path == null || path === undefined) {
    return obj;
  }
  const keys = Array.isArray(path) ? path : path.split('.');
  const result = {...obj};
  let current = result;
  for(let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if(
      !(key in current) ||
      typeof current[key] !== 'object' ||
      current[key] === null
    ) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]!] = value;
  return result;
};