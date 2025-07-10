/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const isFunction = (value: any): value is (...args: unknown[]) => unknown =>
  typeof value === 'function';