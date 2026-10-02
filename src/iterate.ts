/** Wraps any iterable into a plain generator. */
export function* iterate<T>(iterable: Iterable<T>): Generator<T> {
  yield* iterable
}
