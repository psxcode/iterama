import type { ReducerExFn } from './reduce-ex.ts'

/**
 * Emits the accumulator after every value, starting with `initial`.
 *
 * @remarks
 * Unlike `scan`, the reducer also receives the index and the source iterable.
 */
export const scanEx =
  <T, R>(reducer: ReducerExFn<T, R>, initial: R) =>
  (iterable: Iterable<T>): Iterable<R> => ({
    *[Symbol.iterator]() {
      let state = initial
      let index = 0

      for (const value of iterable) {
        state = reducer(state, value, index++, iterable)
        yield state
      }
    },
  })
