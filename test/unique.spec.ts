import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import unique from '../src/unique'

const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ unique ]', () => {
  it('works with arrays', () => {
    const data = [1, 1, 3, 4, 3]
    const result = [...unique(data)]

    expect(result).deep.eq([1, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 1, 3, 4, 3]
    const result = [...pipe(map(mult2), unique)(data)]

    expect(result).deep.eq([2, 6, 8])
  })
})
