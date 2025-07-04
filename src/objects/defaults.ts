export const defaults = <T extends Record<string, any>>(
  obj: T,
  ...sources: Partial<T>[]
): T => {
  const result = {...obj};
  for(const source of sources) {
    for(const key in source) {
      if(Object.hasOwn(source, key) && result[key] === undefined) {
        result[key] = source[key];
      }
    }
  }
  return result;
};
