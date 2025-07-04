# debounceCompact

Lightweight debounce function optimized for simple use cases.

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```javascript
import { debounceCompact } from '@nlabs/utils/objects';
```

## API

```typescript
function debounceCompact<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void }
```

### Parameters

- `func` (T): The function to debounce
- `wait` (number): The number of milliseconds to delay

### Returns

- `T & { cancel: () => void }`: The debounced function with a cancel method

## Examples

### Basic Usage

```javascript
import { debounceCompact } from '@nlabs/utils/objects';

const debouncedLog = debounceCompact((message) => {
  console.log(message);
}, 300);

// Multiple rapid calls
debouncedLog('hello');
debouncedLog('world');
debouncedLog('!');

// Only "!" will be logged (after 300ms of inactivity)
```

### Simple Search

```javascript
import { debounceCompact } from '@nlabs/utils/objects';

const searchInput = document.getElementById('search');

const performSearch = debounceCompact((query) => {
  // Simple search logic
  const results = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  displayResults(results);
}, 250);

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value);
});
```

### Button Click Prevention

```javascript
import { debounceCompact } from '@nlabs/utils/objects';

const submitButton = document.getElementById('submit');

const handleSubmit = debounceCompact(() => {
  // Prevent double-clicks
  submitForm();
}, 1000);

submitButton.addEventListener('click', handleSubmit);
```

## Cancellation

```javascript
import { debounceCompact } from '@nlabs/utils/objects';

const debouncedFn = debounceCompact(() => {
  console.log('Executed!');
}, 1000);

// Call the function
debouncedFn();

// Cancel before execution
debouncedFn.cancel();

// Function won't execute
```

## Performance

The `debounceCompact` function is optimized for minimal bundle size:

- **Smaller Bundle**: ~40% smaller than full debounce implementation
- **Same API**: Compatible with the full debounce function
- **Essential Features**: Includes core debouncing and cancellation

### Bundle Size Comparison

| Function | Size | Features |
|----------|------|----------|
| `debounce` | ~2.1KB | Full implementation with edge cases |
| `debounceCompact` | ~1.3KB | Essential features only |

## When to Use

### Use `debounceCompact` when:

- You need a lightweight debounce function
- You don't need advanced features like `leading` or `trailing` options
- Bundle size is critical
- Simple use cases like search inputs or button clicks

### Use `debounce` when:

- You need advanced debouncing features
- You need `leading` or `trailing` options
- You're dealing with complex edge cases
- Performance is more important than bundle size

## Migration from Lodash

```javascript
// Before (lodash)
import { debounce } from 'lodash';
const debouncedFn = debounce(() => console.log('hello'), 300);

// After (@nlabs/utils) - Compact version
import { debounceCompact } from '@nlabs/utils/objects';
const debouncedFn = debounceCompact(() => console.log('hello'), 300);

// After (@nlabs/utils) - Full version
import { debounce } from '@nlabs/utils/objects';
const debouncedFn = debounce(() => console.log('hello'), 300);
```

## TypeScript

Full TypeScript support with proper type inference:

```typescript
import { debounceCompact } from '@nlabs/utils/objects';

// Type-safe debouncing
const searchUsers = debounceCompact((query: string) => {
  console.log('Searching for:', query);
}, 300);

// TypeScript knows the return type includes cancel method
searchUsers('john');
searchUsers.cancel();
```

## Related

- [debounce](./debounce.md) - Full-featured debounce function
- [throttle](./throttle.md) - Limit function execution rate
- [merge](./merge.md) - Deep merge objects
- [cloneDeep](./clone.md) - Deep clone objects