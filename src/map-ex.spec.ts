import { expect } from 'chai'
import * as sinon from 'sinon'
import { pipe } from '@psxcode/compose'
import mapEx from './map'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult1 = multBy(1)
const mult2 = multBy(2)

describe('[ mapEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(mult2)
    const result = [...mapEx(spy)(data)]
    expect(result).deep.eq([2, 4, 6, 8, 10])
    expect(spy.callCount).eq(data.length)
  })

  it('works with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = sinon.spy(mult1)
    for (let val of mapEx(spy)(data)) {
      expect(data.has(val)).eq(true)
    }
    expect(spy.callCount).eq(5)
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = sinon.spy(mult2)
    const result = [...mapEx(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4, 6, 8])
    expect(spy.callCount).eq(5)
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(mult2)
    const result = [...pipe(mapEx(mult2), mapEx(spy))(data)]
    expect(result).deep.eq([4, 8, 12, 16, 20])
    expect(spy.callCount).eq(data.length)
  })
})
