# pullAllBy

Removes all elements from an array that match values in another array, based on a provided iteratee function.

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```javascript
import { pullAllBy } from '@nlabs/utils/arrays';
```

## Syntax

```typescript
function pullAllBy<T>(
  array: T[],
  values: T[],
  iteratee: ((value: T) => any) | keyof T
): T[]
```

## Parameters

- `array`: The array to inspect
- `values`: The values to exclude
- `iteratee`: The iteratee function to determine uniqueness, or a property name

## Returns

A new array with elements from `array` that don't have matching iteratee values in `values`.

## Examples

### Remove Objects with Matching Properties

```javascript
import { pullAllBy } from '@nlabs/utils/arrays';

const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
const values = [{ x: 1 }, { x: 3 }];

pullAllBy(array, values, 'x');
// => [{ x: 2 }]
```

### Using a Custom Iteratee Function

```javascript
import { pullAllBy } from '@nlabs/utils/arrays';

const array = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 2 }];
const values = [{ x: 1 }, { x: 3 }];

pullAllBy(array, values, obj => obj.x);
// => [{ x: 2, y: 1 }]
```

### Working with Nested Properties

```javascript
import { pullAllBy } from '@nlabs/utils/arrays';

const array = [
  { user: { id: 1, name: 'John' } },
  { user: { id: 2, name: 'Jane' } },
  { user: { id: 3, name: 'Bob' } }
];

const valuesToRemove = array.filter(item => [1, 3].includes(item.user.id));

pullAllBy(array, valuesToRemove, obj => obj.user.id);
// => [{ user: { id: 2, name: 'Jane' } }]
```

## Differences from Lodash

- **Non-mutative**: Returns a new array instead of modifying the original
- **Better TypeScript support**: Proper typing for iteratees and property paths
- **Performance**: Uses a Set for O(1) lookups instead of O(n) array searches

## Performance

Optimized implementation:

- O(n) time complexity where n is the length of the input array
- Uses a Set for fast value lookups
- Creates a single function for all iteratee invocations
- Returns a new array, preserving the original

## Edge Cases

### Empty Arrays

```javascript
pullAllBy([], [{ x: 1 }], 'x'); // => []
pullAllBy([{ x: 1 }], [], 'x'); // => [{ x: 1 }]
```

### Different Object Structures

```javascript
const array = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, z: 4 }
];

const values = [{ x: 1 }, { x: 3, a: 5 }];

pullAllBy(array, values, 'x');
// => [{ x: 2, y: 1 }]
```

## TypeScript

Full TypeScript support with proper type inference:

```typescript
import { pullAllBy } from '@nlabs/utils/arrays';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const valuesToRemove: User[] = [
  { id: 1, name: 'Someone' },
  { id: 3, name: 'Anyone' }
];

// Properly typed result
const result: User[] = pullAllBy(users, valuesToRemove, 'id');
```

## Migration from Lodash

```javascript
// Before (lodash - mutates the original array)
import { pullAllBy } from 'lodash';
const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
// array is now [{ x: 2 }]

// After (@nlabs/utils - returns a new array)
import { pullAllBy } from '@nlabs/utils/arrays';
const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
const result = pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
// array is still [{ x: 1 }, { x: 2 }, { x: 3 }]
// result is [{ x: 2 }]
```

## Related

- [difference](../difference/difference.md) - Create an array of values not included in other arrays
- [uniq](../uniq/uniq.md) - Create an array of unique values
