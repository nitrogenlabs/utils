# orderBy

Creates a sorted array of elements based on the specified iteratee functions and sort orders.

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```javascript
import { orderBy } from '@nlabs/utils/arrays';
```

## Syntax

```typescript
function orderBy<T>(
  array: T[],
  iteratees: Array<((item: T) => any) | string> = ['asc'],
  orders: Array<'asc' | 'desc'> = []
): T[]
```

## Parameters

- `array`: The array to sort
- `iteratees`: Array of iteratee functions or property paths to sort by
- `orders`: Array of sort orders ('asc' or 'desc')

## Returns

A new sorted array.

## Examples

### Sort by a Single Property

```javascript
import { orderBy } from '@nlabs/utils/arrays';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 34 }
];

// Sort by 'user' property in ascending order
orderBy(users, ['user'], ['asc']);
// => [{ user: 'barney', age: 36 }, { user: 'barney', age: 34 }, { user: 'fred', age: 48 }, { user: 'fred', age: 40 }]
```

### Sort by Multiple Properties

```javascript
import { orderBy } from '@nlabs/utils/arrays';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 34 }
];

// Sort by 'user' in ascending order, then by 'age' in descending order
orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ]
```

### Sort with Custom Iteratee Functions

```javascript
import { orderBy } from '@nlabs/utils/arrays';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 36 }
];

// Sort by username length in descending order, then by age in ascending order
orderBy(users, [
  user => user.user.length,
  'age'
], ['desc', 'asc']);
// => [{ user: 'barney', age: 36 }, { user: 'fred', age: 48 }]
```

## Performance

Optimized implementation:

- Uses native JavaScript `sort` under the hood
- Creates a single comparison function for all criteria
- Efficiently handles null/undefined values
- Returns a new array without mutating the original

## Edge Cases

### Empty Arrays

```javascript
orderBy([]); // => []
```

### Null and Undefined Values

```javascript
const array = [
  { a: 3 },
  { a: null },
  { a: 1 },
  { a: undefined }
];

// Null and undefined values are sorted first
orderBy(array, ['a'], ['asc']);
// => [{ a: null }, { a: undefined }, { a: 1 }, { a: 3 }]
```

### Default Order

```javascript
// If orders are not specified, defaults to ascending order
orderBy([3, 1, 2], [a => a]);
// => [1, 2, 3]
```

## TypeScript

Full TypeScript support with proper type inference:

```typescript
import { orderBy } from '@nlabs/utils/arrays';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'Fred', age: 48 },
  { name: 'Barney', age: 36 }
];

// Properly typed
const sortedUsers: User[] = orderBy(users, ['age'], ['desc']);
```

## Migration from Lodash

```javascript
// Before (lodash)
import { orderBy } from 'lodash';
const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);

// After (@nlabs/utils)
import { orderBy } from '@nlabs/utils/arrays';
const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
```

## Related

- [uniq](../uniq/uniq.md) - Create an array of unique values
- [difference](../difference/difference.md) - Create an array of values not included in other arrays
