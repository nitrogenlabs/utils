import {cloneDeep} from 'lodash/cloneDeep';
import {isPlainObject} from 'lodash/isPlainObject';
import {mapValues} from 'lodash/mapValues';

export const lowerCaseKeys = (obj = {}): object => {
  const newObj = {...cloneDeep(obj)};

  mapValues(obj, (value, key = '') => {
    if(isPlainObject(value)) {
      value = lowerCaseKeys(value);
    }

    newObj[key.toLowerCase()] = value;
  });

  return newObj;
};

export const toQueryString = (json = {}): string => {
  return Object.keys(json)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`)
    .join('&');
};