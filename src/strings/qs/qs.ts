/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

export interface QsOptions {
  readonly delimiter?: string;
  readonly strictNullHandling?: boolean;
  readonly skipNulls?: boolean;
  readonly encode?: boolean;
  readonly filter?: (prefix: string, value: any) => any;
  readonly arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma';
  readonly comma?: boolean;
  readonly allowDots?: boolean;
  readonly charset?: 'utf-8' | 'iso-8859-1';
  readonly charsetSentinel?: boolean;
  readonly interpretNumericEntities?: boolean;
  readonly parameterLimit?: number;
  readonly parseArrays?: boolean;
  readonly plainObjects?: boolean;
  readonly allowPrototypes?: boolean;
  readonly depth?: number;
  readonly ignoreQueryPrefix?: boolean;
  readonly parseNumbers?: boolean;
  readonly parseBooleans?: boolean;
}

export interface ParseOptions extends QsOptions {
  readonly allowSparse?: boolean;
  readonly arrayLimit?: number;
  readonly decoder?: (str: string) => string;
}

export interface StringifyOptions extends QsOptions {
  readonly addQueryPrefix?: boolean;
  readonly allowDots?: boolean;
  readonly charset?: 'utf-8' | 'iso-8859-1';
  readonly charsetSentinel?: boolean;
  readonly encodeValuesOnly?: boolean;
  readonly formatter?: (value: any) => string;
  readonly serializeDate?: (date: Date) => string;
  readonly skipNulls?: boolean;
  readonly sort?: (a: string, b: string) => number;
}

export const parse = (str: string, options: ParseOptions = {}): Record<string, any> => {
  const {
    delimiter = '&',
    strictNullHandling = false,
    skipNulls = false,
    parseArrays = true,
    parseNumbers = false,
    parseBooleans = false,
    allowDots = false,
    depth = 5,
    parameterLimit = 1000,
    ignoreQueryPrefix = false,
    decoder = defaultDecoder
  } = options;

  if (typeof str !== 'string') {
    return {};
  }

  if (ignoreQueryPrefix && str.startsWith('?')) {
    str = str.slice(1);
  }

  const result: Record<string, any> = {};
  const parts = str.split(delimiter);

  if (parts.length > parameterLimit) {
    throw new Error(`Parameter limit exceeded. Max: ${parameterLimit}`);
  }

  for (const part of parts) {
    if (!part) continue;

    const [key, value] = part.split('=');
    if (!key) continue;

    const decodedKey = decoder(key);
    const decodedValue = value !== undefined
      ? decoder(value)
      : '';

    if (skipNulls && decodedValue === '') continue;

    const finalValue = strictNullHandling && decodedValue === ''
      ? null
      : decodedValue;

    setValue(result, decodedKey, finalValue, {
      parseArrays,
      parseNumbers,
      parseBooleans,
      allowDots,
      depth
    });
  }

  return result;
};

export const stringify = (obj: Record<string, any>, options: StringifyOptions = {}): string => {
  const {
    delimiter = '&',
    strictNullHandling = false,
    skipNulls = false,
    encode = true,
    arrayFormat = 'indices',
    comma = false,
    allowDots = false,
    addQueryPrefix = false,
    charset = 'utf-8',
    charsetSentinel = false,
    encodeValuesOnly = false,
    sort
  } = options;

  if (!obj || typeof obj !== 'object') {
    return '';
  }

  const parts: string[] = [];
  const keys = Object.keys(obj);

  if (sort) {
    keys.sort(sort);
  }

  for (const key of keys) {
    const value = obj[key];

    if (skipNulls && (value === null || value === undefined)) continue;

    const encodedKey = encode && !encodeValuesOnly
      ? encodeURIComponent(key)
      : key;

    if (value === null || value === undefined) {
      if (strictNullHandling) {
        parts.push(`${encodedKey}=`);
      }
      continue;
    }

    if (Array.isArray(value)) {
      const arrayParts = stringifyArray(value, encodedKey, {
        arrayFormat,
        comma,
        encode,
        encodeValuesOnly
      });
      parts.push(...arrayParts);
    } else if (typeof value === 'object') {
      const objectParts = stringifyObject(value, encodedKey, {
        allowDots,
        encode,
        encodeValuesOnly
      });
      parts.push(...objectParts);
    } else {
      const encodedValue = encode
        ? encodeURIComponent(String(value))
        : String(value);
      parts.push(`${encodedKey}=${encodedValue}`);
    }
  }

  let result = parts.join(delimiter);

  if (addQueryPrefix && result) {
    result = `?${result}`;
  }

  if (charsetSentinel && charset === 'iso-8859-1') {
    result = `utf8=%E2%9C%93&${result}`;
  }

  return result;
};

const defaultDecoder = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

const setValue = (
  obj: Record<string, any>,
  key: string,
  value: any,
  options: {
    parseArrays: boolean;
    parseNumbers: boolean;
    parseBooleans: boolean;
    allowDots: boolean;
    depth: number;
  }
): void => {
  const { parseArrays, parseNumbers, parseBooleans, allowDots, depth } = options;

  let finalValue = value;

  if (parseNumbers && !isNaN(Number(value)) && value !== '') {
    finalValue = Number(value);
  } else if (parseBooleans && (value === 'true' || value === 'false')) {
    finalValue = value === 'true';
  }

  if (allowDots && key.includes('.')) {
    setValueWithDots(obj, key, finalValue, depth);
  } else {
    setValueWithBrackets(obj, key, finalValue, parseArrays, depth);
  }
};

