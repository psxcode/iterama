/**
 * Drives a synchronous generator whose yields are promises.
 *
 * @remarks
 * Every yielded value is awaited and then passed back into the iterator, which
 * lets a generator read the resolved value of its own yield expression.
 */
export const resolve = <T>(iterator: Iterator<T | Promise<T>>): Promise<void> => {
  const step = (result: IteratorResult<T | Promise<T>>): Promise<void> =>
    result.done
      ? Promise.resolve()
      : Promise.resolve(result.value).then((value) => step(iterator.next(value)))

  return step(iterator.next())
}
