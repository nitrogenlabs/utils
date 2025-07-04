export const assign = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => Object.assign(target, ...sources);
