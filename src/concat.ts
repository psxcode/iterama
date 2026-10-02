import { iterate } from './iterate.ts'

/** Lazily concatenates the given iterables. */
export const concat = <T>(...iterables: Iterable<T>[]): Iterable<T> => ({
  *[Symbol.iterator]() {
    for (const iterable of iterables) {
      yield* iterate(iterable)
    }
  },
})
