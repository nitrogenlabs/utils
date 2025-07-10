/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
export interface PatternParseType {
  readonly chars: { [key: number]: string };
  readonly inputs: { [key: number]: string };
  mLength?: number;
}

export interface InputSelectGetType {
  begin: number;
  end: number;
}
