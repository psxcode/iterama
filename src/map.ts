export type TransformFn<T, R> = (value: T) => R

const map = <T, R> (xf: TransformFn<T, R>) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    for (let value of iterable) {
      yield xf(value)
    }
  }
})

export default map
