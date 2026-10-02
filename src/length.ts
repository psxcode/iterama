import { iterate } from './iterate.ts'

/** Counts the values of an iterable, stopping after `maxLength`. */
export const length =
  (maxLength: number) =>
  <T>(iterable: Iterable<T>): number => {
    const iterator = iterate(iterable)
    let count = 0

    while (count < maxLength && !iterator.next().done) {
      count++
    }

    return count
  }
