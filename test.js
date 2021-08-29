import assert from 'assert'
import { WeakArrayMap, memoize } from './index.js'

const a = { 'a': 1 }
const b1 = { 'b': 1 }
const b2 = { 'b': 2 }

const weakArrayMap = new WeakArrayMap()
weakArrayMap.set([a, b1], 'hello')
assert.strictEqual(weakArrayMap.get([a, b1]), 'hello')

// works with memoized arguments
const sum = ({ a }, { b }) => ({ a: a + 1, b: b + 1 })
const memoized = memoize(sum)

assert.deepStrictEqual(memoized(a, b1), { a: 2, b: 2 })
assert.deepStrictEqual(memoized(a, b2), { a: 2, b: 3 })
assert.strictEqual(memoized(a, b1), memoized(a, b1))
assert.strictEqual(memoized(a, b2), memoized(a, b2))
