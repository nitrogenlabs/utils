/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const difference = <T>(array: T[], ...values: T[][]): T[] => {
  const excludeSet = new Set(values.flat());
  return array.filter((item) => !excludeSet.has(item));
};