import { words } from './words';

describe('words', () => {
  it('should split a simple string into words', () => {
    expect(words('hello world')).toEqual(['hello', 'world']);
  });

  it('should handle camelCase strings', () => {
    expect(words('helloWorld')).toEqual(['hello', 'World']);
    expect(words('helloWorldTest')).toEqual(['hello', 'World', 'Test']);
    expect(words('HelloWorld')).toEqual(['Hello', 'World']);
  });

  it('should handle kebab-case strings', () => {
    expect(words('hello-world')).toEqual(['hello', 'world']);
    expect(words('hello-world-test')).toEqual(['hello', 'world', 'test']);
  });

  it('should handle snake_case strings', () => {
    expect(words('hello_world')).toEqual(['hello', 'world']);
    expect(words('hello_world_test')).toEqual(['hello', 'world', 'test']);
  });

  it('should handle mixed case strings', () => {
    expect(words('hello-world_test')).toEqual(['hello', 'world', 'test']);
    expect(words('helloWorld_test')).toEqual(['hello', 'World', 'test']);
  });

  it('should handle strings with numbers', () => {
    expect(words('hello123world')).toEqual(['hello', '123', 'world']);
    expect(words('hello123')).toEqual(['hello', '123']);
    expect(words('123hello')).toEqual(['123', 'hello']);
  });

  it('should handle strings with special characters', () => {
    expect(words('fred, barney, & pebbles')).toEqual(['fred', 'barney', 'pebbles']);
    expect(words('hello@world.com')).toEqual(['hello', 'world', 'com']);
  });

  it('should handle empty string', () => {
    expect(words('')).toEqual([]);
  });

  it('should handle whitespace-only strings', () => {
    expect(words('   ')).toEqual([]);
    expect(words('\t\n')).toEqual([]);
  });

  it('should handle single word', () => {
    expect(words('hello')).toEqual(['hello']);
    expect(words('Hello')).toEqual(['Hello']);
  });

  it('should handle strings with multiple spaces', () => {
    expect(words('hello   world')).toEqual(['hello', 'world']);
    expect(words('  hello  world  ')).toEqual(['hello', 'world']);
  });

  it('should handle custom string pattern', () => {
    expect(words('fred, barney, & pebbles', '[^, ]+')).toEqual(['fred', 'barney', '&', 'pebbles']);
  });

  it('should handle custom RegExp pattern', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toEqual(['fred', 'barney', '&', 'pebbles']);
    expect(words('hello123world', /\d+/g)).toEqual(['123']);
  });

  it('should handle complex camelCase scenarios', () => {
    expect(words('camelCase')).toEqual(['camel', 'Case']);
    expect(words('PascalCase')).toEqual(['Pascal', 'Case']);
    expect(words('CONSTANT_CASE')).toEqual(['CONSTANT', 'CASE']);
    expect(words('snake_case')).toEqual(['snake', 'case']);
    expect(words('kebab-case')).toEqual(['kebab', 'case']);
  });

  it('should handle strings with underscores and hyphens', () => {
    expect(words('hello_world-test')).toEqual(['hello', 'world', 'test']);
    expect(words('hello-world_test')).toEqual(['hello', 'world', 'test']);
  });

  it('should handle strings with dots', () => {
    expect(words('hello.world')).toEqual(['hello', 'world']);
    expect(words('hello.world.test')).toEqual(['hello', 'world', 'test']);
  });

  it('should handle strings with apostrophes', () => {
    expect(words("don't stop")).toEqual(["don't", 'stop']);
    expect(words("it's working")).toEqual(["it's", 'working']);
  });

  it('should handle unicode characters', () => {
    expect(words('café résumé')).toEqual(['café', 'résumé']);
    expect(words('привет мир')).toEqual(['привет', 'мир']);
  });

  it('should handle mixed separators', () => {
    expect(words('hello_world-test.com')).toEqual(['hello', 'world', 'test', 'com']);
    expect(words('helloWorld_test-case')).toEqual(['hello', 'World', 'test', 'case']);
  });
});