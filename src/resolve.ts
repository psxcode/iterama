/**
 * Drives a synchronous generator whose yields are promises.
 *
 * @remarks
 * Every yielded value is awaited and then passed back into the iterator, which
 * lets a generator read the resolved value of its own yield expression.
 */
export const resolve = async <T>(iterator: Iterator<T | Promise<T>>): Promise<void> => {
  let result = iterator.next()

  while (!result.done) {
    result = iterator.next(await result.value)
  }
}
