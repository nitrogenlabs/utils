import {isEmpty} from 'lodash/isEmpty';
import {merge} from 'lodash/merge';

import {InputSelectGetType, PatternParseType} from '../types/formatters';

declare global {
  interface Window {
    clipboardData: any;
  }

  interface Document {
    selection: any;
  }
}

class PatternMatcher {
  matchers = [];
  patterns = [];

  constructor(pattern) {
    // Methods
    this.parse = this.parse.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.parseMatcher = this.parseMatcher.bind(this);
    this.getPattern = this.getPattern.bind(this);

    pattern.map((p) => {
      const matcherStr = Object.keys(p)[0];
      const patternStr = p[matcherStr];
      const parsedPattern = this.parse(patternStr);
      const regExpMatcher = this.parseMatcher(matcherStr);
      this.matchers.push(regExpMatcher);
      this.patterns.push(parsedPattern);
    });
  }

  getMatches(pattern): any[] {
    const regexp = new RegExp('{{([^}]+)}}', 'g');
    const matches = [];
    let match = regexp.exec(pattern);

    while(match) {
      match = regexp.exec(pattern);
      matches.push(match);
    }

    return matches;
  }

  parse(pattern): PatternParseType {
    const info: PatternParseType = {
      chars: {},
      inputs: {}
    };

    const DELIM_SIZE: number = 4;
    const matches = this.getMatches(pattern);
    let mCount: number = 0;
    let iCount: number = 0;
    let i = 0, l;

    const processMatch = (val) => {
      for(let j = 0, h = val.length; j < h; j++) {
        info.inputs[iCount] = val.charAt(j);
        iCount++;
      }

      mCount++;
      i += val.length + DELIM_SIZE - 1;
    };

    for(l = pattern.length; i < l; i++) {
      if(mCount < matches.length && i === matches[mCount].index) {
        processMatch(matches[mCount][1]);
      } else {
        info.chars[i - mCount * DELIM_SIZE] = pattern.charAt(i);
      }
    }

    info.mLength = i - mCount * DELIM_SIZE;

    return info;
  }

  parseMatcher(matcher): RegExp {
    if(matcher === '*') {
      return /.*/;
    }

    return new RegExp(matcher);
  }

  getPattern(input): any[] {
    let idx;

    this.matchers.map((m, i) => {
      if(m.test(input)) {
        idx = i;
      }
    });

    return idx === undefined ? null : this.patterns[idx];
  }
}

export default class Formatter {
  el;
  chars = [];
  delta;
  focus = 0;
  hldrs = {};
  inputs = [];
  inputRegs = {
    '*': /[A-Za-z0-9]/,
    '9': /[0-9]/,
    'a': /[A-Za-z]/
  };
  mLength;
  newPos: number = 0;
  opts;
  patternMatcher;
  sel;
  val;

  constructor(el, opts) {
    const defaults = {
      persistent: false,
      placeholder: ' ',
      repeat: false
    };

    this.el = el;

    if(!this.el) {
      throw new TypeError('Must provide an existing element');
    }

    this.opts = merge(defaults, opts);

    if(!isEmpty(this.opts.pattern)) {
      this.opts.patterns = this.specFromSinglePattern(this.opts.pattern);
      delete this.opts.pattern;
    } else {
      throw new TypeError('Must provide a pattern or array of patterns');
    }

    this.patternMatcher = new PatternMatcher(this.opts.patterns);

    // Update pattern with initial value
    this.updatePattern();

    // Methods
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.removeFormatChars = this.removeFormatChars.bind(this);
    this.addFormatChars = this.addFormatChars.bind(this);
    this.formatValue = this.formatValue.bind(this);
    this.processKey = this.processKey.bind(this);
    this.inputSelGet = this.inputSelGet.bind(this);
    this.inputSelSet = this.inputSelSet.bind(this);
    this.addInputType = this.addInputType.bind(this);
    this.updatePattern = this.updatePattern.bind(this);
    this.resetPattern = this.resetPattern.bind(this);
    this.onNextPos = this.onNextPos.bind(this);
    this.removeChars = this.removeChars.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.addChars = this.addChars.bind(this);
    this.addChar = this.addChar.bind(this);
    this.specFromSinglePattern = this.specFromSinglePattern.bind(this);
    this.isDelKeyPress = this.isDelKeyPress.bind(this);
    this.isDelKeyDown = this.isDelKeyDown.bind(this);
    this.getMatchingKey = this.getMatchingKey.bind(this);
    this.isSpecialKeyPress = this.isSpecialKeyPress.bind(this);
    this.isBetween = this.isBetween.bind(this);
    this.getClip = this.getClip.bind(this);
    this.isModifier = this.isModifier.bind(this);

    // Add Listeners
    this.el.addEventListener('keydown', (e) => this.onKeyDown(e));
    this.el.addEventListener('keypress', (e) => this.onKeyPress(e));
    this.el.addEventListener('paste', (e) => this.onPaste(e));

    // Persistence
    if(this.opts.persistent) {
      // Format on start
      this.processKey('', false);
      this.el.blur();

      // Add Listeners
      this.el.addEventListener('focus', () => this.onFocus());
      this.el.addEventListener('click', () => this.onFocus());
      this.el.addEventListener('touchstart', () => this.onFocus());
    }
  }

