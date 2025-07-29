import {
  formatNumber,
  getCurrencyFormat,
  getMeters,
  getMiles,
  pad,
  parseNum,
  roundToHalf
} from './numbers.js';

describe('Number Parsers', () => {
  describe('getCurrencyFormat', () => {
    it('should format USD currency correctly', () => {
      expect(getCurrencyFormat(1234.56, 'USD')).toBe('$1,234.56');
      expect(getCurrencyFormat(0, 'USD')).toBe('$0.00');
      expect(getCurrencyFormat(1000000, 'USD')).toBe('$1,000,000.00');
    });

    it('should format GBP currency correctly', () => {
      expect(getCurrencyFormat(1234.56, 'GBP')).toBe('£1,234.56');
      expect(getCurrencyFormat(0, 'GBP')).toBe('£0.00');
    });

    it('should use custom format', () => {
      expect(getCurrencyFormat(1234.56, 'USD', '0,0')).toBe('$1,235');
      expect(getCurrencyFormat(1234.56, 'USD', '0.00')).toBe('$1234.56');
    });

    it('should handle default values', () => {
      expect(getCurrencyFormat()).toBe('$0.00');
      expect(getCurrencyFormat(100)).toBe('$100.00');
    });
  });

  describe('getMeters', () => {
    it('should convert miles to meters correctly', () => {
      expect(getMeters(1)).toBe(1609.3);
      expect(getMeters(0.5)).toBe(804.7);
      expect(getMeters(10)).toBe(16093.4);
    });

    it('should handle custom decimal places', () => {
      expect(getMeters(1, 2)).toBe(1609.34);
      expect(getMeters(1, 0)).toBe(1609);
    });

    it('should handle default values', () => {
      expect(getMeters()).toBe(0);
      expect(getMeters(0)).toBe(0);
    });
  });

  describe('getMiles', () => {
    it('should convert meters to miles correctly', () => {
      expect(getMiles(1609.344)).toBe(1.0);
      expect(getMiles(804.672)).toBe(0.5);
      expect(getMiles(16093.44)).toBe(10.0);
    });

    it('should handle custom decimal places', () => {
      expect(getMiles(1609.344, 2)).toBe(1.00);
      expect(getMiles(1609.344, 0)).toBe(1);
    });

    it('should handle default values', () => {
      expect(getMiles()).toBe(0);
      expect(getMiles(0)).toBe(0);
    });
  });

  describe('pad', () => {
    it('should pad numbers with leading zeros', () => {
      expect(pad(5, 3)).toBe('005');
      expect(pad(42, 4)).toBe('0042');
      expect(pad(123, 2)).toBe('123');
    });

    it('should handle zero', () => {
      expect(pad(0, 3)).toBe('000');
      expect(pad(0, 1)).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(pad(-5, 3)).toBe('-005');
      expect(pad(-42, 4)).toBe('-0042');
    });

    it('should handle default values', () => {
      expect(pad(0, 1)).toBe('0');
      expect(pad(0, 3)).toBe('000');
    });
  });

  describe('parseNum', () => {
    it('should parse numeric strings', () => {
      expect(parseNum('123')).toBe(123);
      expect(parseNum('123.45')).toBe(123.45);
      expect(parseNum('0')).toBe(0);
    });

    it('should remove non-digit characters', () => {
      expect(parseNum('abc123def')).toBe(123);
      expect(parseNum('1,234.56')).toBe(1234.56);
      expect(parseNum('$100')).toBe(100);
    });

    it('should handle max length constraint', () => {
      expect(parseNum('123456', 3)).toBe(123);
      expect(parseNum('abc123def', 2)).toBe(12);
    });

    it('should handle non-string inputs', () => {
      expect(parseNum(123)).toBe(123);
      expect(parseNum(123.45)).toBe(123.45);
      expect(parseNum(0)).toBe(0);
    });

    it('should handle invalid inputs', () => {
      expect(parseNum('abc')).toBe(0);
      expect(parseNum('')).toBe(0);
      expect(parseNum(null)).toBe(0);
      expect(parseNum(undefined)).toBe(0);
    });

    it('should handle default values', () => {
      expect(parseNum()).toBe(0);
    });
  });

  describe('roundToHalf', () => {
    it('should round to nearest half', () => {
      expect(roundToHalf(1.2)).toBe(1);
      expect(roundToHalf(1.6)).toBe(1.5);
      expect(roundToHalf(1.5)).toBe(1.5);
      expect(roundToHalf(2.7)).toBe(2.5);
      expect(roundToHalf(2.8)).toBe(3);
    });

    it('should handle integers', () => {
      expect(roundToHalf(1)).toBe(1);
      expect(roundToHalf(2)).toBe(2);
    });

    it('should handle negative numbers', () => {
      expect(roundToHalf(-1.2)).toBe(-1);
      expect(roundToHalf(-1.6)).toBe(-1.5);
      expect(roundToHalf(-1.5)).toBe(-1.5);
    });

    it('should handle zero', () => {
      expect(roundToHalf(0)).toBe(0);
    });
  });

  describe('formatNumber', () => {
    it('should format basic numbers', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(1234.56)).toBe('1,235');
    });

    it('should handle decimal places', () => {
      expect(formatNumber(1234.56, { maxDecimals: 1 })).toBe('1,234.6');
      expect(formatNumber(1234, { minDecimals: 2 })).toBe('1,234.00');
    });

    it('should handle percentage style', () => {
      expect(formatNumber(0.5, { style: '%' })).toBe('50%');
      expect(formatNumber(0.123, { style: '%', maxDecimals: 1 })).toBe('12.3%');
    });

    it('should handle currency style', () => {
      expect(formatNumber(1234.56, { style: '$' })).toBe('$1,235');
      expect(formatNumber(1234.56, { style: '$', maxDecimals: 2 })).toBe('$1,234.56');
    });

    it('should handle order suffixes', () => {
      expect(formatNumber(1500, { useOrderSuffix: true })).toBe('2k');
      expect(formatNumber(1500000, { useOrderSuffix: true })).toBe('2M');
      expect(formatNumber(1500000000, { useOrderSuffix: true })).toBe('2B');
    });

    it('should handle custom order suffixes', () => {
      const customSuffixes = ['', 'K', 'M', 'G'];
      expect(formatNumber(1500, {
        useOrderSuffix: true,
        orderSuffixes: customSuffixes
      })).toBe('2K');
    });

    it('should handle order constraints', () => {
      expect(formatNumber(1500, {
        useOrderSuffix: true
      })).toBe('2k');
      expect(formatNumber(1500, {
        useOrderSuffix: true,
        maxOrder: 1,
        minOrder: 1
      })).toBe('2k');
      expect(formatNumber(1500000, {
        useOrderSuffix: true,
        maxOrder: 1,
        minOrder: 1
      })).toBe('1500k');
      expect(formatNumber(1500000, {
        useOrderSuffix: true,
        maxOrder: 2,
        minOrder: 2
      })).toBe('2M');
      expect(formatNumber(1500000, {
        useOrderSuffix: true,
        maxOrder: 2,
        minOrder: 1
      })).toBe('2M');
      expect(formatNumber(1500, {
        useOrderSuffix: true,
        maxOrder: 2,
        minOrder: 1
      })).toBe('2k');
    });

    it('should handle NaN', () => {
      expect(formatNumber(NaN)).toBe('');
      expect(formatNumber(NaN, { valueIfNaN: 'N/A' })).toBe('N/A');
    });

    it('should handle infinity', () => {
      expect(formatNumber(Infinity, { useOrderSuffix: true })).toBe('Infinity');
      expect(formatNumber(-Infinity, { useOrderSuffix: true })).toBe('-Infinity');
    });

    it('should handle default options', () => {
      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234.56)).toBe('1,235');
    });
  });
});