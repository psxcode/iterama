export type ReducerFn<T, R> = (accumulator?: R, value?: T) => R

/**
 * Folds an iterable into a single value and yields it once.
 *
 * @remarks
 * The reducer is called once without arguments to create the initial state,
 * then once per value.
 */
export const reduce =
  <T, R>(reducer: ReducerFn<T, R>) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      let state = reducer()

      for (const value of iterable) {
        state = reducer(state, value)
      }

      yield state
    },
  })
