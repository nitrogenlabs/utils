import {PhoneNumber, PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';
import {isString} from 'lodash';
import numeral from 'numeral';


export const formatPhone = (phoneNumber: string, countryCode: string = 'US'): string => {
  const phoneUtil = PhoneNumberUtil.getInstance();

  try {
    const parsedNumber: PhoneNumber = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.format(parsedNumber, PhoneNumberFormat.E164);
  } catch(e) {
    return '';
  }
};

export const getCurrencyFormat = (amount: number, currency: string = 'USD', format: string = '0,0.00'): string => {
  let prefix: string;
  currency = currency.toUpperCase();

  switch(currency) {
    case 'GBP':
      prefix = '£';
      break;
    default:
      prefix = '$';
  }

  return `${prefix}${numeral(amount).format(format)}`;
};

export const getMeters = (miles: number, decimals: number = 1): number => {
  return +((miles * 1609.344).toFixed(decimals));
};

export const getMiles = (meters: number, decimals: number = 1): number => {
  return +((meters * 0.000621371192).toFixed(decimals));
};

export const pad = (num: number, size: number): string => {
  let s = num + '';

  while(s.length < size) {
    s = '0' + s;
  }

  return s;
};

export const parseNum = (num, max?: number): number => {
  let formatNum = num;

  if(isString(formatNum)) {
    if(max) {
      formatNum = formatNum.replace(/\D/g, '').substr(0, max);
    } else {
      formatNum = formatNum.replace(/\D/g, '');
    }
  } else if(max) {
    formatNum = +(formatNum.toString().substr(0, max));
  }

  formatNum = parseFloat(formatNum);

  return isNaN(formatNum) ? null : formatNum;
};

export const roundToHalf = (value): number => {
  const converted: number = parseFloat(value);
  const decimal = Math.ceil((converted - parseInt(converted.toString(), 10)) * 10);

  if(decimal > 5) {
    return Math.ceil(converted);
  }

  return parseInt(converted.toString(), 10) + 0.5;
};
