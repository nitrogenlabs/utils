# qs

A utility for parsing and stringifying query strings. This function replicates the functionality of the popular `qs` package but is optimized with modern ES features for better performance.

## Import

```ts
import { parse, stringify, qs } from '@nlabs/utils/strings/qs';
```

## Usage

### Basic Usage

```ts
import { parse, stringify } from '@nlabs/utils/strings/qs';

// Parse a query string
const params = parse('foo=bar&baz=qux');
// => { foo: 'bar', baz: 'qux' }

// Stringify an object
const query = stringify({ foo: 'bar', baz: 'qux' });
// => 'foo=bar&baz=qux'
```

### Using the qs object

```ts
import qs from '@nlabs/utils/strings/qs';

// Parse
const params = qs.parse('foo=bar&baz=qux');

// Stringify
const query = qs.stringify({ foo: 'bar', baz: 'qux' });
```

## API

### `parse(str: string, options?: ParseOptions): Record<string, any>`

Parses a query string into an object.

#### Parameters

- `str` - The query string to parse
- `options` - Parsing options (optional)

#### Returns

- `Record<string, any>` - Parsed object

#### Parse Options

- `delimiter` - Character to use as delimiter (default: `'&'`)
- `strictNullHandling` - When true, empty values become `null` (default: `false`)
- `skipNulls` - Skip null/undefined values (default: `false`)
- `parseArrays` - Parse arrays (default: `true`)
- `parseNumbers` - Parse numbers (default: `false`)
- `parseBooleans` - Parse booleans (default: `false`)
- `allowDots` - Allow dot notation (default: `false`)
- `depth` - Maximum depth for nested objects (default: `5`)
- `parameterLimit` - Maximum number of parameters (default: `1000`)
- `ignoreQueryPrefix` - Ignore `?` prefix (default: `false`)
- `decoder` - Custom decoder function (default: `decodeURIComponent`)

### `stringify(obj: Record<string, any>, options?: StringifyOptions): string`

Stringifies an object into a query string.

#### Parameters

- `obj` - The object to stringify
- `options` - Stringify options (optional)

#### Returns

- `string` - Query string

#### Stringify Options

- `delimiter` - Character to use as delimiter (default: `'&'`)
- `strictNullHandling` - When true, null values become empty strings (default: `false`)
- `skipNulls` - Skip null/undefined values (default: `false`)
- `encode` - URL encode keys and values (default: `true`)
- `arrayFormat` - Array format: `'indices'`, `'brackets'`, `'repeat'`, `'comma'` (default: `'indices'`)
- `comma` - Use comma-separated values for arrays (default: `false`)
- `allowDots` - Use dot notation for nested objects (default: `false`)
- `addQueryPrefix` - Add `?` prefix (default: `false`)
- `charset` - Character set: `'utf-8'`, `'iso-8859-1'` (default: `'utf-8'`)
- `charsetSentinel` - Add charset sentinel (default: `false`)
- `encodeValuesOnly` - Only encode values, not keys (default: `false`)
- `sort` - Sort function for keys (default: `undefined`)

## Examples

### Basic Parsing

```ts
// Simple key-value pairs
parse('foo=bar&baz=qux');
// => { foo: 'bar', baz: 'qux' }

// Arrays
parse('foo[]=bar&foo[]=baz');
// => { foo: ['bar', 'baz'] }

// Nested objects
parse('foo[bar]=baz');
// => { foo: { bar: 'baz' } }

// Mixed structures
parse('foo[0]=bar&foo[1][baz]=qux');
// => { foo: ['bar', { baz: 'qux' }] }
```

### Advanced Parsing

```ts
// Parse numbers
parse('foo=123&bar=456', { parseNumbers: true });
// => { foo: 123, bar: 456 }

// Parse booleans
parse('foo=true&bar=false', { parseBooleans: true });
// => { foo: true, bar: false }

// Dot notation
parse('foo.bar=baz', { allowDots: true });
// => { foo: { bar: 'baz' } }

// Custom delimiter
parse('foo=bar;baz=qux', { delimiter: ';' });
// => { foo: 'bar', baz: 'qux' }

// Ignore query prefix
parse('?foo=bar', { ignoreQueryPrefix: true });
// => { foo: 'bar' }
```

### Basic Stringifying

```ts
// Simple objects
stringify({ foo: 'bar', baz: 'qux' });
// => 'foo=bar&baz=qux'

// Arrays
stringify({ foo: ['bar', 'baz'] });
// => 'foo[0]=bar&foo[1]=baz'

// Nested objects
stringify({ foo: { bar: 'baz' } });
// => 'foo[bar]=baz'
```

### Advanced Stringifying

