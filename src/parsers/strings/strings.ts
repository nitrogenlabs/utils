/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import CryptoJS from 'crypto-js';
import libphonenumber from 'google-libphonenumber';

const {PhoneNumberFormat, PhoneNumberUtil} = libphonenumber;

import {uniq} from '../../arrays/uniq/uniq.js';
import {isString} from '../../checks/isString/isString.js';
import {replace} from '../../strings/replace/replace.js';

export const createPassword = (password?: string | null, salt?: string | null): string => {
  if(salt && password) {
    const secret = CryptoJS.PBKDF2(password, salt, {
      keySize: 256/32,
      iterations: 10000
    });
    const md5 = CryptoJS.MD5(secret.toString());
    return md5.toString();
  }

  return '';
};

export const createHash = (
  key?: string | null,
  salt: string = (+new Date()).toString()
): string => {
  const salted: string = salt ? `${salt}${key}` : key || '';
  const md5 = CryptoJS.MD5(salted);
  return md5.toString();
};

export const parseArangoId = (id?: string | null): string => {
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
  str?: string | null,
  max?: number,
  defaultValue?: string
): string => {
  if(isString(str) && str !== 'undefined') {
    return replace(str.trim(), /[^a-zA-Z]+/g, '').substring(0, max);
  }

  return defaultValue || '';
};

export const parseEmail = (email?: string | null): string => {
  const parsedEmail = (email || '').trim().substring(0, 128).toLowerCase();

  if (parsedEmail === '') {
    return '';
  }

  const parts = parsedEmail.split('@');
  if (parts.length !== 2) {
    return '';
  }

  const [localPart, domain] = parts;

  if (!localPart || localPart.length > 64 || localPart.startsWith('.') || localPart.endsWith('.')) {
    return '';
  }

  const validLocalChars = /^[a-zA-Z0-9.-]+$/;
  if (!validLocalChars.test(localPart)) {
    return '';
  }

  if (!domain || domain.length > 253 || domain.startsWith('.') || domain.endsWith('.')) {
    return '';
  }

  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return '';
  }

  for (const part of domainParts) {
    if (!part || part.length > 63 || part.startsWith('-') || part.endsWith('-')) {
      return '';
    }
  }

  return parsedEmail;
};

export const parseId = (id?: string | null): string => {
  if(isString(id) && id !== 'undefined') {
    return replace(id.trim(), /[^a-zA-Z0-9]/g, '').substring(0, 32);
  }

  return '';
};

export const parsePassword = (password?: string | null): string => (password || '').trim().substring(0, 32);

export const parsePhone = (
  phoneNumber: string,
  countryCode: string = 'US'
): string => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    const parsedNumber = phoneUtil.parse(phoneNumber, countryCode);

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
  str?: string | null,
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

export const parseUsername = (username?: string | null): string => {
  if(isString(username) && username !== 'undefined') {
    return username.replace(/[^\w]/g, '').substring(0, 32).trim().toLowerCase();
  }

  return '';
};

export const parseVarChar = (
  str?: string | null,
  max?: number,
  defaultValue = ''
): string => {
  let updatedString = str;

  if(updatedString) {
    updatedString = replace(updatedString.toString().trim(), /[^\w\s]/g, '');

    if(max) {
      updatedString = updatedString.substring(0, max);
    }
  } else {
    updatedString = '';
  }

  if(defaultValue && updatedString === '') {
    updatedString = defaultValue;
  }

  return updatedString;
};

export const stripHTML = (html?: string | null): string => {
  if(isString(html) && html !== 'undefined') {
    return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '');
  }

  return '';
};
