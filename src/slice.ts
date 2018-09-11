import { pipe } from '@psxcode/compose'
import skip from './skip'
import take from './take'
import { fi } from './types'

const slice = (from: number, to: number) => <T> (it: Iterable<T>) =>
  pipe(
    from < 0
      ? take(from) as fi<T>
      : skip(from) as fi<T>,
    to < 0
      ? skip(to) as fi<T>
      : take(to) as fi<T>
  )(it)

export default slice
