/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export const isNumber = (value: any): value is number =>
  typeof value === 'number' && !isNaN(value);