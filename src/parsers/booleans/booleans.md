# parseBoolean

> Parse boolean values with strict mode support

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { parseBoolean } from '@nlabs/utils/parsers';

parseBoolean('true'); // true
parseBoolean('false'); // false
parseBoolean(1); // true
parseBoolean(0); // false
parseBoolean('true', true); // true (strict mode)
parseBoolean(null, true); // null (strict mode)
```

## API

```ts
parseBoolean(bool: any, strict: boolean = false): boolean | null | undefined
```

**Parameters:**

- `bool`: Value to parse as boolean
- `strict`: If true, preserves null/undefined values

**Returns:** Boolean value, or null/undefined in strict mode

## Examples

### Basic Parsing

```js
parseBoolean('true'); // true
parseBoolean('false'); // false
parseBoolean('TRUE'); // true
parseBoolean('FALSE'); // false
```

### Numeric Values

```js
parseBoolean(1); // true
parseBoolean(0); // false
parseBoolean(42); // true
parseBoolean(-1); // true
```

### Object Values

```js
parseBoolean({}); // true
parseBoolean([]); // true
parseBoolean(null); // false
parseBoolean(undefined); // false
```

### Strict Mode

```js
parseBoolean(null, true); // null
parseBoolean(undefined, true); // undefined
parseBoolean('false', true); // false
parseBoolean('true', true); // true
```

## Use Cases

### Form Input Processing

```js
function processFormData(data) {
  return {
    isActive: parseBoolean(data.isActive),
    notifications: parseBoolean(data.notifications),
    termsAccepted: parseBoolean(data.termsAccepted)
  };
}
```

### API Response Handling

```js
function parseApiResponse(response) {
  return {
    success: parseBoolean(response.success),
    hasData: parseBoolean(response.hasData),
    isCached: parseBoolean(response.isCached)
  };
}
```

### Configuration Parsing

```js
function parseConfig(config) {
  return {
    debug: parseBoolean(config.debug),
    production: parseBoolean(config.production),
    strict: parseBoolean(config.strict, true) // Preserve null/undefined
  };
}
```

## Performance

- **Fast**: Simple boolean conversion
- **Lightweight**: No dependencies
- **Efficient**: Minimal object creation

## TypeScript

Full TypeScript support:

```ts
import { parseBoolean } from '@nlabs/utils/parsers';

// Type-safe parsing
const isActive: boolean = parseBoolean('true');
const isStrict: boolean | null = parseBoolean(null, true);
```

## Edge Cases

### Falsy Values

```js
parseBoolean(''); // false
parseBoolean(0); // false
parseBoolean(false); // false
parseBoolean(null); // false
parseBoolean(undefined); // false
```

### Truthy Values

```js
parseBoolean('anything'); // true
parseBoolean(1); // true
parseBoolean(true); // true
parseBoolean({}); // true
parseBoolean([]); // true
```

### String 'false'

```js
parseBoolean('false'); // false (special case)
parseBoolean('False'); // false
parseBoolean('FALSE'); // false
```

## Migration from Lodash

```js
// Lodash
_.toBoolean('true'); // true
// @nlabs/utils
parseBoolean('true'); // true
```

## Related

- [isBoolean](../checks/isBoolean.md) - Type checking for booleans
- [parseString](./strings.md) - String parsing utilities
- [parseNum](./numbers.md) - Number parsing utilities
