/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];
export type ClassValue = string | number | boolean | null | undefined | ClassDictionary | ClassArray;

const appendClass = (className: string, value: string): string => className ? `${className} ${value}` : value;

const parseClassValue = (value: ClassValue): string => {
  if(typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if(!value || typeof value !== 'object') {
    return '';
  }

  let className = '';

  if(Array.isArray(value)) {
    for(let i = 0, length = value.length; i < length; i++) {
      const item = value[i];

      if(item) {
        const parsed = parseClassValue(item);

        if(parsed) {
          className = appendClass(className, parsed);
        }
      }
    }

    return className;
  }

  for(const key in value) {
    if(value[key]) {
      className = appendClass(className, key);
    }
  }

  return className;
};

export const cn = (...inputs: ClassValue[]): string => {
  let className = '';

  for(let i = 0, length = inputs.length; i < length; i++) {
    const input = inputs[i];

    if(input) {
      const parsed = parseClassValue(input);

      if(parsed) {
        className = appendClass(className, parsed);
      }
    }
  }

  return className;
};
