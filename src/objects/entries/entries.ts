/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const entries = <T>(obj: Record<string, T>): [string, T][] =>
  Object.entries(obj);
