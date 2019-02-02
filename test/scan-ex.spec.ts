import { describe, it } from 'mocha'
import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import scanEx from '../src/scan-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ scanEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(add)
    const result = [...scanEx(spy, 0)(data)]

    expect(result).deep.eq([1, 3, 6, 10, 15])
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
    const result = [...pipe(scanEx(spy, 0), map(mult2))(data)]

    expect(result).deep.eq([2, 6, 12, 20, 30])
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
    const result = [...scanEx(spy, 0)(data)]

    expect(result).deep.eq([0, 1, 3, 6, 10, 15])
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
