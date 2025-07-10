/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const uniq = <T>(array: T[]): T[] => [...new Set(array)];

export const uniqBy = <T>(array: T[], iteratee: (item: T) => any): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const key = iteratee(item);
    if(seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
