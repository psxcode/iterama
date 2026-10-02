import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, range, take } from '../src/index.ts'

const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ range ]', () => {
  it('works with arrays', () => {
    const result = [...range(5)]

    assert.deepStrictEqual(result, [0, 1, 2, 3, 4])
  })

  it('works chained', () => {
    const result = [...take(-1)(map(mult2)(range(6)))]

    assert.deepStrictEqual(result, [10])
  })
})
