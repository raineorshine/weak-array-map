**WeakArrayMap** is a [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) that treats different array instances that have the same items as equal keys (shallowEqual).

Values are set and retrieved in O(arr.length).

Useful for memoizing multiple arguments without losing WeakMap support.

## Installation

```
npm install weak-array-map
```

## Usage

```js
const a = { 'a': 1 }
const b1 = { 'b': 1 }
const b2 = { 'b': 2 }

// new arrays create different entries in regular WeakMap
const weakMap = new WeakMap()
weakMap.set([a, b1], 'hello')
assert.notStrictEqual(weakMap.get([a, b1]), 'hello') // CACHE MISS

// new arrays do not affect caching in WeakArrayMap
const weakArrayMap = new WeakArrayMap()
weakArrayMap.set([a, b1], 'hello')
assert.strictEqual(weakArrayMap.get([a, b1]), 'hello') // CACHE HIT

// works with memoized arguments
const sum = ({ a }, { b }) => ({ a: a + 1, b: b + 1 })
const memoized = memoize(sum)

assert.deepStrictEqual(memoized(a, b1), { a: 2, b: 2 })
assert.deepStrictEqual(memoized(a, b2), { a: 2, b: 3 })
assert.strictEqual(memoized(a, b1), memoized(a, b1))
assert.strictEqual(memoized(a, b2), memoized(a, b2))
```

## API

**constructor**

```
new WeakMap()
```

**set: (arr, value) => void**

Sets a value at the given shallow-equal array key.

**get: (arr) => any**

Returns the value at the given shallow-equal array key.

**has: (arr) => boolean**

Returns true if there is a value stored at the given shallow-equal array key.

## Limitations

- Does not support primitive array items
