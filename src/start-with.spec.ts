import { expect } from 'chai'
import startWith from './start-with'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ tail ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3]
    const result = [...startWith(0)(data)]
    expect(result).deep.eq([0, 1, 2, 3])
  })
})
