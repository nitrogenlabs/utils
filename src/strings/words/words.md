# words

Splits a string into an array of words.

## Usage

```typescript
import { words } from '@nlabs/utils/strings/words';

// Basic usage
words('hello world'); // => ['hello', 'world']

// Handle camelCase
words('helloWorld'); // => ['hello', 'World']

// Handle kebab-case
words('hello-world'); // => ['hello', 'world']

// Handle snake_case
words('hello_world'); // => ['hello', 'world']

// Handle mixed separators
words('hello-world_test'); // => ['hello', 'world', 'test']

// Handle strings with numbers
words('hello123world'); // => ['hello', '123', 'world']

// Handle strings with special characters
words('fred, barney, & pebbles'); // => ['fred', 'barney', 'pebbles']

// Handle strings with apostrophes
words("don't stop"); // => ["don't", 'stop']

// Handle unicode characters
words('café résumé'); // => ['café', 'résumé']

// Custom pattern
words('fred, barney, & pebbles', /[^, ]+/g); // => ['fred', 'barney', '&', 'pebbles']
```

## API

### `words(string: string, pattern?: string | RegExp): string[]`

**Parameters:**

- `string` (string): The string to split into words
- `pattern` (string | RegExp, optional): The pattern to match words. Can be a string or RegExp

**Returns:**

- `string[]`: Array of words

**Features:**

- Automatically handles camelCase, kebab-case, snake_case, and other naming conventions
- Preserves apostrophes within words
- Supports unicode characters
- Handles numbers and special characters appropriately
- Allows custom patterns for specific use cases
- Returns empty array for non-string inputs or empty strings
