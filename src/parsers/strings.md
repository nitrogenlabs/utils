# String Parsers

> String validation, parsing, and transformation utilities

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import {
  parseEmail,
  parsePhone,
  parseUsername,
  createHash,
  parseMentions,
  parseTags
} from '@nlabs/utils/parsers';

parseEmail('user@example.com'); // 'user@example.com'
parsePhone('+1-555-123-4567'); // '+15551234567'
parseUsername('John_Doe123'); // 'johndoe123'
createHash('password', 'salt'); // 'a1b2c3d4e5f6...'
parseMentions('Hello @john and @jane!'); // ['@john', '@jane']
parseTags('Check out #javascript and #typescript!'); // ['#javascript', '#typescript']
```

## Functions

### parseEmail

Validate and parse email addresses.

```ts
parseEmail(email: string): string
```

**Examples:**
```js
parseEmail('user@example.com'); // 'user@example.com'
parseEmail('USER@EXAMPLE.COM'); // 'user@example.com'
parseEmail('invalid-email'); // ''
parseEmail(''); // ''
```

### parsePhone

Parse and format phone numbers using Google's libphonenumber.

```ts
parsePhone(
  phoneNumber: string,
  countryCode: string = 'US'
): string
```

**Examples:**
```js
parsePhone('+1-555-123-4567'); // '+15551234567'
parsePhone('555-123-4567', 'US'); // '+15551234567'
parsePhone('invalid-phone'); // ''
```

### parseUsername

Parse and validate usernames (alphanumeric, lowercase, max 32 chars).

```ts
parseUsername(username: string): string
```

**Examples:**
```js
parseUsername('John_Doe123'); // 'johndoe123'
parseUsername('user@name'); // 'username'
parseUsername(''); // ''
```

### parsePassword

Parse and validate passwords (trimmed, max 32 chars).

```ts
parsePassword(password: string): string
```

**Examples:**
```js
parsePassword('myPassword123'); // 'myPassword123'
parsePassword('  password  '); // 'password'
parsePassword(''); // ''
```

### parseId

Parse alphanumeric IDs (word characters only, max 32 chars).

```ts
parseId(id: string): string
```

**Examples:**
```js
parseId('user_123'); // 'user_123'
parseId('user@123'); // 'user123'
parseId(''); // ''
```

### parseArangoId

Parse ArangoDB document IDs (collection/key format).

```ts
parseArangoId(id: string): string
```

**Examples:**
```js
parseArangoId('users/123'); // 'users/123'
parseArangoId('users@123'); // 'users/123'
parseArangoId('invalid'); // ''
```

### parseChar

Parse alphabetic characters only.

```ts
parseChar(
  str: string,
  max?: number,
  defaultValue?: string
): string
```

**Examples:**
```js
parseChar('Hello123', 5); // 'Hello'
parseChar('123abc', 10); // 'abc'
parseChar('', 5, 'default'); // 'default'
```

### parseString

Parse and trim strings with optional max length and default value.

```ts
parseString(
  str: string,
  max?: number,
  defaultValue = ''
): string
```

**Examples:**
```js
parseString('  hello world  '); // 'hello world'
parseString('hello world', 5); // 'hello'
parseString('', 10, 'default'); // 'default'
```

### parseVarChar

Parse variable character strings (alphanumeric and spaces only).

```ts
parseVarChar(
  str: string,
  max?: number,
  defaultValue = ''
): string
```

**Examples:**
```js
parseVarChar('Hello World!', 10); // 'Hello Worl'
parseVarChar('user@123', 20); // 'user 123'
parseVarChar('', 10, 'default'); // 'default'
```

### parseMentions

Extract @mentions from text.

```ts
parseMentions(str: string = ''): string[]
```

**Examples:**
```js
parseMentions('Hello @john and @jane!'); // ['@john', '@jane']
parseMentions('@user123 @test_user'); // ['@user123', '@test_user']
parseMentions('No mentions here'); // []
```

### parseTags

Extract #hashtags from text.

```ts
parseTags(str: string = ''): string[]
```

**Examples:**
```js
parseTags('Check out #javascript and #typescript!'); // ['#javascript', '#typescript']
parseTags('#tag1 #tag2 #tag3'); // ['#tag1', '#tag2', '#tag3']
parseTags('No tags here'); // []
```

### parseTemplate

Parse template strings with variable substitution.

```ts
parseTemplate(
  template: string,
  variables: { [key: string]: any }
): string
```

**Examples:**
```js
const template = 'Hello [name], welcome to [site]!';
const vars = { name: 'John', site: 'our platform' };
parseTemplate(template, vars); // 'Hello John, welcome to our platform!'
```

### parseUrl

Parse and encode URLs.

```ts
parseUrl(url: string): string
```

**Examples:**
```js
parseUrl('https://example.com'); // 'https://example.com'
parseUrl('example.com/path with spaces'); // 'example.com/path%20with%20spaces'
parseUrl(''); // ''
```

### createPassword

Create encrypted passwords using PBKDF2 and MD5.

```ts
createPassword(password: string, salt: string): string
```

**Examples:**
```js
createPassword('mypassword', 'salt123'); // 'a1b2c3d4e5f6...'
createPassword('', 'salt'); // ''
```

### createHash

Generate MD5 hash with optional salt.

```ts
createHash(
  key: string,
  salt: string = (+new Date()).toString()
): string
```

**Examples:**
```js
createHash('password', 'salt'); // 'a1b2c3d4e5f6...'
createHash('data'); // hash with timestamp salt
```

### stripHTML

Remove HTML tags from strings.

```ts
stripHTML(html: string): string
```

**Examples:**
```js
stripHTML('<p>Hello <strong>World</strong>!</p>'); // 'Hello World!'
stripHTML('<div>Content</div>'); // 'Content'
stripHTML('Plain text'); // 'Plain text'
```

## Use Cases

### User Registration
```js
function validateRegistration(data) {
  return {
    email: parseEmail(data.email),
    username: parseUsername(data.username),
    password: parsePassword(data.password),
    phone: parsePhone(data.phone)
  };
}
```

### Content Processing
```js
function processContent(content) {
  return {
    text: stripHTML(content.html),
    mentions: parseMentions(content.text),
    tags: parseTags(content.text),
    cleanText: parseString(content.text, 500)
  };
}
```

### API Data Sanitization
```js
function sanitizeApiData(data) {
  return {
    id: parseId(data.id),
    name: parseString(data.name, 100),
    description: parseVarChar(data.description, 1000),
    url: parseUrl(data.url)
  };
}
```

## Performance

- **Optimized**: Fast string operations
- **Efficient**: Minimal object creation
- **Robust**: Comprehensive error handling

## TypeScript

Full TypeScript support:

```ts
import { parseEmail, parsePhone, parseUsername } from '@nlabs/utils/parsers';

interface UserData {
  email: string;
  phone: string;
  username: string;
}

function processUser(data: UserData) {
  return {
    email: parseEmail(data.email),
    phone: parsePhone(data.phone),
    username: parseUsername(data.username)
  };
}
```

## Edge Cases

### Invalid Input
```js
parseEmail('not-an-email'); // ''
parsePhone('invalid-phone'); // ''
parseUsername(''); // ''
```

### Special Characters
```js
parseUsername('user@name!'); // 'username'
parseVarChar('text with @#$%'); // 'text with '
stripHTML('<script>alert("xss")</script>'); // 'alert("xss")'
```

### Length Limits
```js
parseString('very long string', 5); // 'very '
parseUsername('verylongusername123456789'); // 'verylongusername123456789' (truncated)
```

## Migration from Lodash

```js
// Lodash
_.trim('  hello  '); // 'hello'
// @nlabs/utils
parseString('  hello  '); // 'hello'
```

## Related

- [isString](../checks/isString.md) - String type checking
- [replace](../strings/replace.md) - String replacement utilities
- [trim](../strings/trim.md) - String trimming utilities
- [escape](../strings/escape.md) - HTML escaping utilities