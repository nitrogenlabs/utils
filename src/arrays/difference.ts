export const difference = <T>(array: T[], ...values: T[][]): T[] => {
  const excludeSet = new Set(values.flat());
  return array.filter((item) => !excludeSet.has(item));
};
