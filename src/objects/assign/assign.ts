/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const assign = <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T => Object.assign(target, ...sources);