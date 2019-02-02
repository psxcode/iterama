import { describe, it } from 'mocha'
import { expect } from 'chai'
import fn from 'test-fn'
import { pipe } from '@psxcode/compose'
import mapEx from '../src/map-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult1 = multBy(1)
const mult2 = multBy(2)

describe('[ mapEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(mult2)
    const result = [...mapEx(spy)(data)]

    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.calls).deep.eq([
      [1, 0, data],
      [2, 1, data],
      [3, 2, data],
      [4, 3, data],
      [5, 4, data],
    ])
  })

  it('works with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = fn(mult1)

    for (const val of mapEx(spy)(data)) {
      expect(data.has(val)).eq(true)
    }
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
    const spy = fn(mult2)
    const result = [...mapEx(spy)(iterator)]

    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.calls).deep.eq([
      [0, 0, iterator],
      [1, 1, iterator],
      [2, 2, iterator],
      [3, 3, iterator],
      [4, 4, iterator],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = fn(mult2)
    const result = [...pipe(mapEx(mult2), mapEx(spy))(data)]

    expect(result).deep.eq([4, 8, 12, 16, 20])
    /* cannot compare intermediate iterable created by first mapEx */
    // expect(spy.calls).deep.eq([
    //   [2, 0, {}],
    //   [4, 1, {}],
    //   [6, 2, {}],
    //   [8, 3, {}],
    //   [10, 4, {}],
    // ])
  })
})
