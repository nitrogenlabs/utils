import { chunk } from './lib/arrays/chunk/chunk.js';

console.log('Testing chunk function...');

// Test 1: Basic chunking
const array1 = [1, 2, 3, 4, 5, 6, 7, 8];
const result1 = chunk(array1, 3);
console.log('Test 1:', JSON.stringify(result1));
console.assert(JSON.stringify(result1) === JSON.stringify([[1, 2, 3], [4, 5, 6], [7, 8]]), 'Test 1 failed');

// Test 2: Empty array
const array2 = [];
const result2 = chunk(array2, 2);
console.log('Test 2:', JSON.stringify(result2));
console.assert(JSON.stringify(result2) === JSON.stringify([]), 'Test 2 failed');

// Test 3: Chunk size larger than array
const array3 = [1, 2, 3];
const result3 = chunk(array3, 5);
console.log('Test 3:', JSON.stringify(result3));
console.assert(JSON.stringify(result3) === JSON.stringify([[1, 2, 3]]), 'Test 3 failed');

// Test 4: Chunk size of 1
const array4 = [1, 2, 3];
const result4 = chunk(array4, 1);
console.log('Test 4:', JSON.stringify(result4));
console.assert(JSON.stringify(result4) === JSON.stringify([[1], [2], [3]]), 'Test 4 failed');

// Test 5: Chunk size of 0
const array5 = [1, 2, 3, 4];
const result5 = chunk(array5, 0);
console.log('Test 5:', JSON.stringify(result5));
console.assert(JSON.stringify(result5) === JSON.stringify([]), 'Test 5 failed');

// Test 6: Negative chunk size
const array6 = [1, 2, 3, 4];
const result6 = chunk(array6, -1);
console.log('Test 6:', JSON.stringify(result6));
console.assert(JSON.stringify(result6) === JSON.stringify([]), 'Test 6 failed');

// Test 7: Different data types
const array7 = ['a', 'b', 'c', 'd', 'e'];
const result7 = chunk(array7, 2);
console.log('Test 7:', JSON.stringify(result7));
console.assert(JSON.stringify(result7) === JSON.stringify([['a', 'b'], ['c', 'd'], ['e']]), 'Test 7 failed');

// Test 8: Objects
const array8 = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
const result8 = chunk(array8, 2);
console.log('Test 8:', JSON.stringify(result8));
console.assert(JSON.stringify(result8) === JSON.stringify([[{id: 1}, {id: 2}], [{id: 3}, {id: 4}]]), 'Test 8 failed');

// Test 9: Exact multiple
const array9 = [1, 2, 3, 4];
const result9 = chunk(array9, 2);
console.log('Test 9:', JSON.stringify(result9));
console.assert(JSON.stringify(result9) === JSON.stringify([[1, 2], [3, 4]]), 'Test 9 failed');

console.log('All chunk tests passed!');