/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const trim = (string: string, chars?: string): string => {
  if(!chars) {
    return string.trim();
  }
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
  return string.replace(regex, '');
};

export const trimStart = (string: string, chars?: string): string => {
  if(!chars) {
    return string.trimStart();
  }
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^[${escaped}]+`, 'g');
  return string.replace(regex, '');
};

export const trimEnd = (string: string, chars?: string): string => {
  if(!chars) {
    return string.trimEnd();
  }
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`[${escaped}]+$`, 'g');
  return string.replace(regex, '');
};
