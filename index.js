export class WeakArrayMap {

  // a unique key to store the value in the final WeakMap
  static RESULT_KEY = Symbol()

  constructor() {
    // A nested WeakMap that allows a memoized result to be keyed by multiple arguments. Each argument is stored in a different level ensuring that the exact sequence of arguments has a single, unique path with no additional references that would prevent the input objects from being garbage collected. 
    this.results = new WeakMap()
  }

  // gets the result object at the given array key if it exists
  getResult(arrKey) {
    return arrKey.reduce((accum, item, i) => accum?.get(item), this.results)
  }

  has(arrKey) {
    return this.getResult(arrKey)?.hasOwnProperty(RESULT_KEY)
  }

  // gets a value weakly cached by an array of objects
  get(arrKey) {
    return this.getResult(arrKey)?.[WeakArrayMap.RESULT_KEY]
  }

  // caches a value weakly indexed by an array of objects
  set(arrKey, value) {
    return arrKey.reduce((accum, item, i) => {
      const nestedMap = accum.get(item)
      if (nestedMap) return nestedMap
      if (i < arrKey.length - 1) {
        const nestedMap = new WeakMap()
        accum.set(item, nestedMap)
        return nestedMap
      }
      else {
        // store in a value box that is easily differentiated from a nested WeakMap
        accum.set(item, { [WeakArrayMap.RESULT_KEY]: value })
        return accum
      }
    }, this.results)
  }
}

export const memoize = f => {

  const map = new WeakArrayMap()

  const memoized = (...args) => {
    let result = map.get(args)
    if (result) return result.value
    result = f(...args)
    map.set(args, result)
    return result
  }

  return memoized
}

