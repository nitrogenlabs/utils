/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const lowerCaseKeys = (obj: Record<string, any> = {}): object => {
  const newObj: Record<string, any> = {};
  for(const key of Object.keys(obj)) {
    newObj[key.toLowerCase()] = obj[key];
  }
  return newObj;
};

export const toQueryString = (json: Record<string, any> = {}): string => {
  const encodeValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.join(',');
    }
    return encodeURIComponent(String(value));
  };

  return Object.keys(json)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeValue(json[key])}`)
    .join('&');
};
