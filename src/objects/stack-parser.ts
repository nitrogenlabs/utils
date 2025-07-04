/**
 * Lightweight stack parser utility
 * Replaces error-stack-parser dependency for debug mode stack traces
 */

export interface StackFrame {
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  functionName?: string;
  source?: string;
}

/**
 * Parse error stack trace into structured format
 * Much smaller than error-stack-parser (56KB vs ~1KB)
 */
export const parseStack = (error: Error): StackFrame[] => {
  if (!error.stack) {
    return [];
  }

  const lines = error.stack.split('\n');
  const frames: StackFrame[] = [];

  for (const line of lines) {
    // Skip the first line (error message)
    if (line.includes('Error:') || line.trim() === '') {
      continue;
    }

    const frame = parseStackLine(line);
    if (frame) {
      frames.push(frame);
    }
  }

  return frames;
};

/**
 * Parse a single stack trace line
 */
const parseStackLine = (line: string): StackFrame | null => {
  // Remove "at " prefix
  const cleanLine = line.replace(/^\s*at\s+/, '');

  // Handle different stack trace formats
  // Format 1: functionName (fileName:line:column)
  // Format 2: fileName:line:column
  // Format 3: anonymous function

  const frame: StackFrame = {};

  // Try to extract function name
  const funcMatch = cleanLine.match(/^([^(]+)\s*\(/);
  if (funcMatch) {
    frame.functionName = funcMatch[1].trim();
  }

  // Try to extract file location
  const locationMatch = cleanLine.match(/\(?([^:]+):(\d+):(\d+)\)?/);
  if (locationMatch) {
    frame.fileName = locationMatch[1];
    frame.lineNumber = parseInt(locationMatch[2], 10);
    frame.columnNumber = parseInt(locationMatch[3], 10);
  } else {
    // Try alternative format without parentheses
    const altMatch = cleanLine.match(/^([^:]+):(\d+):(\d+)/);
    if (altMatch) {
      frame.fileName = altMatch[1];
      frame.lineNumber = parseInt(altMatch[2], 10);
      frame.columnNumber = parseInt(altMatch[3], 10);
    }
  }

  // Set source to original line for debugging
  frame.source = line.trim();

  return frame;
};