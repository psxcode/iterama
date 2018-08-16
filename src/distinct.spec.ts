import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from './map'
import distinct from './distinct'

const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ distinct ]', () => {
  it('works with arrays', () => {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...distinct(data)]
    expect(result).deep.eq([1, 3, 4, 3])
  })

  it('works chained', () => {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...pipe(map(mult2), distinct)(data)]
    expect(result).deep.eq([2, 6, 8, 6])
  })
})
