# Number Parsers

> Number formatting, conversion, and parsing utilities

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import {
  formatNumber,
  getCurrencyFormat,
  parseNum,
  getMeters,
  getMiles
} from '@nlabs/utils/parsers';

formatNumber(1234567, { useOrderSuffix: true }); // '1.2M'
getCurrencyFormat(1234.56, 'USD'); // '$1,234.56'
parseNum('123abc'); // 123
getMeters(5); // 8046.7 (miles to meters)
getMiles(8046.7); // 5.0 (meters to miles)
```

## Functions

### formatNumber

Format numbers with suffixes, styles, and decimal precision.

```ts
formatNumber(
  num: number,
  options: NumberFormatOptions = {}
): string
```

**Options:**
- `maxDecimals`: Maximum decimal places (default: 0)
- `minDecimals`: Minimum decimal places (default: 0)
- `style`: Format style - '%' for percentage, '$' for currency
- `useOrderSuffix`: Use k, M, B, T suffixes (default: false)
- `orderSuffixes`: Custom suffixes array (default: ['', 'k', 'M', 'B', 'T'])
- `minOrder`: Minimum order to use suffix (default: 0)
- `maxOrder`: Maximum order to use suffix (default: Infinity)
- `valueIfNaN`: Value to return for NaN (default: '')

**Examples:**
```js
formatNumber(1234567); // '1,234,567'
formatNumber(1234567, { useOrderSuffix: true }); // '1.2M'
formatNumber(0.1234, { maxDecimals: 2, style: '%' }); // '12.34%'
formatNumber(1234.56, { style: '$', minDecimals: 2 }); // '$1,234.56'
```

### getCurrencyFormat

Format numbers as currency with symbol and formatting.

```ts
getCurrencyFormat(
  amount: number = 0,
  currency: string = 'USD',
  format: string = '0,0.00'
): string
```

**Examples:**
```js
getCurrencyFormat(1234.56, 'USD'); // '$1,234.56'
getCurrencyFormat(1234.56, 'GBP'); // '£1,234.56'
getCurrencyFormat(1234.56, 'USD', '0,0'); // '$1,235'
```

### parseNum

Parse numeric strings, removing non-digits and handling max length.

```ts
parseNum(num: any = 0, max?: number): number
```

**Examples:**
```js
parseNum('123abc'); // 123
parseNum('abc123def', 3); // 123
parseNum('12.34'); // 12.34
parseNum('invalid'); // null
```

### getMeters

Convert miles to meters with decimal precision.

```ts
getMeters(miles: number = 0, decimals: number = 1): number
```

**Examples:**
```js
getMeters(1); // 1609.3
getMeters(5, 2); // 8046.72
getMeters(0.5); // 804.7
```

### getMiles

Convert meters to miles with decimal precision.

```ts
getMiles(meters: number = 0, decimals: number = 1): number
```

**Examples:**
```js
getMiles(1609.344); // 1.0
getMiles(8046.72, 2); // 5.00
getMiles(1000); // 0.6
```

### pad

Pad numbers with leading zeros to specified length.

```ts
pad(num: number = 0, size: number): string
```

**Examples:**
```js
pad(5, 3); // '005'
pad(42, 4); // '0042'
pad(123, 2); // '123' (no padding needed)
```

### roundToHalf

Round numbers to the nearest half (0.5 increment).

```ts
roundToHalf(value: any): number
```

**Examples:**
```js
roundToHalf(1.2); // 1
roundToHalf(1.7); // 2
roundToHalf(1.5); // 1.5
roundToHalf(2.3); // 2.5
```

## Use Cases

### Financial Applications
```js
function formatTransaction(amount, currency) {
  return {
    display: getCurrencyFormat(amount, currency),
    raw: parseNum(amount.toString()),
    rounded: roundToHalf(amount)
  };
}
```

### Distance Calculations
```js
function calculateDistance(miles) {
  return {
    miles: miles,
    meters: getMeters(miles),
    kilometers: getMeters(miles) / 1000
  };
}
```

### Data Display
```js
function formatMetrics(data) {
  return {
    users: formatNumber(data.users, { useOrderSuffix: true }),
    revenue: getCurrencyFormat(data.revenue, 'USD'),
    growth: formatNumber(data.growth, { style: '%', maxDecimals: 2 })
  };
}
```

## Performance

- **Optimized**: Uses native number operations
- **Efficient**: Minimal object creation
- **Fast**: Optimized for common use cases

## TypeScript

Full TypeScript support with proper interfaces:

```ts
import { formatNumber, NumberFormatOptions } from '@nlabs/utils/parsers';

const options: NumberFormatOptions = {
  useOrderSuffix: true,
  maxDecimals: 2
};

const formatted: string = formatNumber(1234567, options);
```

## Edge Cases

### Invalid Input
```js
parseNum('invalid'); // null
formatNumber(NaN); // '' (or valueIfNaN)
getCurrencyFormat('not a number'); // '$0.00'
```

### Zero and Negative Values
```js
formatNumber(0); // '0'
formatNumber(-1234); // '-1,234'
getMeters(0); // 0
getMiles(-1000); // -0.6
```

### Large Numbers
```js
formatNumber(999999999999, { useOrderSuffix: true }); // '1T'
formatNumber(1000000, { useOrderSuffix: true }); // '1M'
```

## Migration from Lodash

```js
// Lodash
_.padStart('5', 3, '0'); // '005'
// @nlabs/utils
pad(5, 3); // '005'
```

## Related

- [isNumber](../checks/isNumber.md) - Number type checking
- [parseString](./strings.md) - String parsing utilities
- [parseBoolean](./booleans.md) - Boolean parsing utilities