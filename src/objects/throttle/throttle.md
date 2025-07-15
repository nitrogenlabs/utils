# Throttle

Creates a throttled function that only invokes the provided function at most once per every `wait` milliseconds.

## Import

```typescript
import { throttle } from '@nlabs/utils/objects/throttle';
```

## Usage

```typescript
// Basic usage - throttle function calls to once every 100ms
const throttled = throttle(updatePosition, 100);
window.addEventListener('scroll', throttled);

// With options
const throttled = throttle(updatePosition, 100, {
  leading: true,   // Invoke on the leading edge (default: true)
  trailing: true   // Invoke on the trailing edge (default: true)
});
```

## API

### `throttle(func, wait, options?)`

Creates a throttled function.

#### Parameters

- `func` (`(...args: any[]) => any`) - The function to throttle
- `wait` (`number`) - The number of milliseconds to throttle invocations to
- `options` (`ThrottleOptions`, optional) - Configuration options

#### Returns

Returns a throttled function with additional methods:

- `cancel()` - Cancels delayed function invocations
- `flush()` - Immediately invokes any pending function calls

### `ThrottleOptions`

```typescript
interface ThrottleOptions {
  /** Whether to invoke on the leading edge of the timeout (default: true) */
  readonly leading?: boolean;
  /** Whether to invoke on the trailing edge of the timeout (default: true) */
  readonly trailing?: boolean;
}
```

## Examples

### Basic Throttling

```typescript
const expensiveOperation = (data: string) => {
  console.log('Processing:', data);
  // Expensive operation here
};

const throttledOperation = throttle(expensiveOperation, 1000);

// Multiple rapid calls will be throttled
throttledOperation('data1'); // Executes immediately
throttledOperation('data2'); // Ignored
throttledOperation('data3'); // Ignored
// After 1 second, the last call will execute
```

### Leading Edge Only

```typescript
const throttled = throttle(updateUI, 500, { leading: true, trailing: false });

// Only executes on the leading edge
throttled(); // Executes immediately
throttled(); // Ignored
throttled(); // Ignored
// No trailing execution
```

### Trailing Edge Only

```typescript
const throttled = throttle(updateUI, 500, { leading: false, trailing: true });

// Only executes on the trailing edge
throttled(); // Doesn't execute immediately
throttled(); // Ignored
throttled(); // Ignored
// After 500ms, the last call executes
```

### Canceling and Flushing

```typescript
const throttled = throttle(expensiveOperation, 1000);

throttled('data1');

// Cancel any pending executions
throttled.cancel();

// Or flush to execute immediately
throttled.flush();
```

### Event Handler

```typescript
const handleResize = throttle(() => {
  console.log('Window resized');
  // Update layout
}, 250);

window.addEventListener('resize', handleResize);
```

## Differences from Lodash

This implementation is optimized for modern JavaScript/TypeScript and includes:

- Modern ES6+ features
- TypeScript support with proper typing
- Simplified implementation while maintaining the same behavior
- Better performance with optimized timer handling
- Cleaner code structure

## Performance Notes

- Uses `Date.now()` for precise timing
- Efficient timer management with proper cleanup
- Minimal memory footprint
- Optimized for high-frequency events like scroll and resize
