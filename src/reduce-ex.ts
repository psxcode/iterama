export type ReducerExFn<T, R> = (
  accumulator: R,
  value: T,
  index: number,
  iterable: Iterable<T>,
) => R

/**
 * Folds an iterable into a single value and yields it once.
 *
 * @remarks
 * Unlike `reduce`, the initial state is passed explicitly and the reducer
 * also receives the index and the source iterable.
 */
export const reduceEx =
  <T, R>(reducer: ReducerExFn<T, R>, initial: R) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      let state = initial
      let index = 0

      for (const value of iterable) {
        state = reducer(state, value, index++, iterable)
      }

      yield state
    },
  })
