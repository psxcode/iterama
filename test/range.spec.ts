import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import take from '../src/take'
import map from '../src/map'
import range from '../src/range'

const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ range ]', () => {
  it('works with arrays', () => {
    const result = [...range(5)]

    expect(result).deep.eq([0, 1, 2, 3, 4])
  })

  it('works chained', () => {
    const result = [...pipe(map(mult2), take(-1))(range(6))]

    expect(result).deep.eq([10])
  })
})
