# replace

> String replacement utility with RegExp/function support

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { replace } from '@nlabs/utils/strings';

replace('hello world', 'world', 'there'); // 'hello there'
replace('foo-bar-baz', /-/g, '_'); // 'foo_bar_baz'
replace('abc123', /\d+/, (match) => `[${match}]`); // 'abc[123]'
```

## API

```ts
replace(
  string: string,
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: any[]) => string)
): string
```

- `string`: The input string to modify.
- `pattern`: A string or RegExp to match.
- `replacement`: A string or function to produce the replacement.

## Examples

### Basic Replacement
```js
replace('foo bar', 'bar', 'baz'); // 'foo baz'
```

### Regex Replacement
```js
replace('a1b2c3', /\d/g, '#'); // 'a#b#c#'
```

### Functional Replacement
```js
replace('abc123', /\d+/, (match) => `[${match}]`); // 'abc[123]'
```

### Replace All Occurrences
```js
replace('foo-foo-foo', /foo/g, 'bar'); // 'bar-bar-bar'
```

## Use Cases
- Sanitizing user input
- Formatting strings
- Masking sensitive data
- Dynamic template replacement

## Performance
- Uses native `String.prototype.replace` (fastest possible)
- No dependencies

## TypeScript
- Fully typed, supports string and RegExp patterns
- Replacement can be a function for advanced use

## Edge Cases
- If pattern is not found, returns original string
- If pattern is empty string, inserts replacement between every character
- If replacement is a function, receives match and capture groups

## Migration from Lodash

```js
// Lodash
_.replace('foo', 'f', 'b'); // 'boo'
// @nlabs/utils
replace('foo', 'f', 'b'); // 'boo'
```

## Related
- [trim](./trim.md)
- [escape](./escape.md)
- [case](./case.md)