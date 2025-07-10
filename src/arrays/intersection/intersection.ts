/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const intersection = <T>(...arrays: T[][]): T[] => {
  if(arrays.length === 0) {
    return [];
  }

  if(arrays.length === 1) {
    return arrays[0] || [];
  }

  const sets = arrays.slice(1).map((arr) => new Set(arr));
  const seen = new Set<T>();
  return arrays[0]?.filter((item) => {
    if(seen.has(item)) return false;
    const inAll = sets.every((set) => set.has(item));
    if(inAll) seen.add(item);
    return inAll;
  }) || [];
};