import { describe, it } from 'mocha'
import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import map from '../src/map'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult1 = multBy(1)
const mult2 = multBy(2)

describe('[ map ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(mult2)
    const result = [...map(spy)(data)]

    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.calls).deep.eq([
      [1],
      [2],
      [3],
      [4],
      [5],
    ])
  })

  it('works with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = fn(mult1)

    for (const val of map(spy)(data)) {
      expect(data.has(val)).eq(true)
    }
    expect(spy.calls).deep.eq([
      [1],
      [2],
      [3],
      [4],
      [5],
    ])
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = fn(mult2)
    const result = [...map(spy)(iterator)]

    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.calls).deep.eq([
      [0],
      [1],
      [2],
      [3],
      [4],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(mult2)
    const result = [...pipe(map(mult2), map(spy))(data)]

    expect(result).deep.eq([4, 8, 12, 16, 20])
    expect(spy.calls).deep.eq([
      [2],
      [4],
      [6],
      [8],
      [10],
    ])
  })
})
