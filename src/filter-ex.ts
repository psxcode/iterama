import { PredicateExFn } from './filter'

const filterEx = <T> (pred: PredicateExFn<T>) => (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    let i = 0
    for (let value of iterable) {
      if (pred(value, i++, iterable)) yield(value)
    }
  }
})

export default filterEx
