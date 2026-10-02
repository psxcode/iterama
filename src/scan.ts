import type { ReducerFn } from './reduce.ts'

/**
 * Emits the accumulator after every value, starting with the seed state.
 *
 * @remarks
 * The reducer is called once without arguments to create the seed state.
 */
export const scan =
  <T, R>(reducer: ReducerFn<T, R>) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      let state = reducer()

      for (const value of iterable) {
        state = reducer(state, value)
        yield state
      }
    },
  })
