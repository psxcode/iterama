import { iterate } from './iterate.ts'

export function zip<A, B>(it0: Iterable<A>, it1: Iterable<B>): Iterable<[A, B]>
export function zip<A, B, C>(
  it0: Iterable<A>,
  it1: Iterable<B>,
  it2: Iterable<C>,
): Iterable<[A, B, C]>
export function zip<A, B, C, D>(
  it0: Iterable<A>,
  it1: Iterable<B>,
  it2: Iterable<C>,
  it3: Iterable<D>,
): Iterable<[A, B, C, D]>

/** Zips iterables together, stopping at the shortest one. */
export function zip(...iterables: Iterable<unknown>[]): Iterable<unknown[]> {
  return {
    *[Symbol.iterator]() {
      const iterators = iterables.map((iterable) => iterate(iterable))

      /* Without iterables the loop below would never end. */
      if (iterators.length === 0) return

      while (true) {
        const values: unknown[] = []

        for (const iterator of iterators) {
          const result = iterator.next()
          if (result.done) return
          values.push(result.value)
        }

        yield values
      }
    },
  }
}
