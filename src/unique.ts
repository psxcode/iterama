/** Drops all duplicates, keeping the first occurrence of every value. */
export const unique = <T>(iterable: Iterable<T>): Iterable<T> => ({
  *[Symbol.iterator]() {
    const seen = new Set<T>()

    for (const value of iterable) {
      if (!seen.has(value)) {
        seen.add(value)
        yield value
      }
    }
  },
})
