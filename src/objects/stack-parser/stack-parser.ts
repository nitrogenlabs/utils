/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */

export interface StackFrame {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  functionName?: string;
}

export const parseStack = (error: Error): StackFrame[] => {
  if(!error.stack) {
    return [];
  }

  const lines = error.stack.split('\n');
  const frames: StackFrame[] = [];

  for(const line of lines) {
    if(line.includes('Error:') || line.includes('UnhandledPromiseRejectionWarning:') || line.trim() === '') {
      continue;
    }

    const frame = parseStackLine(line);
    if(frame) {
      frames.push(frame);
    }
  }

  return frames;
};

const parseStackLine = (line: string): StackFrame | null => {
  const cleanLine = line.replace(/^\s*at\s+/, '');
  const frame: StackFrame = {};

  // Handle async anonymous functions: 'async /path/to/file.js:20:25'
  const asyncAnonMatch = cleanLine.match(/^async\s+([^:]+):(\d+):(\d+)$/);
  if(asyncAnonMatch) {
    frame.functionName = 'async <anonymous>';
    frame.fileName = asyncAnonMatch[1]!;
    frame.lineNumber = parseInt(asyncAnonMatch[2]!, 10);
    frame.columnNumber = parseInt(asyncAnonMatch[3]!, 10);
    return frame;
  }

  // Handle anonymous functions (no function name, just file:line:column)
  const anonymousMatch = cleanLine.match(/^([^:]+):(\d+):(\d+)$/);
  if(anonymousMatch) {
    frame.functionName = '<anonymous>';
    frame.fileName = anonymousMatch[1]!;
    frame.lineNumber = parseInt(anonymousMatch[2]!, 10);
    frame.columnNumber = parseInt(anonymousMatch[3]!, 10);
    return frame;
  }

  // Handle native functions
  const nativeMatch = cleanLine.match(/^([^(]+)\s*\(native\)$/);
  if(nativeMatch) {
    frame.functionName = nativeMatch[1]!.trim();
    frame.fileName = 'native';
    return frame;
  }

  // Handle eval functions
  const evalMatch = cleanLine.match(/^eval\s*\(eval at <anonymous> \(([^:]+):(\d+):(\d+)\), <anonymous>:(\d+):(\d+)\)$/);
  if(evalMatch) {
    frame.functionName = 'eval';
    frame.fileName = `eval at <anonymous> (${evalMatch[1]}:${evalMatch[2]}:${evalMatch[3]}), <anonymous>`;
    frame.lineNumber = parseInt(evalMatch[4]!, 10);
    frame.columnNumber = parseInt(evalMatch[5]!, 10);
    return frame;
  }

  // Handle standard function calls with parentheses (including browser paths)
  const funcMatch = cleanLine.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if(funcMatch) {
    frame.functionName = funcMatch[1]!.trim();
    const location = funcMatch[2]!;
    // Browser path: http(s)://...:line:column
    const browserLocMatch = location.match(/^(.*):(\d+):(\d+)$/);
    if(browserLocMatch) {
      frame.fileName = browserLocMatch[1]!;
      frame.lineNumber = parseInt(browserLocMatch[2]!, 10);
      frame.columnNumber = parseInt(browserLocMatch[3]!, 10);
      return frame;
    }
    // Parse location
    const locationMatch = location.match(/^([^:]+):(\d+):(\d+)$/);
    if(locationMatch) {
      frame.fileName = locationMatch[1]!;
      frame.lineNumber = parseInt(locationMatch[2]!, 10);
      frame.columnNumber = parseInt(locationMatch[3]!, 10);
      return frame;
    } else {
      // Handle cases without column number
      const altLocationMatch = location.match(/^([^:]+):(\d+)$/);
      if(altLocationMatch) {
        frame.fileName = altLocationMatch[1]!;
        frame.lineNumber = parseInt(altLocationMatch[2]!, 10);
      } else {
        frame.fileName = location;
      }
    }
    return frame;
  }

  // Handle webpack paths
  const webpackMatch = cleanLine.match(/^([^(]+)\s*\(webpack:\/\/([^)]+)\)$/);
  if(webpackMatch) {
    frame.functionName = webpackMatch[1]!.trim();
    const location = webpackMatch[2]!;
    const locationMatch = location.match(/^([^:]+):(\d+):(\d+)$/);
    if(locationMatch) {
      frame.fileName = `webpack:///${locationMatch[1]}`;
      frame.lineNumber = parseInt(locationMatch[2]!, 10);
      frame.columnNumber = parseInt(locationMatch[3]!, 10);
    }
    return frame;
  }

  return null;
};