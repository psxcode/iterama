function* iterate <T> (iterable: Iterable<T>) {
  for (let value of iterable) {
    yield value
  }
}

export default iterate
