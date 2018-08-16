export type PredicateFn<T> = (arg: T) => boolean
export type PredicateExFn<T> = (arg: T, i: number, iterable: Iterable<T>) => boolean

const filter = <T> (pred: PredicateFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    for (let value of iterable) {
      if (pred(value)) yield(value)
    }
  }
})

export default filter
