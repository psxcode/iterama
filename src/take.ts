import { iterate } from './iterate.ts'
import { RingBuffer } from './ring-buffer.ts'

const takeFirst =
  (count: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      const iterator = iterate(iterable)

      for (let i = 0; i < count; i++) {
        const result = iterator.next()
        if (result.done) return
        yield result.value
      }
    },
  })

const takeLast =
  (count: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      const buffer = new RingBuffer<T>(count)

      for (const value of iterable) {
        buffer.push(value)
      }

      yield* buffer
    },
  })

/**
 * Takes `count` values and stops.
 *
 * @remarks
 * A negative `count` takes the last `|count|` values, which buffers them
 * until the source is exhausted. A fractional `count` is truncated, like
 * `Array.prototype.slice`; `NaN` behaves like `0` and `-Infinity` yields the
 * whole iterable.
 */
export const take = (count: number) => {
  const size = Math.trunc(count)

  if (Number.isNaN(size) || size >= 0) return takeFirst(size)

  return Number.isFinite(size) ? takeLast(-size) : takeFirst(Infinity)
}
