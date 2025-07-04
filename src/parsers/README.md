# Parsers

Data parsing and transformation utilities for common data types.

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { parseBoolean, parseEmail, parsePhone, formatNumber } from '@nlabs/utils/parsers';

// Boolean parsing
parseBoolean('true'); // true
parseBoolean('false'); // false

// Email validation
parseEmail('user@example.com'); // 'user@example.com'
parseEmail('invalid-email'); // ''

// Phone number formatting
parsePhone('+1-555-123-4567'); // '+15551234567'

// Number formatting
formatNumber(1234567, { useOrderSuffix: true }); // '1.2M'
```

## Functions

### [Boolean Parsers](./booleans.md)
- [parseBoolean](./booleans.md) - Parse boolean values with strict mode support

### [Number Parsers](./numbers.md)
- [formatNumber](./numbers.md) - Format numbers with suffixes and styles
- [getCurrencyFormat](./numbers.md) - Format currency values
- [getMeters](./numbers.md) - Convert miles to meters
- [getMiles](./numbers.md) - Convert meters to miles
- [pad](./numbers.md) - Pad numbers with leading zeros
- [parseNum](./numbers.md) - Parse numeric strings
- [roundToHalf](./numbers.md) - Round to nearest half

### [Object Parsers](./objects.md)
- [lowerCaseKeys](./objects.md) - Convert object keys to lowercase
- [toQueryString](./objects.md) - Convert object to query string

### [String Parsers](./strings.md)
- [createPassword](./strings.md) - Create encrypted passwords
- [createHash](./strings.md) - Generate MD5 hashes
- [parseArangoId](./strings.md) - Parse ArangoDB document IDs
- [parseChar](./strings.md) - Parse alphabetic characters
- [parseEmail](./strings.md) - Validate and parse email addresses
- [parseId](./strings.md) - Parse alphanumeric IDs
- [parseMentions](./strings.md) - Extract @mentions from text
- [parsePassword](./strings.md) - Parse and validate passwords
- [parsePhone](./strings.md) - Parse and format phone numbers
- [parseString](./strings.md) - Parse and trim strings
- [parseTags](./strings.md) - Extract #hashtags from text
- [parseTemplate](./strings.md) - Parse template strings with variables
- [parseUrl](./strings.md) - Parse and encode URLs
- [parseUsername](./strings.md) - Parse and validate usernames
- [parseVarChar](./strings.md) - Parse variable character strings
- [stripHTML](./strings.md) - Remove HTML tags from strings

## Use Cases

### Form Validation
```js
import { parseEmail, parsePhone, parseBoolean } from '@nlabs/utils/parsers';

function validateForm(data) {
  const errors = {};

  if (!parseEmail(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (!parsePhone(data.phone)) {
    errors.phone = 'Invalid phone number';
  }

  if (parseBoolean(data.agreed) !== true) {
    errors.agreed = 'Must agree to terms';
  }

  return errors;
}
```

### Data Sanitization
```js
import { parseString, parseId, stripHTML } from '@nlabs/utils/parsers';

function sanitizeUserInput(input) {
  return {
    name: parseString(input.name, 50),
    id: parseId(input.id),
    description: stripHTML(input.description)
  };
}
```

### API Response Processing
```js
import { lowerCaseKeys, toQueryString } from '@nlabs/utils/parsers';

// Normalize API response keys
const normalized = lowerCaseKeys(apiResponse);

// Convert filters to query string
const queryString = toQueryString({ page: 1, limit: 10 });
```

## Performance

All parser functions are optimized for:
- **Speed**: Fast string operations and minimal object creation
- **Memory**: Efficient algorithms with low memory footprint
- **Reliability**: Robust error handling and edge case coverage

## TypeScript

Full TypeScript support with proper type definitions:

```ts
import { parseEmail, parsePhone, formatNumber } from '@nlabs/utils/parsers';

// Type-safe parsing
const email: string = parseEmail('user@example.com');
const phone: string = parsePhone('+1-555-123-4567');
const formatted: string = formatNumber(1234567, { useOrderSuffix: true });
```

## Related

- [Objects](../objects/README.md) - Object manipulation utilities
- [Strings](../strings/README.md) - String manipulation utilities
- [Checks](../checks/README.md) - Type validation functions