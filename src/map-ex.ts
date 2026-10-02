export type TransformExFn<T, R> = (value: T, index: number, iterable: Iterable<T>) => R

/** Like `map`, but the transform also receives the index and the source iterable. */
export const mapEx =
  <T, R>(transform: TransformExFn<T, R>) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      let index = 0

      for (const value of iterable) {
        yield transform(value, index++, iterable)
      }
    },
  })
