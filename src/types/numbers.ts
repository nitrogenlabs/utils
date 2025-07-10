/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export interface NumberFormatOptions {
  readonly maxDecimals?: number;
  readonly maxOrder?: number;
  readonly minDecimals?: number;
  readonly minOrder?: number;
  readonly orderSuffixes?: string[];
  readonly style?: string;
  readonly useOrderSuffix?: boolean;
  readonly valueIfNaN?: string;
}