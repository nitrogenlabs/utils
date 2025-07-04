export const get = (
  obj: any,
  path: string | string[],
  defaultValue?: any
): any => {
  if(!obj || path == null) {
    return defaultValue;
  }
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  for(const key of keys) {
    if(result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  return result ?? defaultValue;
};