import { describe, it } from 'mocha'
import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import filterEx from '../src/filter-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)
const isEven = (x?: number) => x % 2 === 0

describe('[ filterEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(isEven)
    const result = [...filterEx(spy)(data)]

    expect(result).deep.eq([2, 4])
    expect(spy.calls).deep.eq([
      [1, 0, data],
      [2, 1, data],
      [3, 2, data],
      [4, 3, data],
      [5, 4, data],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(isEven)
    const result = [...pipe(filterEx(spy), map(mult2))(data)]

    expect(result).deep.eq([4, 8])
    expect(spy.calls).deep.eq([
      [1, 0, data],
      [2, 1, data],
      [3, 2, data],
      [4, 3, data],
      [5, 4, data],
    ])
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = fn(isEven)
    const result = [...filterEx(spy)(iterator)]

    expect(result).deep.eq([0, 2, 4])
    expect(spy.calls).deep.eq([
      [0, 0, iterator],
      [1, 1, iterator],
      [2, 2, iterator],
      [3, 3, iterator],
      [4, 4, iterator],
    ])
  })
})
