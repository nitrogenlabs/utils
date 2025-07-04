import crypto, {Hash} from 'crypto';
import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil
} from 'google-libphonenumber';

import {uniq} from '../arrays/uniq';
import {isString} from '../checks/isString';
import {replace} from '../strings/replace';

export const createPassword = (password: string, salt: string): string => {
  // Create encrypted password
  if(salt && password) {
    const secret: Buffer = crypto.pbkdf2Sync(
      password,
      salt,
      10000,
      32,
      'sha512'
    );
    const md5: Hash = crypto.createHash('md5');
    md5.update(secret.toString(), 'utf8');
    return md5.digest('hex');
  }

  return '';
};

export const createHash = (
  key: string,
  salt: string = (+new Date()).toString()
): string => {
  // Create Hash
  const md5: Hash = crypto.createHash('md5');
  const salted: string = salt ? `${salt}${key}` : key;
  md5.update(salted, 'utf8');
  return md5.digest('hex');
};

export const parseArangoId = (id: string): string => {
  if(isString(id) && id !== 'undefined') {
    const idParts: string[] = id.split('/');

    if(idParts.length !== 2) {
      return '';
    }

    const collectionName: string = replace(
      (idParts[0] || '').trim(),
      /[^a-zA-Z]+/g,
      ''
    ).substring(0, 32);
    const key: string = replace(
      (idParts[1] || '').trim(),
      /[^\w]/g,
      ''
    ).substring(0, 32);

    return `${collectionName}/${key}`;
  }

  return '';
};

export const parseChar = (
  str: string,
  max?: number,
  defaultValue?: string
): string => {
  if(isString(str) && str !== 'undefined') {
    return replace(str.trim(), /[^a-zA-Z]+/g, '').substring(0, max);
  }

  return defaultValue || '';
};

export const parseEmail = (email: string): string => {
  email = (email || '').trim().substring(0, 128).toLowerCase();
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return email !== '' && regex.test(email) ? email : '';
};

export const parseId = (id: string): string => {
  if(isString(id) && id !== 'undefined') {
    return replace(id.trim(), /[^\w]/g, '').substring(0, 32);
  }

  return '';
};

export const parsePassword = (password: string): string => (password || '').trim().substring(0, 32);

export const parsePhone = (
  phoneNumber: string,
  countryCode: string = 'US'
): string => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    const parsedNumber: PhoneNumber = phoneUtil.parse(phoneNumber, countryCode);

    if(phoneUtil.isValidNumber(parsedNumber)) {
      return phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
    }

    return '';
  } catch(e) {
    return '';
  }
};

export const parseMentions = (str: string = ''): string[] => {
  const list: string[] = str.match(/(^|\s)([@][a-z\d-_]+)/gi) || [];
  const regex: RegExp = new RegExp('^[@][a-z][a-z0-9]*$');

  return uniq(
    list
      .map((item: string) => item.trim().toLowerCase().substring(0, 33))
      .filter((item: string) => regex.test(item))
  );
};

export const parseString = (
  str: string,
  max?: number,
  defaultValue = ''
): string => {
  let formatStr: string;

  if(str) {
    formatStr = str.trim();

    if(max) {
      formatStr = formatStr.toString().substring(0, max);
    } else {
      formatStr = formatStr.toString();
    }
  } else {
    formatStr = '';
  }

  if(defaultValue && formatStr === '') {
    formatStr = defaultValue;
  }

  return formatStr;
};

export const parseTags = (str: string = ''): string[] => {
  const list: string[] = str.match(/(^|\s)([#][a-z\d-_]+)/gi) || [];
  const regex: RegExp = new RegExp('^[#][a-z][a-z0-9]*$');

  return uniq(
    list
      .map((item: string) => item.trim().toLowerCase().substring(0, 33))
      .filter((item: string) => regex.test(item))
  );
};

export const parseTemplate = (
  template: string,
  variables: { [key: string]: any }
): string =>
  template.replace(/\[(.*?)\]/g, (match, token) => variables[token] || match);

export const parseUrl = (url: string): string => {
  if(isString(url) && url !== 'undefined') {
    return encodeURI(url.trim());
  }

  return '';
};

export const parseUsername = (username: string): string => {
  if(isString(username) && username !== 'undefined') {
    return username.replace(/[^\w]/g, '').substring(0, 32).trim().toLowerCase();
  }

  return '';
};

export const parseVarChar = (
  str: string,
  max?: number,
  defaultValue = ''
): string => {
  if(str) {
    str = replace(str.toString().trim(), /[^\w\s]/g, '');

    if(max) {
      str = str.substring(0, max);
    }
  } else {
    str = '';
  }

  if(defaultValue && str === '') {
    str = defaultValue;
  }

  return str;
};

export const stripHTML = (html: string): string => {
  if(isString(html) && html !== 'undefined') {
    return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '');
  }

  return '';
};
