import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, unique } from '../src/index.ts'

const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ unique ]', () => {
  it('works with arrays', () => {
    const data = [1, 1, 3, 4, 3]
    const result = [...unique(data)]

    assert.deepStrictEqual(result, [1, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 1, 3, 4, 3]
    const result = [...unique(map(mult2)(data))]

    assert.deepStrictEqual(result, [2, 6, 8])
  })
})
