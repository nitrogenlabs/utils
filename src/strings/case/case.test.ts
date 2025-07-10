import { camelCase, capitalize, kebabCase, snakeCase } from './case';

describe('Case Utilities', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter and lowercase the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('JavaScript')).toBe('Javascript');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle strings with special characters', () => {
      expect(capitalize('hello-world')).toBe('Hello-world');
      expect(capitalize('user_name')).toBe('User_name');
    });

    it('should handle strings with numbers', () => {
      expect(capitalize('user123')).toBe('User123');
      expect(capitalize('123user')).toBe('123user');
    });
  });

  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
      expect(camelCase('user-profile-settings')).toBe('userProfileSettings');
    });

    it('should convert snake_case to camelCase', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
      expect(camelCase('user_profile_settings')).toBe('userProfileSettings');
    });

    it('should convert space-separated to camelCase', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
      expect(camelCase('user profile settings')).toBe('userProfileSettings');
    });

    it('should handle mixed separators', () => {
      expect(camelCase('hello-world_test space')).toBe('helloWorldTestSpace');
      expect(camelCase('user-profile_settings')).toBe('userProfileSettings');
    });

    it('should handle already camelCase strings', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
      expect(camelCase('userProfile')).toBe('userProfile');
    });

    it('should handle PascalCase strings', () => {
      expect(camelCase('HelloWorld')).toBe('helloWorld');
      expect(camelCase('UserProfile')).toBe('userProfile');
    });

    it('should handle empty string', () => {
      expect(camelCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(camelCase('hello')).toBe('hello');
      expect(camelCase('Hello')).toBe('hello');
    });

    it('should handle strings with numbers', () => {
      expect(camelCase('user-123-profile')).toBe('user123Profile');
      expect(camelCase('123-user-profile')).toBe('123UserProfile');
    });

    it('should handle multiple consecutive separators', () => {
      expect(camelCase('hello--world')).toBe('helloWorld');
      expect(camelCase('hello___world')).toBe('helloWorld');
      expect(camelCase('hello   world')).toBe('helloWorld');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('userProfileSettings')).toBe('user-profile-settings');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world');
      expect(kebabCase('UserProfileSettings')).toBe('user-profile-settings');
    });

    it('should handle already kebab-case strings', () => {
      expect(kebabCase('hello-world')).toBe('hello-world');
      expect(kebabCase('user-profile-settings')).toBe('user-profile-settings');
    });

    it('should handle snake_case strings', () => {
      expect(kebabCase('hello_world')).toBe('hello_world');
      expect(kebabCase('user_profile_settings')).toBe('user_profile_settings');
    });

    it('should handle space-separated strings', () => {
      expect(kebabCase('hello world')).toBe('hello world');
      expect(kebabCase('user profile settings')).toBe('user profile settings');
    });

    it('should handle empty string', () => {
      expect(kebabCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(kebabCase('hello')).toBe('hello');
      expect(kebabCase('Hello')).toBe('hello');
    });

    it('should handle strings with numbers', () => {
      expect(kebabCase('user123Profile')).toBe('user123-profile');
      expect(kebabCase('123UserProfile')).toBe('123-user-profile');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(kebabCase('HTMLParser')).toBe('html-parser');
      expect(kebabCase('URLParser')).toBe('url-parser');
    });
  });

  describe('snakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('userProfileSettings')).toBe('user_profile_settings');
    });

    it('should convert PascalCase to snake_case', () => {
      expect(snakeCase('HelloWorld')).toBe('hello_world');
      expect(snakeCase('UserProfileSettings')).toBe('user_profile_settings');
    });

    it('should handle already snake_case strings', () => {
      expect(snakeCase('hello_world')).toBe('hello_world');
      expect(snakeCase('user_profile_settings')).toBe('user_profile_settings');
    });

    it('should handle kebab-case strings', () => {
      expect(snakeCase('hello-world')).toBe('hello-world');
      expect(snakeCase('user-profile-settings')).toBe('user-profile-settings');
    });

    it('should handle space-separated strings', () => {
      expect(snakeCase('hello world')).toBe('hello world');
      expect(snakeCase('user profile settings')).toBe('user profile settings');
    });

    it('should handle empty string', () => {
      expect(snakeCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(snakeCase('hello')).toBe('hello');
      expect(snakeCase('Hello')).toBe('hello');
    });

    it('should handle strings with numbers', () => {
      expect(snakeCase('user123Profile')).toBe('user123_profile');
      expect(snakeCase('123UserProfile')).toBe('123_user_profile');
    });

    it('should handle consecutive uppercase letters', () => {
      expect(snakeCase('HTMLParser')).toBe('html_parser');
      expect(snakeCase('URLParser')).toBe('url_parser');
    });
  });
});