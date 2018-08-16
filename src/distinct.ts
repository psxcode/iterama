const distinct = <T> (iterable: Iterable<T>): Iterable<T> => ({
  * [Symbol.iterator] () {
    let last: T
    for (let value of iterable) {
      if (value !== last!) {
        last = value
        yield value
      }
    }
  }
})

export default distinct
