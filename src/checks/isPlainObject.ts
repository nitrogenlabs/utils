export const isPlainObject = (value: any): value is Record<string, any> => {
  if(value == null || typeof value !== 'object') {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
