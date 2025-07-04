export const get = (
  obj: any,
  path: string | string[],
  defaultValue?: any
): any => {
  if (!obj || path == null) return defaultValue;
  const keys = Array.isArray(path) ? path : path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result == null || typeof result !== "object") return defaultValue;
    result = result[key];
  }
  return result ?? defaultValue;
};

export const set = (obj: any, path: string | string[], value: any): any => {
  if (!obj || path == null) return obj;
  const keys = Array.isArray(path) ? path : path.split(".");
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (
      !(key in current) ||
      typeof current[key] !== "object" ||
      current[key] === null
    ) {
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return result;
};
