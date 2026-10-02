/**
 * Fixed-capacity FIFO buffer.
 *
 * Pushing into a full buffer evicts and returns the oldest value, which keeps
 * the last `capacity` values of a stream using constant memory.
 */
export class RingBuffer<T> implements Iterable<T> {
  readonly #capacity: number
  readonly #buffer: (T | undefined)[] = []
  #head = 0
  #size = 0

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('RingBuffer capacity must be a positive integer')
    }

    this.#capacity = capacity
  }

  push(value: T): T | undefined {
    const evicted = this.#size === this.#capacity ? this.#buffer[this.#head] : undefined

    this.#buffer[(this.#head + this.#size) % this.#capacity] = value

    if (this.#size < this.#capacity) {
      this.#size++
    } else {
      this.#head = (this.#head + 1) % this.#capacity
    }

    return evicted
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.#size; i++) {
      yield this.#buffer[(this.#head + i) % this.#capacity] as T
    }
  }
}
