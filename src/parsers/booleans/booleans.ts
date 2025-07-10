/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const parseBoolean = (bool: string | boolean| null | undefined, strict: boolean = false): boolean | null | undefined => {
  if(strict && bool === null) {
    return null;
  } else if(strict && bool === undefined) {
    return undefined;
  }

  // Handle string values with case-insensitive comparison
  if (typeof bool === 'string') {
    const trimmed = bool.trim().toLowerCase();
    return trimmed === 'false' ? false : !!bool;
  }

  return !!bool;
};