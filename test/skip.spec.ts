import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import skip from '../src/skip'
import { fi } from '../src/types'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ skip ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(2)(data)]

    expect(result).deep.eq([3, 4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(skip(2) as fi<number>, map(mult2))(data)]

    expect(result).deep.eq([6, 8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...skip(2)(data)]

    expect(result).deep.eq([2, 3, 4])
  })
})

describe('[ skipLast ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(-2)(data)]

    expect(result).deep.eq([1, 2, 3])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(skip(-2) as fi<number>, map(mult2))(data)]

    expect(result).deep.eq([2, 4, 6])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...skip(-2)(data)]

    expect(result).deep.eq([0, 1, 2])
  })
})

describe('[ skip overflow ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(42)(data)]

    expect(result).deep.eq([])
  })
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(-42)(data)]

    expect(result).deep.eq([])
  })
})
