function* iterate <T> (iterable: Iterable<T>) {
  for (const value of iterable) {
    yield value
  }
}

export default iterate