  inputSelGet(el): InputSelectGetType {
    // If normal browser return with result
    if(typeof el.selectionStart === 'number') {
      return {
        begin: el.selectionStart,
        end: el.selectionEnd
      };
    }

    // Uh-Oh. We must be IE. Fun with TextRange!!
    const range = document.selection.createRange();
    // Determine if there is a selection
    if(range && range.parentElement() === el) {
      const inputRange = el.createTextRange(), endRange = el.createTextRange(), length = el.value.length;
      // Create a working TextRange for the input selection
      inputRange.moveToBookmark(range.getBookmark());
      // Move endRange begin pos to end pos (hence endRange)
      endRange.collapse(false);
      // If we are at the very end of the input, begin and end
      // must both be the length of the el.value
      if(inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
        return {
          begin: length,
          end: length
        };
      }
      // Note: moveStart usually returns the units moved, which
      // one may think is -length, however, it will stop when it
      // gets to the begin of the range, thus giving us the
      // negative value of the pos.
      return {
        begin: -inputRange.moveStart('character', -length),
        end: -inputRange.moveEnd('character', -length)
      };
    }
    // Return 0's on no selection data
    return {
      begin: 0,
      end: 0
    };
  }

  inputSelSet(el, pos): void {
    // Normalize pos
    if(typeof pos !== 'object') {
      pos = {
        begin: pos,
        end: pos
      };
    }

    // If normal browser
    if(el.setSelectionRange) {
      el.focus();
      el.setSelectionRange(pos.begin, pos.end);
    } else if(el.createTextRange) {
      const range = el.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos.end);
      range.moveStart('character', pos.begin);
      range.select();
    }
  }

  addInputType(chr, reg): void {
    this.inputRegs[chr] = reg;
  }

  resetPattern(str): void {
    // Update opts to hold new pattern
    this.opts.patterns = str ? this.specFromSinglePattern(str) : this.opts.patterns;

    // Get current state
    this.sel = this.inputSelGet(this.el);
    this.val = this.el.value;

    // Init values
    this.delta = 0;

    // Remove all formatted chars from val
    this.removeFormatChars();
    this.patternMatcher = new PatternMatcher(this.opts.patterns);

    // Update pattern
    const {mLength, chars, inputs} = this.patternMatcher.getPattern(this.val);
    this.mLength = mLength;
    this.chars = chars;
    this.inputs = inputs;

    // Format on start
    this.processKey('', false, true);
  }

  updatePattern(): void {
    // Determine appropriate pattern
    const newPattern = this.patternMatcher.getPattern(this.val);

    // Only update the pattern if there is an appropriate pattern for the value.
    // Otherwise, leave the current pattern (and likely delete the latest character.)
    if(newPattern) {
      // Get info about the given pattern
      this.mLength = newPattern.mLength;
      this.chars = newPattern.chars;
      this.inputs = newPattern.inputs;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    // The first thing we need is the character code
    const keyCode: number = event.which || event.keyCode;

    // If delete key
    if(keyCode && this.isDelKeyDown(event.which, event.keyCode)) {
      // Process the keyCode and prevent default
      this.processKey(null, keyCode);
      return event.preventDefault();
    }
  }

  onKeyPress(event): void {
    // The first thing we need is the character code
    // Mozilla will trigger on special keys and assign the the value 0
    // We want to use that 0 rather than the keyCode it assigns.
    const keyCode: number = event.which || event.keyCode;
    const isSpecial: boolean = this.isSpecialKeyPress(event.which, event.keyCode);

    // Process the keyCode and prevent default
    if(!this.isDelKeyPress(event.which, event.keyCode) && !isSpecial && !this.isModifier(event)) {
      this.processKey(String.fromCharCode(keyCode), false);
      return event.preventDefault();
    }
  }

  onPaste(e): void {
    // Process the clipboard paste and prevent default
    this.processKey(this.getClip(e), false);
    return e.preventDefault();
  }

  onFocus(): void {
    // Wrapped in timeout so that we can grab input selection
    setTimeout(() => {
      // Grab selection
      const selection = this.inputSelGet(this.el);
      // Char check
      const isAfterStart = selection.end > this.focus, isFirstChar = selection.end === 0;
      // If clicked in front of start, refocus to start
      if(isAfterStart || isFirstChar) {
        this.inputSelSet(this.el, this.focus);
      }
    }, 0);
  }

  processKey(chars, delKey, ignoreCaret?): boolean {
    this.sel = this.inputSelGet(this.el);
    this.val = this.el.value;
    this.delta = 0;

    if(this.sel.begin !== this.sel.end) {
      this.delta = -1 * Math.abs(this.sel.begin - this.sel.end);
      this.val = this.removeChars(this.val, this.sel.begin, this.sel.end);
    } else if(delKey && delKey === 46) {
      this.onDelete();
    } else if(delKey && this.sel.begin - 1 >= 0) {
      this.val = this.removeChars(this.val, this.sel.end - 1, this.sel.end);
      this.delta -= 1;
    } else if(delKey) {
      return true;
    }

    if(!delKey) {
      // Add char at position and increment delta
      this.val = this.addChars(this.val, chars, this.sel.begin);
      this.delta += chars.length;
    }

    this.formatValue(ignoreCaret);
    return false;
  }

  onDelete(): void {
    // Adjust focus to make sure its not on a formatted char
    while(this.chars[this.sel.begin]) {
      this.onNextPos();
    }

    // As long as we are not at the end
    if(this.sel.begin < this.val.length) {
      // We will simulate a delete by moving the caret to the next char
      // and then deleting
      this.onNextPos();
      this.val = this.removeChars(this.val, this.sel.end - 1, this.sel.end);
      this.delta = -1;
    }
  }

  onNextPos(): void {
    this.sel.end++;
    this.sel.begin++;
  }

  formatValue(ignoreCaret): void {
    // Set caret pos
    this.newPos = this.sel.end + this.delta;

    // Remove all formatted chars from val
    this.removeFormatChars();

    // Switch to first matching pattern based on val
    this.updatePattern();

    // Validate inputs
    this.validateInputs();

    // Add formatted characters
    this.addFormatChars();

    // Set value and adhere to maxLength
    this.el.value = this.val.substr(0, this.mLength);

    // Send out change event
    const e = new Event('input', {bubbles: true});
    this.el.dispatchEvent(e);

    // Set new caret position
    if(typeof ignoreCaret === 'undefined' || ignoreCaret === false) {
      this.inputSelSet(this.el, this.newPos);
    }
  }

  removeFormatChars(): void {
    if(this.sel.end > this.focus) {
      this.delta += this.sel.end - this.focus;
    }

    let shift = 0;

    for(let i = 0, l = this.mLength; i <= l; i++) {
      // Get transformed position
      const curChar = this.chars[i];
      const curHldr = this.hldrs[i];
      let pos = i + shift;

      // If after selection we need to account for delta
      pos = i >= this.sel.begin ? pos + this.delta : pos;
      const val = this.val.charAt(pos);

      // Remove char and account for shift
      if(curChar && curChar === val || curHldr && curHldr === val) {
        this.val = this.removeChars(this.val, pos, pos + 1);
        shift--;
      }
    }

    // All hldrs should be removed now
    this.hldrs = {};
    // Set focus to last character
    this.focus = this.val.length;
  }

  removeChars(str: string, start: number, end: number): string {
    return str.substr(0, start) + str.substr(end, str.length);
  }

  validateInputs(): void {
    // Loop over each char and validate
    for(let i = 0, l = this.val.length; i < l; i++) {
      // Get char input type
      const inputType = this.inputs[i];

      // Checks
      const isBadType = !this.inputRegs[inputType];
      const isInvalid = !isBadType && !this.inputRegs[inputType].test(this.val.charAt(i));
      const inBounds = this.inputs[i];

      // Remove if incorrect and inbounds
      if((isBadType || isInvalid) && inBounds) {
        this.val = this.removeChars(this.val, i, i + 1);
        this.newPos--;
        this.delta--;
        i--;
      }
    }
  }

  addFormatChars(): void {
    if(this.opts.persistent) {
      this.mLength.forEach((item, index: number) => {
        if(!this.val.charAt(index)) {
          this.val = this.addChars(this.val, this.opts.placeholder, index);
          this.hldrs[index] = this.opts.placeholder;
        }

        this.addChar(index);
      });

      while(this.chars[this.focus]) {
        this.focus++;
      }
    } else {
      this.val.forEach((item, index: number) => {
        if(this.delta <= 0 && index === this.focus) {
          return true;
        }

        this.addChar(index);
        return false;
      });
    }
  }

  addChars(str: string, chars: string, pos: number): string {
    return str.substr(0, pos) + chars + str.substr(pos, str.length);
  }

  addChar(position: number): boolean {
    // If char exists at position
    const chr = this.chars[position];

    if(!chr) {
      return true;
    }

    // If chars are added in between the old pos and new pos
    // we need to increment pos and delta
    if(this.isBetween(position, [this.sel.begin - 1, this.newPos + 1])) {
      this.newPos++;
      this.delta++;
    }

    // If character added before focus, incr
    if(position <= this.focus) {
      this.focus++;
    }

    // Updateholder
    if(this.hldrs[position]) {
      delete this.hldrs[position];
      this.hldrs[position + 1] = this.opts.placeholder;
    }

    // Update value
    this.val = this.addChars(this.val, chr, position);

    return false;
  }

  specFromSinglePattern(patternStr: string): object[] {
    return [{'*': patternStr}];
  }

  isDelKeyPress(which: number, keyCode: number): boolean {
    const keys = {
      backspace: {
        keyCode: 8,
        shiftKey: false,
        which: 8
      },
      delete: {
        keyCode: 46,
        which: 0
      }
    };

    return this.getMatchingKey(which, keyCode, keys);
  }

  isDelKeyDown(which: number, keyCode: number): boolean {
    const keys = {
      backspace: {
        keyCode: 8,
        which: 8
      },
      delete: {
        keyCode: 46,
        which: 46
      }
    };

    return this.getMatchingKey(which, keyCode, keys);
  }

  getMatchingKey(which: number, keyCode: number, keys?): boolean {
    // Loop over and return if matched.
    return keys.some((key: KeyboardEvent) => which === key.which && keyCode === key.keyCode);
  }

  isSpecialKeyPress(which: number, keyCode: number): boolean {
    const keys = {
      F5: {keyCode: 116, which: 116},
      downarrow: {keyCode: 40, which: 0},
      end: {keyCode: 35, which: 0},
      enter: {keyCode: 13, which: 13},
      home: {keyCode: 36, which: 0},
      leftarrow: {keyCode: 37, which: 0},
      rightarrow: {keyCode: 39, which: 0},
      tab: {keyCode: 9, which: 0},
      uparrow: {keyCode: 38, which: 0}
    };

    return this.getMatchingKey(which, keyCode, keys);
  }

  isBetween(num: number, bounds): boolean {
    bounds.sort((a, b) => {
      return a - b;
    });

    return num > bounds[0] && num < bounds[1];
  }

  getClip(e): any {
    if(e.clipboardData) {
      return e.clipboardData.getData('Text');
    }

    if(window.clipboardData) {
      return window.clipboardData.getData('Text');
    }
  }

  isModifier(e): number {
    return e.ctrlKey || e.altKey || e.metaKey;
  }
}
