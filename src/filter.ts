export type PredicateFn<T> = (value: T) => boolean

/** Keeps the values that satisfy the predicate. */
export const filter =
  <T>(predicate: PredicateFn<T>) =>
  (iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      for (const value of iterable) {
        if (predicate(value)) yield value
      }
    },
  })
