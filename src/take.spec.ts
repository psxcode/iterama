import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from './map'
import take from './take'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ take ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(3)(data)]
    expect(result).deep.eq([1, 2, 3])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), take(2))(data)]
    expect(result).deep.eq([2, 4])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(2)(data)]
    expect(result).deep.eq([0, 1])
  })
})

describe('[ takeLast ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-2)(data)]
    expect(result).deep.eq([4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), take(-2))(data)]
    expect(result).deep.eq([8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(-2)(data)]
    expect(result).deep.eq([3, 4])
  })
})

describe('[ take overflow ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(42)(data)]
    expect(result).deep.eq([1, 2, 3, 4, 5])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-42)(data)]
    expect(result).deep.eq([1, 2, 3, 4, 5])
  })
})
