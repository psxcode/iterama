import { iterate } from './iterate.ts'
import { RingBuffer } from './ring-buffer.ts'

const skipFirst =
  (count: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      const iterator = iterate(iterable)

      for (let i = 0; i < count; i++) {
        if (iterator.next().done) return
      }

      yield* iterator
    },
  })

const skipLast =
  (count: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => ({
    *[Symbol.iterator]() {
      const iterator = iterate(iterable)
      const buffer = new RingBuffer<T>(count)

      for (let i = 0; i < count; i++) {
        const result = iterator.next()
        if (result.done) return
        buffer.push(result.value)
      }

      for (const value of iterator) {
        yield buffer.push(value) as T
      }
    },
  })

/**
 * Skips `count` values.
 *
 * @remarks
 * A negative `count` skips the last `|count|` values, which buffers them
 * until the source is exhausted.
 */
export const skip = (count: number) => (count < 0 ? skipLast(-count) : skipFirst(count))
