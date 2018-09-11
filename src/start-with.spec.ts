import { expect } from 'chai'
import startWith from './start-with'

describe('[ tail ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3]
    const result = [...startWith(0)(data)]
    expect(result).deep.eq([0, 1, 2, 3])
  })
})