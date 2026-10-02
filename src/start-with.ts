import { concat } from './concat.ts'

/** Prepends `value` to an iterable. */
export const startWith =
  <T>(value: T) =>
  (iterable: Iterable<T>): Iterable<T> =>
    concat([value], iterable)
