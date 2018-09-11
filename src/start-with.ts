import concat from './concat'

const startWith = <T> (value: T) => (iterable: Iterable<T>) =>
  concat([value], iterable)

export default startWith
