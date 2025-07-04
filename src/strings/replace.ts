export const replace = (
  string: string,
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: any[]) => string)
): string => string.replace(pattern, replacement as any);
