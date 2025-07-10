/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const isEmpty = (value: any): boolean => {
  if(value == null) {
    return true;
  }
  if(typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0;
  }
  if(typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  return false;
};