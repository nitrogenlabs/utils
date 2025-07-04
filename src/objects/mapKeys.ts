export const mapKeys = <T>(
  obj: Record<string, T>,
  iteratee: (value: T, key: string) => string
): Record<string, T> => {
  const result: Record<string, T> = {};
  for(const key in obj) {
    if(Object.hasOwn(obj, key)) {
      result[iteratee(obj[key], key)] = obj[key];
    }
  }
  return result;
};
