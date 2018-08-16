import iterate from './iterate'

const concat = <T> (...iterables: Iterable<T>[]): Iterable<T> => ({
  * [Symbol.iterator] () {
    for (let it of iterables) {
      yield* iterate(it)
    }
  }
})

export default concat
