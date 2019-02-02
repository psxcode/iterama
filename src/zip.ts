import iterate from './iterate'

function zip <A, B> (it0: Iterable<A>, it1: Iterable<B>): Iterable<[A, B]>
function zip <A, B, C> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>): Iterable<[A, B, C]>
function zip <A, B, C, D> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>, it3: Iterable<D>): Iterable<[A, B, C, D]>

function zip (...iterables: Iterable<any>[]) {
  return {
    * [Symbol.iterator] () {
      const values: IteratorResult<any>[] = new Array(iterables.length)
      const iterators = iterables.map(iterate)
      let done = false
      while (!done) {
        for (let i = 0; i < iterables.length; ++i) {
          values[i] = iterators[i].next()
        }
        for (let i = 0; i < iterables.length; ++i) {
          if (values[i].done) {
            done = true
            break
          }
        }
        if (!done) {
          yield values.map((v) => v.value) as any
        }
      }
    },
  }
}

export default zip
