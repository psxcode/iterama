import { expect } from 'chai'
import * as sinon from 'sinon'
import { pipe } from '@psxcode/compose'
import map from './map'
import reduceEx from './reduce-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
export const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ reduceEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...reduceEx(spy, 0)(data)]
    expect(spy.callCount).eq(data.length)
    expect(result).deep.eq([15])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...pipe(reduceEx(spy, 0), map(mult2))(data)]
    expect(spy.callCount).eq(data.length)
    expect(result).deep.eq([30])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = sinon.spy(add)
    const result = [...reduceEx(spy, 0)(data)]
    expect(spy.callCount).eq(6)
    expect(result).deep.eq([15])
  })
})
