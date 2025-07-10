# set

> Immutable set for deeply nested object properties

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { set } from '@nlabs/utils/objects';

const obj = { a: { b: 1 } };
const updated = set(obj, 'a.b', 42);
// updated: { a: { b: 42 } }
// obj is unchanged
```

## API

```ts
set(
  obj: any,
  path: string | string[],
  value: any
): any
```
- `obj`: The object to update
- `path`: Dot-separated string or array of keys
- `value`: Value to set at the path
- Returns a new object with the value set

## Examples

### Dot Notation
```js
set({ a: { b: 1 } }, 'a.b', 2); // { a: { b: 2 } }
```

### Array Path
```js
set({ a: { b: 1 } }, ['a', 'b'], 2); // { a: { b: 2 } }
```

### Add New Path
```js
set({}, 'a.b.c', 5); // { a: { b: { c: 5 } } }
```

### Non-object Input
```js
set(null, 'a.b', 1); // null
```

## Use Cases
- Immutable updates for state management
- Deeply nested property assignment
- Safe object mutation

## Performance
- Optimized for shallow and deep paths
- No dependencies

## TypeScript
- Fully typed, accepts any object and path

## Edge Cases
- Returns original object if input is null/undefined
- Handles both string and array paths
- Does not mutate the original object

## Migration from Lodash

```js
// Lodash
_.set(obj, 'a.b.c', 1);
// @nlabs/utils
set(obj, 'a.b.c', 1);
```

## Related
- [get](./get.md)
- [has](./has.md)