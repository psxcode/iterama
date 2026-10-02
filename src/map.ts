export type TransformFn<T, R> = (value: T) => R

/** Lazily maps every value of an iterable. */
export const map =
  <T, R>(transform: TransformFn<T, R>) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      for (const value of iterable) {
        yield transform(value)
      }
    },
  })