```ts
// Different array formats
const obj = { foo: ['bar', 'baz'] };

stringify(obj, { arrayFormat: 'indices' });
// => 'foo[0]=bar&foo[1]=baz'

stringify(obj, { arrayFormat: 'brackets' });
// => 'foo[]=bar&foo[]=baz'

stringify(obj, { arrayFormat: 'repeat' });
// => 'foo=bar&foo=baz'

stringify(obj, { arrayFormat: 'comma' });
// => 'foo=bar,baz'

// Comma-separated arrays
stringify(obj, { comma: true });
// => 'foo=bar,baz'

// Dot notation
stringify({ foo: { bar: 'baz' } }, { allowDots: true });
// => 'foo.bar=baz'

// Add query prefix
stringify({ foo: 'bar' }, { addQueryPrefix: true });
// => '?foo=bar'

// Custom delimiter
stringify({ foo: 'bar', baz: 'qux' }, { delimiter: ';' });
// => 'foo=bar;baz=qux'

// Sorting
stringify({ c: '3', a: '1', b: '2' }, {
  sort: (a, b) => a.localeCompare(b)
});
// => 'a=1&b=2&c=3'
```

### URL Encoding

```ts
// Default encoding
stringify({ 'foo bar': 'baz qux' });
// => 'foo%20bar=baz%20qux'

// No encoding
stringify({ 'foo bar': 'baz qux' }, { encode: false });
// => 'foo bar=baz qux'

// Only encode values
stringify({ 'foo bar': 'baz qux' }, { encodeValuesOnly: true });
// => 'foo bar=baz%20qux'
```

### Null Handling

```ts
// Skip nulls (default)
stringify({ foo: null, bar: 'baz' });
// => 'bar=baz'

// Include nulls
stringify({ foo: null }, { strictNullHandling: true });
// => 'foo='

// Skip nulls explicitly
stringify({ foo: null, bar: 'baz' }, { skipNulls: true });
// => 'bar=baz'
```

### Complex Examples

```ts
// Complex nested structure
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  },
  tags: ['admin', 'user'],
  metadata: {
    created: '2023-01-01',
    lastLogin: '2023-12-01'
  }
};

const query = stringify(user);
// => 'name=John%20Doe&email=john%40example.com&preferences[theme]=dark&preferences[notifications]=true&tags[0]=admin&tags[1]=user&metadata[created]=2023-01-01&metadata[lastLogin]=2023-12-01'

// Parse it back
const parsed = parse(query);
// => { name: 'John Doe', email: 'john@example.com', ... }
```

### React Router Integration

```ts
import { useSearchParams } from 'react-router-dom';
import { parse, stringify } from '@nlabs/utils/strings/qs';

function SearchComponent() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse current search params
  const filters = parse(searchParams.toString());

  // Update filters
  const updateFilters = (newFilters: Record<string, any>) => {
    const query = stringify(newFilters, { addQueryPrefix: true });
    setSearchParams(query);
  };

  return (
    <div>
      <button onClick={() => updateFilters({ ...filters, page: 2 })}>
        Next Page
      </button>
    </div>
  );
}
```

### API Request Building

```ts
// Build API request with query parameters
const buildApiUrl = (baseUrl: string, params: Record<string, any>) => {
  const query = stringify(params);
  return query ? `${baseUrl}?${query}` : baseUrl;
};

const url = buildApiUrl('/api/users', {
  page: 1,
  limit: 10,
  filters: {
    status: 'active',
    role: 'admin'
  },
  sort: ['name', 'created_at']
});
// => '/api/users?page=1&limit=10&filters[status]=active&filters[role]=admin&sort[0]=name&sort[1]=created_at'
```

## Performance

The `qs` function is optimized for performance with the following features:

- Uses modern ES features like `for...of` loops and `Object.entries()`
- Minimal memory allocation
- Efficient string concatenation
- Early returns for edge cases
- Optimized regex patterns
- No unnecessary type checking

## Comparison with qs package

This function provides the same API as the `qs` package but with:

- Modern ES syntax
- Better TypeScript support
- Optimized performance
- Smaller bundle size (no external dependencies)
- Simplified decoder interface

## Migration from qs package

If you're migrating from the `qs` package, you can simply replace the import:

```ts
// Before
import qs from 'qs';

// After
import { parse, stringify, qs } from '@nlabs/utils/strings/qs';

// Usage remains the same
const params = qs.parse('foo=bar&baz=qux');
const query = qs.stringify({ foo: 'bar', baz: 'qux' });
```

## Browser Support

This function uses modern ES features and requires:

- ES2020+ support
- `Object.entries()` support
- `for...of` loops support
- Template literals support

For older browsers, consider using a polyfill or transpiler.
