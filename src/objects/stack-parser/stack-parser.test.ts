import { parseStack } from './stack-parser';

describe('parseStack', () => {
  it('should parse stack trace string', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at Object.<anonymous> (/path/to/file.js:10:15)
    at Module._compile (internal/modules/cjs/loader.js:816:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:827:10)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'Object.<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'Module._compile',
        fileName: 'internal/modules/cjs/loader.js',
        lineNumber: 816,
        columnNumber: 30
      },
      {
        functionName: 'Object.Module._extensions..js',
        fileName: 'internal/modules/cjs/loader.js',
        lineNumber: 827,
        columnNumber: 10
      }
    ]);
  });

    it('should handle empty stack trace', () => {
    const error = new Error('test error');
    error.stack = '';
    const result = parseStack(error);
    expect(result).toEqual([]);
  });

  it('should handle stack trace with no frames', () => {
    const error = new Error('test error');
    error.stack = 'Error: test error';
    const result = parseStack(error);
    expect(result).toEqual([]);
  });

  it('should handle stack trace with missing information', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at Object.<anonymous> (/path/to/file.js)
    at Module._compile (internal/modules/cjs/loader.js:816)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'Object.<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: undefined,
        columnNumber: undefined
      },
      {
        functionName: 'Module._compile',
        fileName: 'internal/modules/cjs/loader.js',
        lineNumber: 816,
        columnNumber: undefined
      }
    ]);
  });

    it('should handle stack trace with anonymous functions', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at /path/to/file.js:10:15
    at /another/path/file.js:20:25`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: '<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: '<anonymous>',
        fileName: '/another/path/file.js',
        lineNumber: 20,
        columnNumber: 25
      }
    ]);
  });

    it('should handle stack trace with eval', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at eval (eval at <anonymous> (/path/to/file.js:10:15), <anonymous>:1:1)
    at Object.<anonymous> (/path/to/file.js:10:15)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'eval',
        fileName: 'eval at <anonymous> (/path/to/file.js:10:15), <anonymous>',
        lineNumber: 1,
        columnNumber: 1
      },
      {
        functionName: 'Object.<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      }
    ]);
  });

  it('should handle stack trace with native functions', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at Array.forEach (native)
    at Object.<anonymous> (/path/to/file.js:10:15)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'Array.forEach',
        fileName: 'native',
        lineNumber: undefined,
        columnNumber: undefined
      },
      {
        functionName: 'Object.<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      }
    ]);
  });

  it('should handle stack trace with async functions', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at async testFunction (/path/to/file.js:10:15)
    at async /path/to/file.js:20:25`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'async testFunction',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'async <anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 20,
        columnNumber: 25
      }
    ]);
  });

  it('should handle stack trace with constructor functions', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at new TestClass (/path/to/file.js:10:15)
    at TestClass.method (/path/to/file.js:20:25)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'new TestClass',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'TestClass.method',
        fileName: '/path/to/file.js',
        lineNumber: 20,
        columnNumber: 25
      }
    ]);
  });

  it('should handle stack trace with promise rejections', () => {
    const error = new Error('UnhandledPromiseRejectionWarning: Unhandled promise rejection');
    error.stack = `UnhandledPromiseRejectionWarning: Unhandled promise rejection
    at process._tickCallback (internal/process/next_tick.js:68:7)
    at process._tickDomainCallback (internal/process/next_tick.js:128:9)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'process._tickCallback',
        fileName: 'internal/process/next_tick.js',
        lineNumber: 68,
        columnNumber: 7
      },
      {
        functionName: 'process._tickDomainCallback',
        fileName: 'internal/process/next_tick.js',
        lineNumber: 128,
        columnNumber: 9
      }
    ]);
  });

  it('should handle stack trace with webpack modules', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at eval (webpack:///./src/file.js?./node_modules/package/index.js:10:15)
    at Object.<anonymous> (webpack:///./src/file.js:20:25)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'eval',
        fileName: 'webpack:///./src/file.js?./node_modules/package/index.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'Object.<anonymous>',
        fileName: 'webpack:///./src/file.js',
        lineNumber: 20,
        columnNumber: 25
      }
    ]);
  });

  it('should handle stack trace with browser paths', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at testFunction (http://localhost:3000/file.js:10:15)
    at HTMLButtonElement.onclick (http://localhost:3000/file.js:20:25)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'testFunction',
        fileName: 'http://localhost:3000/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'HTMLButtonElement.onclick',
        fileName: 'http://localhost:3000/file.js',
        lineNumber: 20,
        columnNumber: 25
      }
    ]);
  });

  it('should handle null and undefined input', () => {
    expect(() => parseStack(null as any)).toThrow();
    expect(() => parseStack(undefined as any)).toThrow();
  });

  it('should handle non-string input', () => {
    expect(parseStack(123 as any)).toEqual([]);
    expect(parseStack({} as any)).toEqual([]);
    expect(parseStack([] as any)).toEqual([]);
  });

  it('should handle stack trace with special characters in function names', () => {
    const error = new Error('test error');
    error.stack = `Error: test error
    at Object.<anonymous> (/path/to/file.js:10:15)
    at Function.prototype.call (/path/to/file.js:20:25)
    at Array.prototype.forEach (/path/to/file.js:30:35)`;

    const result = parseStack(error);
    expect(result).toEqual([
      {
        functionName: 'Object.<anonymous>',
        fileName: '/path/to/file.js',
        lineNumber: 10,
        columnNumber: 15
      },
      {
        functionName: 'Function.prototype.call',
        fileName: '/path/to/file.js',
        lineNumber: 20,
        columnNumber: 25
      },
      {
        functionName: 'Array.prototype.forEach',
        fileName: '/path/to/file.js',
        lineNumber: 30,
        columnNumber: 35
      }
    ]);
  });
});