export const cloneDeep = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;

  if (typeof structuredClone === "function") {
    try {
      return structuredClone(obj);
    } catch {}
  }

  if (Array.isArray(obj)) return obj.map(cloneDeep) as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = cloneDeep(obj[key]);
    }
  }
  return cloned;
};
