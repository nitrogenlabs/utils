import {
  addDate,
  dateToMillis,
  diffHours,
  diffMinutes,
  endOfDay,
  formatDate,
  formatDateInput,
  formatMonthName,
  formatRelativeDate,
  formatTimestampDate,
  getRelativeDateRefreshMs,
  isSameDay,
  isValidDate,
  startOfDay,
  toDate
} from './dates';

describe('dates', () => {
  it('parses date input strings as local dates', () => {
    const date = toDate('2026-05-15');

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(4);
    expect(date.getDate()).toBe(15);
  });

  it('formats date input values', () => {
    expect(formatDateInput(new Date(2026, 4, 5))).toBe('2026-05-05');
  });

  it('formats month names', () => {
    expect(formatMonthName(5)).toBe('May');
  });

  it('adds date durations', () => {
    expect(formatDateInput(addDate('2026-05-15', {years: -18}))).toBe('2008-05-15');
  });

  it('returns day boundaries', () => {
    expect(startOfDay('2026-05-15').getHours()).toBe(0);
    expect(endOfDay('2026-05-15').getHours()).toBe(23);
  });

  it('formats dates with Intl options', () => {
    expect(formatDate(new Date(2026, 4, 15), {month: 'long', year: 'numeric'})).toBe('May 2026');
  });

  it('formats timestamps and relative dates', () => {
    const now = new Date();
    const thirtyMinutesAgo = addDate(now, {minutes: -30});
    const twoHoursAgo = addDate(now, {hours: -2});

    expect(formatTimestampDate(now)).toContain(':');
    expect(formatRelativeDate(thirtyMinutesAgo)).toContain('minute');
    expect(formatRelativeDate(twoHoursAgo)).toBe(formatTimestampDate(twoHoursAgo));
    expect(getRelativeDateRefreshMs(thirtyMinutesAgo)).toBe(300_000);
    expect(getRelativeDateRefreshMs(twoHoursAgo)).toBe(0);
  });

  it('compares and diffs dates', () => {
    expect(isValidDate('2026-05-15')).toBe(true);
    expect(dateToMillis('invalid')).toBeNaN();
    expect(diffHours('2026-05-15T02:00:00', '2026-05-15T00:00:00')).toBe(2);
    expect(diffMinutes('2026-05-15T00:15:00', '2026-05-15T00:00:00')).toBe(15);
    expect(isSameDay('2026-05-15T02:00:00', '2026-05-15T22:00:00')).toBe(true);
  });
});
