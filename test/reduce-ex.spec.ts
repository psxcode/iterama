import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import reduceEx from '../src/reduce-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ reduceEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(add)
    const result = [...reduceEx(spy, 0)(data)]

    expect(result).deep.eq([15])
    expect(spy.calls).deep.eq([
      [0, 1, 0, data],
      [1, 2, 1, data],
      [3, 3, 2, data],
      [6, 4, 3, data],
      [10, 5, 4, data],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(add)
    const result = [...pipe(reduceEx(spy, 0), map(mult2))(data)]

    expect(result).deep.eq([30])
    expect(spy.calls).deep.eq([
      [0, 1, 0, data],
      [1, 2, 1, data],
      [3, 3, 2, data],
      [6, 4, 3, data],
      [10, 5, 4, data],
    ])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = fn(add)
    const result = [...reduceEx(spy, 0)(data)]

    expect(result).deep.eq([15])
    expect(spy.calls).deep.eq([
      [0, 0, 0, data],
      [0, 1, 1, data],
      [1, 2, 2, data],
      [3, 3, 3, data],
      [6, 4, 4, data],
      [10, 5, 5, data],
    ])
  })
})
