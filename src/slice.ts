import { skip } from './skip.ts'
import { take } from './take.ts'
import type { IterableTransformer } from './types.ts'

/**
 * Skips `from` values, then takes `to`.
 *
 * @remarks
 * Negative bounds are counted from the end of the iterable.
 */
export const slice =
  (from = 0, to = Number.MAX_SAFE_INTEGER) =>
  <T>(iterable: Iterable<T>): Iterable<T> => {
    const skipFrom: IterableTransformer = from < 0 ? take(from) : skip(from)
    const takeTo: IterableTransformer = to < 0 ? skip(to) : take(to)

    return takeTo(skipFrom(iterable))
  }
