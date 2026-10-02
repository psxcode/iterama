const sameValueZero = <T>(a: T | undefined, b: T): boolean =>
  a === b || (Number.isNaN(a) && Number.isNaN(b))

/**
 * Drops consecutive duplicates, keeping the first value of every run.
 *
 * @remarks
 * Values are compared with SameValueZero, so `NaN` counts as a duplicate of
 * itself — the same equality `unique` gets from `Set`.
 */
export const distinct = <T>(iterable: Iterable<T>): Iterable<T> => ({
  *[Symbol.iterator]() {
    let hasLast = false
    let last: T | undefined

    for (const value of iterable) {
      if (!hasLast || !sameValueZero(last, value)) {
        hasLast = true
        last = value
        yield value
      }
    }
  },
})
