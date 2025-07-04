import {isPlainObject} from '../checks/isPlainObject';
import {cloneDeep} from '../objects';
import {mapValues} from '../objects/mapValues';

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

export const toQueryString = (json = {}): string => Object.keys(json)
  .map(
    (key: string) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`
  )
  .join('&');
