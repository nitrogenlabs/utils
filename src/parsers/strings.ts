import {isString, replace} from 'lodash';

export const parseChar = (str: string, max?: number): string => {
  if(isString(str) && str !== 'undefined') {
    str = replace(str, /[^a-zA-Z]+/g, '').substr(0, max);
  } else {
    str = '';
  }

  return str.trim();
};

export const parseEmail = (email: string): string => {
  email = (email || '').trim().substr(0, 128).toLowerCase();
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return email !== '' && regex.test(email) ? email : '';
};

export const parseId = (id: string): string => {
  if(isString(id) && id !== 'undefined') {
    id = replace(id, /[^\w]/g, '').substr(0, 32);
  } else {
    id = '';
  }

  return id.trim();
};

export const parsePassword = (password: string): string => {
  return (password || '').trim().substr(0, 32);
};

export const parseString = (str: string, max?: number, defaultValue = ''): string => {
  if(str) {
    if(max) {
      str = str.toString().substr(0, max);
    } else {
      str = str.toString();
    }
  } else {
    str = '';
  }

  str = str.trim();

  if(defaultValue && str === '') {
    str = defaultValue;
  }

  return str;
};

export const parseUrl = (url: string): string => {
  if(isString(url) && url !== 'undefined') {
    url = encodeURI(url);
  } else {
    url = '';
  }

  return url.trim();
};

export const parseUsername = (username: string): string => {
  if(isString(username) && username !== 'undefined') {
    username = username.replace(/[^\w]/g, '').substr(0, 32);
  } else {
    username = '';
  }

  return username.trim().toLowerCase();
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
