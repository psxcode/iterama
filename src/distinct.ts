/** Drops consecutive duplicates, keeping the first value of every run. */
export const distinct = <T>(iterable: Iterable<T>): Iterable<T> => ({
  *[Symbol.iterator]() {
    let hasLast = false
    let last: T | undefined

    for (const value of iterable) {
      if (!hasLast || value !== last) {
        hasLast = true
        last = value
        yield value
      }
    }
  },
})
