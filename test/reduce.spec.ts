import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import reduce from '../src/reduce'

export const add = (a = 0, b = 0) => a + b
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ reduce ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(add)
    const result = [...reduce(spy)(data)]

    expect(result).deep.eq([15])
    expect(spy.calls).deep.eq([
      [],
      [0, 1],
      [1, 2],
      [3, 3],
      [6, 4],
      [10, 5],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(add)
    const result = [...pipe(reduce(spy), map(mult2))(data)]

    expect(result).deep.eq([30])
    expect(spy.calls).deep.eq([
      [],
      [0, 1],
      [1, 2],
      [3, 3],
      [6, 4],
      [10, 5],
    ])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = fn(add)
    const result = [...reduce(spy)(data)]

    expect(result).deep.eq([15])
    expect(spy.calls).deep.eq([
      [],
      [0, 0],
      [0, 1],
      [1, 2],
      [3, 3],
      [6, 4],
      [10, 5],
    ])
  })
})
