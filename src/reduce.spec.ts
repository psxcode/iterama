import { expect } from 'chai'
import * as sinon from 'sinon'
import { pipe } from '@psxcode/compose'
import map from './map'
import reduce from './reduce'

export const add = (a = 0, b = 0) => a + b
const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ reduce ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...reduce(spy)(data)]
    expect(spy.callCount).eq(data.length + 1)
    expect(result).deep.eq([15])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(add)
    const result = [...pipe(reduce(spy), map(mult2))(data)]
    expect(spy.callCount).eq(data.length + 1)
    expect(result).deep.eq([30])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = sinon.spy(add)
    const result = [...reduce(spy)(data)]
    expect(spy.callCount).eq(6 + 1)
    expect(result).deep.eq([15])
  })
})
