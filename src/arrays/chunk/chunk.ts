/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  if(size <= 0) return [];
  const chunks: T[][] = [];
  for(let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
