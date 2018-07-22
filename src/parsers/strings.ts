import crypto, {Hash} from 'crypto';
import {isString, replace} from 'lodash';

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

export const generateHash = (key: string): string => {
  // Create Hash
  const md5 = crypto.createHash('md5');
  md5.update(`${+(new Date())}${key}`, 'utf8');
  return md5.digest('hex');
};

export const parseChar = (str: string, max?: number): string => {
  if(isString(str) && str !== 'undefined') {
    return replace(str.trim(), /[^a-zA-Z]+/g, '').substr(0, max);
  }

  return '';
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
  const list: string[] = str.split(',');
  const regex: RegExp = new RegExp('^[a-z][a-z0-9]*$');

  return list.map((item: string) => item.trim().toLowerCase())
    .filter((item: string) => regex.test(item))
    .map((item: string) => `"${item}"`);
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