const setValueWithDots = (obj: Record<string, any>, key: string, value: any, depth: number): void => {
  const keys = key.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1 && i < depth; i++) {
    const k = keys[i];
    if (!(k in current) || typeof current[k] !== 'object' || current[k] === null) {
      current[k] = {};
    }
    current = current[k];
  }

  const lastKey = keys[Math.min(keys.length - 1, depth)];
  current[lastKey] = value;
};

const setValueWithBrackets = (
  obj: Record<string, any>,
  key: string,
  value: any,
  parseArrays: boolean,
  depth: number
): void => {
  if (key.endsWith('[]')) {
    const baseKey = key.slice(0, -2);
    if (!(baseKey in obj)) {
      obj[baseKey] = [];
    }
    if (Array.isArray(obj[baseKey])) {
      obj[baseKey].push(value);
    }
    return;
  }

  const bracketMatch = key.match(/^([^\[]+)(?:\[([^\]]*)\])?$/);

  if (!bracketMatch) {
    obj[key] = value;
    return;
  }

  const [, baseKey, bracketKey] = bracketMatch;

  if (!bracketKey) {
    obj[baseKey] = value;
    return;
  }

  if (!(baseKey in obj)) {
    obj[baseKey] = parseArrays && bracketKey === '' ? [] : {};
  }

  const target = obj[baseKey];

  if (parseArrays && Array.isArray(target)) {
    if (bracketKey === '') {
      target.push(value);
    } else {
      const index = parseInt(bracketKey, 10);
      if (!isNaN(index)) {
        target[index] = value;
      }
    }
  } else if (typeof target === 'object' && target !== null) {
    if (bracketKey.includes('[')) {
      const nestedMatch = bracketKey.match(/^([^\[]+)(?:\[([^\]]*)\])?$/);

      if (nestedMatch) {
        const [, nestedKey, nestedBracketKey] = nestedMatch;
        if (!(nestedKey in target)) {
          target[nestedKey] = parseArrays && nestedBracketKey === '' ? [] : {};
        }

        if (nestedBracketKey) {
          if (parseArrays && Array.isArray(target[nestedKey])) {
            if (nestedBracketKey === '') {
              target[nestedKey].push(value);
            } else {
              const index = parseInt(nestedBracketKey, 10);
              if (!isNaN(index)) {
                target[nestedKey][index] = value;
              }
            }
          } else if (typeof target[nestedKey] === 'object' && target[nestedKey] !== null) {
            target[nestedKey][nestedBracketKey] = value;
          }
        } else {
          target[nestedKey] = value;
        }
      }
    } else {
      target[bracketKey] = value;
    }
  }
};

const stringifyArray = (
  arr: any[],
  key: string,
  options: {
    arrayFormat: string;
    comma: boolean;
    encode: boolean;
    encodeValuesOnly: boolean;
  }
): string[] => {
  const { arrayFormat, comma, encode, encodeValuesOnly } = options;
  const parts: string[] = [];

  if (comma && arr.length > 0) {
    const values = arr.map(item =>
      encode && !encodeValuesOnly
        ? encodeURIComponent(String(item))
        : String(item)
    );
    parts.push(`${key}=${values.join(',')}`);
  } else {
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];
      const encodedValue = encode && !encodeValuesOnly
        ? encodeURIComponent(String(value))
        : String(value);

      switch (arrayFormat) {
        case 'indices':
          parts.push(`${key}[${i}]=${encodedValue}`);
          break;
        case 'brackets':
          parts.push(`${key}[]=${encodedValue}`);
          break;
        case 'repeat':
          parts.push(`${key}=${encodedValue}`);
          break;
        case 'comma':
          if (i === 0) {
            parts.push(`${key}=${encodedValue}`);
          } else {
            parts[parts.length - 1] += `,${encodedValue}`;
          }
          break;
      }
    }
  }

  return parts;
};

const stringifyObject = (
  obj: Record<string, any>,
  key: string,
  options: {
    allowDots: boolean;
    encode: boolean;
    encodeValuesOnly: boolean;
  }
): string[] => {
  const { allowDots, encode, encodeValuesOnly } = options;
  const parts: string[] = [];

  for (const [k, v] of Object.entries(obj)) {
    const newKey = allowDots ? `${key}.${k}` : `${key}[${k}]`;

    if (v === null || v === undefined) {
      continue;
    }

    if (Array.isArray(v)) {
      parts.push(...stringifyArray(v, newKey, {
        arrayFormat: 'indices',
        comma: false,
        encode,
        encodeValuesOnly
      }));
    } else if (typeof v === 'object') {
      parts.push(...stringifyObject(v, newKey, options));
    } else {
      const encodedValue = encode && !encodeValuesOnly
        ? encodeURIComponent(String(v))
        : String(v);
      parts.push(`${newKey}=${encodedValue}`);
    }
  }

  return parts;
};

export const qs = {
  parse,
  stringify
};

export default qs;