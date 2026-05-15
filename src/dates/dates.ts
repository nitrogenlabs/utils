export type DateValue = Date | number | string | null | undefined;

export type DateDuration = {
  readonly days?: number;
  readonly hours?: number;
  readonly minutes?: number;
  readonly months?: number;
  readonly seconds?: number;
  readonly years?: number;
};

const DATE_INPUT_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const toDate = (value: DateValue = new Date()): Date => {
  if(value instanceof Date) {
    return new Date(value.getTime());
  }

  if(typeof value === 'number') {
    return new Date(value);
  }

  if(typeof value === 'string') {
    const dateInputMatch = value.match(DATE_INPUT_PATTERN);

    if(dateInputMatch) {
      const [, year, month, day] = dateInputMatch;
      return new Date(Number(year), Number(month) - 1, Number(day));
    }

    return new Date(value);
  }

  return new Date();
};

export const isValidDate = (value: DateValue): boolean => !Number.isNaN(toDate(value).getTime());

export const dateToMillis = (value: DateValue): number => toDate(value).getTime();

export const addDate = (value: DateValue, duration: DateDuration = {}): Date => {
  const date = toDate(value);

  if(duration.years) {
    date.setFullYear(date.getFullYear() + duration.years);
  }

  if(duration.months) {
    date.setMonth(date.getMonth() + duration.months);
  }

  if(duration.days) {
    date.setDate(date.getDate() + duration.days);
  }

  if(duration.hours) {
    date.setHours(date.getHours() + duration.hours);
  }

  if(duration.minutes) {
    date.setMinutes(date.getMinutes() + duration.minutes);
  }

  if(duration.seconds) {
    date.setSeconds(date.getSeconds() + duration.seconds);
  }

  return date;
};

export const startOfDay = (value: DateValue): Date => {
  const date = toDate(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const endOfDay = (value: DateValue): Date => {
  const date = toDate(value);
  date.setHours(23, 59, 59, 999);
  return date;
};

export const formatDateInput = (value: DateValue): string => {
  const date = toDate(value);

  if(!isValidDate(date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDate = (
  value: DateValue,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'en-US'
): string => {
  const date = toDate(value);

  if(!isValidDate(date)) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatMonthName = (month: number, locale = 'en-US'): string =>
  formatDate(new Date(2000, month - 1, 1), {month: 'long'}, locale);

export const formatTimestampDate = (value: DateValue, locale = 'en-US'): string => {
  const date = toDate(value);

  if(!isValidDate(date)) {
    return '';
  }

  if(isSameDay(date)) {
    return formatDate(date, {hour: 'numeric', minute: '2-digit'}, locale);
  }

  return formatDate(date, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'numeric',
    year: '2-digit'
  }, locale);
};

export const formatRelativeDate = (value: DateValue, locale = 'en-US'): string => {
  const date = toDate(value);

  if(!isValidDate(date)) {
    return '';
  }

  const minutesFromNow = diffMinutes(date, new Date());

  if(Math.abs(minutesFromNow) < 60) {
    return new Intl.RelativeTimeFormat(locale, {numeric: 'auto'}).format(Math.round(minutesFromNow), 'minute');
  }

  return formatTimestampDate(date, locale);
};

export const getRelativeDateRefreshMs = (value: DateValue): number => {
  const minutesFromNow = Math.abs(diffMinutes(new Date(), value));

  if(minutesFromNow < 60) {
    return 300_000;
  }

  return 0;
};

export const diffHours = (later: DateValue, earlier: DateValue): number =>
  (dateToMillis(later) - dateToMillis(earlier)) / (60 * 60 * 1000);

export const diffMinutes = (later: DateValue, earlier: DateValue): number =>
  (dateToMillis(later) - dateToMillis(earlier)) / (60 * 1000);

export const isSameDay = (left: DateValue, right: DateValue = new Date()): boolean => {
  const leftDate = toDate(left);
  const rightDate = toDate(right);

  return leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate();
};
