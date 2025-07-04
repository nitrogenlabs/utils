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