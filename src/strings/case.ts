export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const camelCase = (string: string): string =>
  string.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));

export const kebabCase = (string: string): string =>
  string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const snakeCase = (string: string): string =>
  string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
