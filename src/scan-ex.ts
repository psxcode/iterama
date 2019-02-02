import { ReducerExFn } from './reduce-ex'

const scanEx = <T, R> (reducer: ReducerExFn<T, R>, initial: R) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = initial
    let i = 0
    for (const value of iterable) {
      yield state = reducer(state, value, i++, iterable)
    }
  },
})

export default scanEx
