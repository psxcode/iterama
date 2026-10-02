export type PredicateExFn<T> = (value: T, index: number, iterable: Iterable<T>) => boolean

/** Like `filter`, but the predicate also receives the index and the source iterable. */
export const filterEx =
  <T>(predicate: PredicateExFn<T>) =>
  (iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      let index = 0

      for (const value of iterable) {
        if (predicate(value, index++, iterable)) yield value
      }
    },
  })
