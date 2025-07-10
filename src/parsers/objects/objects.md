# Object Parsers

> Object transformation and serialization utilities

## Installation

```bash
npm install @nlabs/utils
```

## Usage

```js
import { lowerCaseKeys, toQueryString } from '@nlabs/utils/parsers';

const obj = { UserName: 'john', EmailAddress: 'john@example.com' };
lowerCaseKeys(obj); // { username: 'john', emailaddress: 'john@example.com' }

const params = { page: 1, limit: 10, search: 'test' };
toQueryString(params); // 'page=1&limit=10&search=test'
```

## Functions

### lowerCaseKeys

Convert all object keys to lowercase, including nested objects.

```ts
lowerCaseKeys(obj: object = {}): object
```

**Examples:**

```js
const obj = { UserName: 'john', EmailAddress: 'john@example.com' };
lowerCaseKeys(obj);
// { username: 'john', emailaddress: 'john@example.com' }

const nested = {
  User: {
    FirstName: 'John',
    LastName: 'Doe'
  }
};
lowerCaseKeys(nested);
// {
//   user: {
//     firstname: 'John',
//     lastname: 'Doe'
//   }
// }
```

### toQueryString

Convert object to URL query string format.

```ts
toQueryString(json: object = {}): string
```

**Examples:**

```js
const params = { page: 1, limit: 10, search: 'test' };
toQueryString(params); // 'page=1&limit=10&search=test'

const filters = { category: 'books', price: '10-50' };
toQueryString(filters); // 'category=books&price=10-50'

const empty = {};
toQueryString(empty); // ''
```

## Use Cases

### API Request Building

```js
function buildApiUrl(endpoint, params) {
  const queryString = toQueryString(params);
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

const url = buildApiUrl('/api/users', {
  page: 1,
  limit: 20,
  status: 'active'
});
// '/api/users?page=1&limit=20&status=active'
```

### Data Normalization

```js
function normalizeApiResponse(response) {
  return {
    data: lowerCaseKeys(response.data),
    metadata: lowerCaseKeys(response.metadata)
  };
}

const normalized = normalizeApiResponse({
  data: { UserId: 123, UserName: 'john' },
  metadata: { TotalCount: 100, PageNumber: 1 }
});
// {
//   data: { userid: 123, username: 'john' },
//   metadata: { totalcount: 100, pagenumber: 1 }
// }
```

### Form Data Processing

```js
function processFormData(formData) {
  const normalized = lowerCaseKeys(formData);
  const queryString = toQueryString(normalized);

  return {
    normalized,
    queryString,
    url: `/submit?${queryString}`
  };
}
```

### Configuration Standardization

```js
function standardizeConfig(config) {
  return lowerCaseKeys(config);
}

const config = {
  DatabaseHost: 'localhost',
  DatabasePort: 5432,
  ApiKey: 'secret'
};

const standardized = standardizeConfig(config);
// { databasehost: 'localhost', databaseport: 5432, apikey: 'secret' }
```

## Performance

- **Efficient**: Uses native object operations
- **Immutable**: Returns new objects, doesn't modify originals
- **Deep**: Handles nested objects recursively

## TypeScript

Full TypeScript support:

```ts
import { lowerCaseKeys, toQueryString } from '@nlabs/utils/parsers';

interface UserData {
  UserName: string;
  EmailAddress: string;
}

const userData: UserData = { UserName: 'john', EmailAddress: 'john@example.com' };
const normalized = lowerCaseKeys(userData);
const queryString: string = toQueryString(normalized);
```

## Edge Cases

### Empty Objects

```js
lowerCaseKeys({}); // {}
toQueryString({}); // ''
```

### Null/Undefined Values

```js
lowerCaseKeys(null); // {}
toQueryString(null); // ''

lowerCaseKeys(undefined); // {}
toQueryString(undefined); // ''
```

### Special Characters in Query Strings

```js
const params = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello & welcome!'
};
toQueryString(params);
// 'name=John%20Doe&email=john%40example.com&message=Hello%20%26%20welcome!'
```

### Nested Objects

```js
const nested = {
  User: {
    Profile: {
      FirstName: 'John',
      LastName: 'Doe'
    }
  }
};

lowerCaseKeys(nested);
// {
//   user: {
//     profile: {
//       firstname: 'John',
//       lastname: 'Doe'
//     }
//   }
// }
```

## Migration from Lodash

```js
// Lodash
_.mapKeys(obj, (value, key) => key.toLowerCase());
// @nlabs/utils
lowerCaseKeys(obj);

// Lodash
_.map(obj, (value, key) => `${key}=${value}`).join('&');
// @nlabs/utils
toQueryString(obj);
```

## Related

- [mapKeys](../objects/mapKeys.md) - Transform object keys
- [mapValues](../objects/mapValues.md) - Transform object values
- [clone](../objects/clone.md) - Deep object cloning
- [merge](../objects/merge.md) - Object merging utilities
