import { expect } from 'chai'
import zip from './zip'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ zip ]', () => {
  it('works with arrays', () => {
    const data0 = [1, 2, 3]
    const data1 = ['1', '2', '3']
    const result = [...zip(data0, data1)]
    expect(result).deep.eq([[1, '1'], [2, '2'], [3, '3']])
  })

  it('works with different length arrays', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = ['1', '2']
    const result = [...zip(data0, data1)]
    expect(result).deep.eq([[1, '1'], [2, '2']])
  })

  it('works with different length arrays', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = ['1', '2']
    const data2 = [true]
    const result = [...zip(data0, data1, data2)]
    expect(result).deep.eq([[1, '1', true]])
  })
})
