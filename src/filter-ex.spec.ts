import { expect } from 'chai'
import * as sinon from 'sinon'
import { pipe } from '@psxcode/compose'
import map from './map'
import filterEx from './filter-ex'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)
const isEven = (x: number) => x % 2 === 0

describe('[ filterEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(isEven)
    const result = [...filterEx(spy)(data)]
    expect(result).deep.eq([2, 4])
    expect(spy.callCount).eq(data.length)
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = sinon.spy(isEven)
    const result = [...pipe(filterEx(spy), map(mult2))(data)]
    expect(result).deep.eq([4, 8])
    expect(spy.callCount).eq(data.length)
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = sinon.spy(isEven)
    const result = [...filterEx(spy)(iterator)]
    expect(result).deep.eq([0, 2, 4])
    expect(spy.callCount).eq(5)
  })
})
