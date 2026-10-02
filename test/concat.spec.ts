import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { concat, map } from '../src/index.ts'

const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ concat ]', () => {
  it('works with arrays', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...concat(data0, data1)]

    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('works chained', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = [6, 7, 8, 9]
    const result = [...map(mult2)(concat(data0, data1))]

    assert.deepStrictEqual(result, [2, 4, 6, 8, 10, 12, 14, 16, 18])
  })
})
