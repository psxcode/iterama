import { RingBuffer } from './ring-buffer.ts'

const takeFirst =
  (count: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      let taken = 0

      for (const value of iterable) {
        if (taken++ >= count) return
        yield value
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
 * until the source is exhausted.
 */
export const take = (count: number) => (count < 0 ? takeLast(-count) : takeFirst(count))
