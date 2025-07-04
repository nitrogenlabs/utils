# Objects Utilities

Object manipulation utilities for deep cloning, merging, property access, and more.

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```javascript
import { cloneDeep, merge, get, set, isEmpty } from '@nlabs/utils/objects';
```

## Functions

- [assign](./assign.md)
- [clone](./clone.md)
- [debounce](./debounce.md)
- [debounce-compact](./debounce-compact.md)
- [defaults](./defaults.md)
- [entries](./entries.md)
- [get](./get.md)
- [set](./set.md)
- [has](./has.md)
- [keys](./keys.md)
- [mapKeys](./mapKeys.md)
- [mapValues](./mapValues.md)
- [merge](./merge.md)
- [omit](./omit.md)
- [pick](./pick.md)
- [stack-parser](./stack-parser.md)
- [values](./values.md)

### [cloneDeep](./clone.md)
Deep clone objects with native `structuredClone` support.

```javascript
import { cloneDeep } from '@nlabs/utils/objects';

const original = { a: 1, b: { c: 2 } };
const cloned = cloneDeep(original);
// cloned is a deep copy, modifying b.c won't affect original
```

### [merge](./merge.md)
Deep merge objects with support for nested properties.

```javascript
import { merge } from '@nlabs/utils/objects';

const target = { a: 1, b: { c: 2 } };
const source = { b: { d: 3 }, e: 4 };
const result = merge(target, source);
// result: { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### [get/set](./get-set.md)
Safe property access with dot notation support.

```javascript
import { get, set } from '@nlabs/utils/objects';

const obj = { user: { profile: { name: 'John' } } };

// Safe property access
const name = get(obj, 'user.profile.name', 'Unknown');
// name: 'John'

// Safe property setting
const updated = set(obj, 'user.profile.age', 30);
// updated: { user: { profile: { name: 'John', age: 30 } } }
```

### [isEmpty](./isEmpty.md)
Check if a value is empty (null, undefined, empty string, array, or object).

```javascript
import { isEmpty } from '@nlabs/utils/objects';

isEmpty(null);        // true
isEmpty(undefined);    // true
isEmpty('');          // true
isEmpty([]);          // true
isEmpty({});          // true
isEmpty('hello');     // false
isEmpty([1, 2, 3]);   // false
isEmpty({ a: 1 });    // false
```

### [debounce](./debounce.md)
Debounce function calls to limit execution frequency.

```javascript
import { debounce } from '@nlabs/utils/objects';

const debouncedSearch = debounce((query) => {
  // API call here
  console.log('Searching for:', query);
}, 300);

// Only executes after 300ms of inactivity
debouncedSearch('hello');
debouncedSearch('hello world');
// Only "hello world" will be logged
```

### [mapValues](./mapValues.md)
Transform object values using a function.

```javascript
import { mapValues } from '@nlabs/utils/objects';

const obj = { a: 1, b: 2, c: 3 };
const doubled = mapValues(obj, (value) => value * 2);
// doubled: { a: 2, b: 4, c: 6 }
```

### [pick/omit](./pick-omit.md)
Select or exclude object properties.

```javascript
import { pick, omit } from '@nlabs/utils/objects';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };

// Pick specific properties
const publicUser = pick(user, ['id', 'name', 'email']);
// publicUser: { id: 1, name: 'John', email: 'john@example.com' }

// Omit specific properties
const safeUser = omit(user, ['password']);
// safeUser: { id: 1, name: 'John', email: 'john@example.com' }
```

## Performance

All object utilities are optimized for performance:

- **cloneDeep**: Uses native `structuredClone` when available, falls back to optimized implementation
- **merge**: Optimized for common use cases with minimal object creation
- **get/set**: Fast property access with early returns
- **isEmpty**: Minimal checks with early returns

## TypeScript Support

Full TypeScript support with proper type inference:

```typescript
import { cloneDeep, merge, get } from '@nlabs/utils/objects';

interface User {
  id: number;
  profile: {
    name: string;
    email: string;
  };
}

const user: User = { id: 1, profile: { name: 'John', email: 'john@example.com' } };

// Type-safe cloning
const cloned: User = cloneDeep(user);

// Type-safe property access
const name: string = get(user, 'profile.name', 'Unknown');

// Type-safe merging
const updated: User = merge(user, { profile: { name: 'Jane' } });
```