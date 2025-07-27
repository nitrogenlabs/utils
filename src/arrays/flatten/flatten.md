# flatten

Flattens a nested array by one level.

## Usage

```typescript
import { flatten } from '@nlabs/utils/arrays/flatten';

// Basic flattening
flatten([1, [2, [3, 4]], 5]); // => [1, 2, [3, 4], 5]

// Flatten array of arrays
flatten([[1, 2], [3, 4], [5, 6]]); // => [1, 2, 3, 4, 5, 6]

// Already flat array
flatten([1, 2, 3]); // => [1, 2, 3]

// Empty array
flatten([]); // => []

// Arrays with empty nested arrays
flatten([1, [], 2, [3, 4], []]); // => [1, 2, 3, 4]

// Mixed types
flatten([1, ['a', 'b'], true, [null, undefined]]); // => [1, 'a', 'b', true, null, undefined]

// Objects in arrays
const obj1 = {a: 1};
const obj2 = {b: 2};
flatten([obj1, [obj2, {c: 3}]]); // => [obj1, obj2, {c: 3}]
```

## API

### `flatten<T>(array: T[]): T[]`

**Parameters:**

- `array` (T[]): The array to flatten

**Returns:**

- `T[]`: A new flattened array

**Features:**

- Flattens nested arrays by exactly one level
- Preserves non-array elements as-is
- Handles mixed types (numbers, strings, objects, functions, etc.)
- Handles null and undefined values
- Handles empty arrays and sparse arrays
- Does not mutate the original array
- Returns empty array for non-array inputs
- TypeScript support with generic types

**Note:** This function only flattens one level deep. For deep flattening, you would need to call this function multiple times or use a different approach.
