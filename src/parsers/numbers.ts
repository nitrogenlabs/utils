import isString from 'lodash/isString';
import numeral from 'numeral';
import {NumberFormatOptions} from 'types/numbers';

export const getCurrencyFormat = (amount: number = 0, currency: string = 'USD', format: string = '0,0.00'): string => {
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

export const getMeters = (miles: number = 0, decimals: number = 1): number => {
  return +((miles * 1609.344).toFixed(decimals));
};

export const getMiles = (meters: number = 0, decimals: number = 1): number => {
  return +((meters * 0.000621371192).toFixed(decimals));
};

export const pad = (num: number = 0, size: number): string => {
  let s = num + '';

  while(s.length < size) {
    s = '0' + s;
  }

  return s;
};

export const parseNum = (num: any = 0, max?: number): number => {
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
export const formatNumber = (num: number, options: NumberFormatOptions = {}): string => {
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

  if(style === '%') {
    updatedNum *= 100.0;
  }

  let order;

  if(!isFinite(updatedNum) || !useOrderSuffix) {
    order = 0;
  } else if(minOrder === maxOrder) {
    order = minOrder;
  } else {
    const unboundedOrder = Math.floor(Math.log10(Math.abs(updatedNum)) / 3);
    order = Math.max(
      0,
      minOrder,
      Math.min(unboundedOrder, maxOrder, orderSuffixes.length - 1)
    );
  }

  const orderSuffix = orderSuffixes[order];

  if(order !== 0) {
    updatedNum /= Math.pow(10, order * 3);
  }

  return (style === '$' ? '$' : '') +
    updatedNum.toLocaleString(
      'en-US',
      {
        maximumFractionDigits: maxDecimals,
        minimumFractionDigits: minDecimals,
        style: 'decimal'
      }
    ) +
    orderSuffix +
    (style === '%' ? '%' : '');
};
