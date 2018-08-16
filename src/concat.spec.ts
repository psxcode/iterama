import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from './map'
import concat from './concat'

const multBy = (x: number) => (y: number) => y * x
const mult2 = multBy(2)

describe('[ concat ]', () => {
  it('works with arrays', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...concat(data0, data1)]
    expect(result).deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('works chained', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...pipe(concat.bind(null, data0), map(mult2))(data1)]
    expect(result).deep.eq([2, 4, 6, 8, 10, 12, 14, 16, 18])
  })
})
