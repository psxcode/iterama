export type ReducerExFn<T, R> = (acc: R, val: T, i: number, iterable: Iterable<T>) => R

const reduceEx = <T, R> (reducer: ReducerExFn<T, R>, initial: R) => (iterable: Iterable<T>): Iterable<R> => ({
  * [Symbol.iterator] () {
    let state = initial
    let i = 0
    for (let value of iterable) {
      state = reducer(state, value, i++, iterable)
    }
    yield state
  }
})

export default reduceEx
