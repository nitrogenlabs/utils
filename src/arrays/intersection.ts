export const intersection = <T>(...arrays: T[][]): T[] => {
  if(arrays.length === 0) {
    return [];
  }
  const sets = arrays.map((arr) => new Set(arr));
  return arrays[0].filter((item) => sets.every((set) => set.has(item)));
};
