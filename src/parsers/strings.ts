import crypto, {Hash} from 'crypto';
import {PhoneNumber, PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
import isString from 'lodash/isString';
import replace from 'lodash/replace';
import uniq from 'lodash/uniq';

export const createPassword = (password: string, salt: string): string => {
  // Create encrypted password
  if(salt && password) {
    const secret: Buffer = crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha512');
    const md5: Hash = crypto.createHash('md5');
    md5.update(secret.toString(), 'utf8');
    return md5.digest('hex');
  }

  return '';
};

export const generateHash = (key: string, salt: string = (+(new Date())).toString()): string => {
  // Create Hash
  const md5 = crypto.createHash('md5');
  md5.update(`${salt}${key}`, 'utf8');
  return md5.digest('hex');
};

export const parseChar = (str: string, max?: number, defaultValue?: string): string => {
  if(isString(str) && str !== 'undefined') {
    return replace(str.trim(), /[^a-zA-Z]+/g, '').substr(0, max);
  }

  return defaultValue || '';
};

export const parseEmail = (email: string): string => {
  email = (email || '').trim().substr(0, 128).toLowerCase();
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return email !== '' && regex.test(email) ? email : '';
};

export const parseId = (id: string): string => {
  if(isString(id) && id !== 'undefined') {
    return replace(id.trim(), /[^\w]/g, '').substr(0, 32);
  }

  return '';
};

export const parsePassword = (password: string): string => {
  return (password || '').trim().substr(0, 32);
};

export const parsePhone = (phoneNumber: string, countryCode: string = 'US'): string => {
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

  return uniq(list.map((item: string) => item.trim().toLowerCase().substr(0, 33))
    .filter((item: string) => regex.test(item)));
};

export const parseString = (str: string, max?: number, defaultValue = ''): string => {
  let formatStr: string;

  if(str) {
    formatStr = str.trim();

    if(max) {
      formatStr = formatStr.toString().substr(0, max);
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

  return uniq(list.map((item: string) => item.trim().toLowerCase().substr(0, 33))
    .filter((item: string) => regex.test(item)));
};

export const parseUrl = (url: string): string => {
  if(isString(url) && url !== 'undefined') {
    return encodeURI(url.trim());
  }

  return '';
};

export const parseUsername = (username: string): string => {
  if(isString(username) && username !== 'undefined') {
    return username.replace(/[^\w]/g, '').substr(0, 32).trim().toLowerCase();
  }

  return '';
};

export const parseVarChar = (str: string, max?: number, defaultValue = ''): string => {
  if(str) {
    str = replace(str.toString().trim(), /[^\w\s]/g, '');

    if(max) {
      str = str.substr(0, max);
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
