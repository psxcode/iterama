import { pipe } from '@psxcode/compose'
import skip from './skip'
import take from './take'

const slice = (from: number, to: number) => <T> (it: Iterable<T>) =>
  pipe<Iterable<T>, Iterable<T>, Iterable<T>>(
    from < 0
      ? take(from)
      : skip(from),
    to < 0
      ? skip(to)
      : take(to)
  )(it)

export default slice
