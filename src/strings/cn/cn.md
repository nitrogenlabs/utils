# cn

A utility function for conditionally joining class names together. This function replicates the functionality of the popular `clsx` package but is optimized with modern ES features for better performance.

## Import

```ts
import { cn } from '@nlabs/utils/strings/cn';
```

## Usage

### Basic Usage

```ts
import { cn } from '@nlabs/utils/strings/cn';

// Simple string concatenation
cn('foo', 'bar'); // => 'foo bar'

// With conditional classes
cn('base-class', isActive && 'active', isDisabled && 'disabled');
```

### Object Syntax

```ts
// Conditional classes using objects
cn('base-class', {
  'active': isActive,
  'disabled': isDisabled,
  'hidden': isHidden
});
```

### Array Syntax

```ts
// Using arrays
cn('base-class', ['foo', 'bar']); // => 'base-class foo bar'

// Nested arrays
cn('base-class', ['foo', ['bar', 'baz']]); // => 'base-class foo bar baz'
```

### Mixed Inputs

```ts
// Combining different input types
cn(
  'base-class',
  { 'conditional': isActive },
  ['array-class', { 'nested-conditional': isVisible }],
  null,
  undefined,
  false,
  'final-class'
);
```

## API

### `cn(...inputs: ClassValue[]): string`

Joins class names together, filtering out falsy values.

#### Parameters

- `...inputs` - Class names to join. Can be:
  - `string` - Direct class names
  - `number` - Converted to string
  - `boolean` - `true` becomes `'true'`, `false` is ignored
  - `null` or `undefined` - Ignored
  - `Record<string, any>` - Object where keys are class names and values are booleans
  - `ClassValue[]` - Arrays of any of the above types (recursively processed)

#### Returns

- `string` - Joined class names separated by spaces

## Examples

### React Component Example

```tsx
import { cn } from '@nlabs/utils/strings/cn';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const Button = ({ variant = 'primary', size = 'md', disabled, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
          'btn-sm': size === 'sm',
          'btn-md': size === 'md',
          'btn-lg': size === 'lg',
          'btn-disabled': disabled
        },
        className
      )}
      disabled={disabled}
    >
      Click me
    </button>
  );
};
```

### Conditional Styling

```tsx
const Card = ({ isExpanded, isSelected, children }) => {
  return (
    <div
      className={cn(
        'card',
        'p-4',
        'rounded-lg',
        'border',
        {
          'border-blue-500': isSelected,
          'border-gray-200': !isSelected,
          'shadow-lg': isExpanded,
          'shadow-sm': !isExpanded
        }
      )}
    >
      {children}
    </div>
  );
};
```

### Dynamic Classes

```tsx
const StatusBadge = ({ status, size = 'md' }) => {
  return (
    <span
      className={cn(
        'badge',
        {
          'badge-success': status === 'success',
          'badge-error': status === 'error',
          'badge-warning': status === 'warning',
          'badge-info': status === 'info',
          'badge-sm': size === 'sm',
          'badge-md': size === 'md',
          'badge-lg': size === 'lg'
        }
      )}
    >
      {status}
    </span>
  );
};
```

## Performance

The `cn` function is optimized for performance with the following features:

- Uses modern ES features like `for...of` loops and `Object.entries()`
- Minimal memory allocation
- Efficient string concatenation
- Early returns for empty inputs
- No unnecessary type checking

## Comparison with clsx

This function provides the same API as `clsx` but with:

- Modern ES syntax
- Better TypeScript support
- Optimized performance
- Smaller bundle size (no external dependencies)

## Migration from clsx

If you're migrating from `clsx`, you can simply replace the import:

```ts
// Before
import clsx from 'clsx';

// After
import { cn } from '@nlabs/utils/strings/cn';

// Usage remains the same
const className = cn('base', { active: isActive });
```
