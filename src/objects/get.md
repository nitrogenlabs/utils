# get

> Safe property access with dot notation or array path

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { get } from '@nlabs/utils/objects';

const obj = { a: { b: { c: 42 } } };
get(obj, 'a.b.c'); // 42
get(obj, ['a', 'b', 'c']); // 42
get(obj, 'a.b.x', 'default'); // 'default'
```

## API

```ts
get(
  obj: any,
  path: string | string[],
  defaultValue?: any
): any
```
- `obj`: The object to query
- `path`: Dot-separated string or array of keys
- `defaultValue`: Value to return if path is not found

## Examples

### Dot Notation
```js
get({ a: { b: 1 } }, 'a.b'); // 1
```

### Array Path
```js
get({ a: { b: 1 } }, ['a', 'b']); // 1
```

### Default Value
```js
get({ a: {} }, 'a.b', 99); // 99
```

### Non-object Input
```js
get(null, 'a.b', 'none'); // 'none'
```

## Use Cases
- Safe deep property access
- Avoids runtime errors for missing paths
- Useful in config, API, and form data

## Performance
- Optimized for short and deep paths
- No dependencies

## TypeScript
- Fully typed, accepts any object and path

## Edge Cases
- Returns `defaultValue` if path is not found
- Handles null/undefined objects
- Handles both string and array paths

## Migration from Lodash

```js
// Lodash
_.get(obj, 'a.b.c', 0);
// @nlabs/utils
get(obj, 'a.b.c', 0);
```

## Related
- [set](./set.md)
- [has](./has.md)