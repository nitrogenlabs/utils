export const mapValues = <T, U>(
  obj: Record<string, T>,
  iteratee: (value: T, key: string) => U
): Record<string, U> => {
  const result: Record<string, U> = {};
  for(const key in obj) {
    if(Object.hasOwn(obj, key)) {
      result[key] = iteratee(obj[key], key);
    }
  }
  return result;
};
