/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import numeral from 'numeral';

import {isString} from '../../checks/isString/isString';

import type {NumberFormatOptions} from '../../types/numbers';

export const getCurrencyFormat = (
  amount: number = 0,
  currency: string = 'USD',
  format: string = '0,0.00'
): string => {
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

export const getMeters = (miles: number = 0, decimals: number = 1): number => +(miles * 1609.344).toFixed(decimals);

export const getMiles = (meters: number = 0, decimals: number = 1): number => +(meters * 0.000621371192).toFixed(decimals);

export const pad = (num: number = 0, size: number): string => {
  const isNegative = num < 0;
  let s = Math.abs(num).toString();
  while(s.length < size) {
    s = `0${s}`;
  }
  return isNegative ? `-${s}` : s;
};

export const parseNum = (num: any = 0, max?: number): number => {
  let formatNum = num;

  if(isString(formatNum)) {
    // Remove all non-digit characters except decimal points
    formatNum = formatNum.replace(/[^\d.]/g, '');
    // Ensure only one decimal point
    const parts = formatNum.split('.');
    if(parts.length > 2) {
      formatNum = parts[0] + '.' + parts.slice(1).join('');
    }
    if(max) {
      formatNum = formatNum.substr(0, max);
    }
  } else if(max) {
    formatNum = +formatNum.toString().substr(0, max);
  }

  formatNum = parseFloat(formatNum);

  return isNaN(formatNum) ? 0 : formatNum;
};

export const roundToHalf = (value: number): number => {
  // Round to nearest 0.5
  return Math.round(value * 2) / 2;
};

/*
 * Return the given number as a formatted string.  The default format is a plain
 * integer with thousands-separator commas.  The optional parameters facilitate
 * other formats:
 *   - decimals = the number of decimals places to round to and show
 *   - valueIfNaN = the value to show for non-numeric input
 *   - style
 *     - '%': multiplies by 100 and appends a percent symbol
 *     - '$': prepends a dollar sign
 *   - useOrderSuffix = whether to use suffixes like k for 1,000, etc.
 *   - orderSuffixes = the list of suffixes to use
 *   - minOrder and maxOrder allow the order to be constrained.  Examples:
 *     - minOrder = 1 means the k suffix should be used for numbers < 1,000
 *     - maxOrder = 1 means the k suffix should be used for numbers >= 1,000,000
 */
export const formatNumber = (
  num: number,
  options: NumberFormatOptions = {}
): string => {
  const {
    maxDecimals = 0,
    maxOrder = Infinity,
    minDecimals = 0,
    minOrder = 0,
    orderSuffixes = ['', 'k', 'M', 'B', 'T'],
    style = '',
    useOrderSuffix = false,
    valueIfNaN = ''
  } = options;
  let updatedNum: number = num;

  if(isNaN(updatedNum)) {
    return valueIfNaN;
  }

  if(!isFinite(updatedNum)) {
    return updatedNum > 0 ? 'Infinity' : '-Infinity';
  }

  if(style === '%') {
    updatedNum *= 100.0;
  }

  let order = 0;

  if(useOrderSuffix && updatedNum !== 0) {
    const absNum = Math.abs(updatedNum);
    const naturalOrder = Math.floor(Math.log10(absNum) / 3);
    order = Math.max(minOrder, Math.min(naturalOrder, maxOrder, orderSuffixes.length - 1));
    updatedNum = updatedNum / Math.pow(10, order * 3);
  }

  const orderSuffix = orderSuffixes[order];
  let decimals = maxDecimals;

  if(useOrderSuffix) {
    if(maxDecimals === 0) {
      updatedNum = Math.round(updatedNum);
      decimals = 0;
    } else if(!Number.isInteger(updatedNum)) {
      decimals = Math.max(1, maxDecimals);
    }
  }

  if(!Number.isFinite(decimals) || decimals < 0) {
    decimals = 0;
  }

  let clampedMaxDecimals = Math.max(0, Math.min(20, Math.floor(decimals)));
  let clampedMinDecimals = Math.max(0, Math.min(20, Math.floor(minDecimals)));

  if(clampedMaxDecimals < clampedMinDecimals) {
    clampedMaxDecimals = clampedMinDecimals;
  }

  return (
    (style === '$' ? '$' : '') +
    updatedNum.toLocaleString('en-US', {
      maximumFractionDigits: clampedMaxDecimals,
      minimumFractionDigits: clampedMinDecimals,
      style: 'decimal',
      useGrouping: !useOrderSuffix
    }) +
    orderSuffix +
    (style === '%' ? '%' : '')
  );
};
