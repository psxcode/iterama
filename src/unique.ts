const unique = <T> (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    const buffer: T[] = []
    for (let value of iterable) {
      if (!buffer.includes(value)) {
        buffer.push(value)
        yield value
      }
    }
  }
})

export default unique
