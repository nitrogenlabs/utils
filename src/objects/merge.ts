export const merge = (target: any, ...sources: any[]): any => {
  if (!target) return target;
  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    for (const key in source) {
      if (Object.hasOwn(source, key)) {
        const targetValue = target[key];
        const sourceValue = source[key];
        if (
          sourceValue &&
          typeof sourceValue === "object" &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === "object" &&
          !Array.isArray(targetValue)
        ) {
          target[key] = merge(targetValue, sourceValue);
        } else {
          target[key] = sourceValue;
        }
      }
    }
  }
  return target;
};
