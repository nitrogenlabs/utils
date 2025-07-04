# stack-parser

> Lightweight stack trace parser for error debugging

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { parseStack } from '@nlabs/utils/objects';

try {
  // Some code that might throw
  throw new Error('Something went wrong');
} catch (error) {
  const frames = parseStack(error);
  console.log(frames);
  // [
  //   {
  //     fileName: 'app.js',
  //     lineNumber: 10,
  //     columnNumber: 15,
  //     functionName: 'someFunction',
  //     source: '    at someFunction (app.js:10:15)'
  //   }
  // ]
}
```

## API

### parseStack

```ts
parseStack(error: Error): StackFrame[]
```

Parses an Error object's stack trace into structured format.

**Parameters:**
- `error`: Error object with stack property

**Returns:** Array of StackFrame objects

### StackFrame Interface

```ts
interface StackFrame {
  fileName?: string;      // File name where error occurred
  lineNumber?: number;    // Line number in file
  columnNumber?: number;  // Column number in file
  functionName?: string;  // Function name where error occurred
  source?: string;        // Original stack trace line
}
```

## Examples

### Basic Error Parsing

```js
function exampleFunction() {
  throw new Error('Test error');
}

try {
  exampleFunction();
} catch (error) {
  const frames = parseStack(error);
  console.log(frames[0]);
  // {
  //   fileName: 'example.js',
  //   lineNumber: 2,
  //   columnNumber: 9,
  //   functionName: 'exampleFunction',
  //   source: '    at exampleFunction (example.js:2:9)'
  // }
}
```

### Anonymous Functions

```js
const anonymousFn = () => {
  throw new Error('Anonymous error');
};

try {
  anonymousFn();
} catch (error) {
  const frames = parseStack(error);
  console.log(frames[0]);
  // {
  //   fileName: 'app.js',
  //   lineNumber: 3,
  //   columnNumber: 5,
  //   functionName: undefined,
  //   source: '    at app.js:3:5'
  // }
}
```

### Multiple Stack Frames

```js
function outer() {
  return inner();
}

function inner() {
  return deepest();
}

function deepest() {
  throw new Error('Deep error');
}

try {
  outer();
} catch (error) {
  const frames = parseStack(error);
  console.log(frames.length); // 3
  console.log(frames.map(f => f.functionName));
  // ['deepest', 'inner', 'outer']
}
```

## Use Cases

### Error Logging
```js
function logError(error) {
  const frames = parseStack(error);
  const topFrame = frames[0];

  console.error({
    message: error.message,
    file: topFrame?.fileName,
    line: topFrame?.lineNumber,
    function: topFrame?.functionName
  });
}
```

### Debug Information
```js
function getDebugInfo(error) {
  const frames = parseStack(error);
  return {
    error: error.message,
    stack: frames.map(frame => ({
      file: frame.fileName,
      line: frame.lineNumber,
      function: frame.functionName
    }))
  };
}
```

### Error Reporting
```js
function reportError(error) {
  const frames = parseStack(error);
  const relevantFrames = frames.slice(0, 5); // Top 5 frames

  return {
    error: error.message,
    stack: relevantFrames,
    timestamp: new Date().toISOString()
  };
}
```

## Performance

- **Lightweight**: ~1KB vs error-stack-parser's 56KB
- **Fast**: Uses native string operations
- **No Dependencies**: Pure JavaScript implementation
- **Memory Efficient**: Minimal object creation

## TypeScript

Full TypeScript support with proper interfaces:

```ts
import { parseStack, StackFrame } from '@nlabs/utils/objects';

function processError(error: Error): StackFrame[] {
  return parseStack(error);
}
```

## Edge Cases

### Empty Stack
```js
const error = new Error('No stack');
error.stack = undefined;
const frames = parseStack(error); // []
```

### Malformed Stack
```js
const error = new Error('Malformed');
error.stack = 'Invalid stack trace format';
const frames = parseStack(error); // []
```

### Different Stack Formats
The parser handles multiple stack trace formats:
- `functionName (file:line:column)`
- `file:line:column`
- Anonymous functions
- Various whitespace patterns

## Migration from error-stack-parser

```js
// Before (error-stack-parser)
import { parse as parseStack } from 'error-stack-parser';
const frames = parseStack(error);

// After (@nlabs/utils)
import { parseStack } from '@nlabs/utils/objects';
const frames = parseStack(error);
```

## Related

- [clone](./clone.md) - Deep object cloning
- [merge](./merge.md) - Object merging utilities
- [get](./get.md) - Safe property access
- [set](./set.md) - Immutable property assignment