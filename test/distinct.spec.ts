import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { distinct, map } from '../src/index.ts'

const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ distinct ]', () => {
  it('works with arrays', () => {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...distinct(data)]

    assert.deepStrictEqual(result, [1, 3, 4, 3])
  })

  it('works chained', () => {
    const data = [1, 1, 3, 3, 4, 3]
    const result = [...distinct(map(mult2)(data))]

    assert.deepStrictEqual(result, [2, 6, 8, 6])
  })

  it('keeps consecutive undefined values', () => {
    const result = [...distinct([undefined, undefined, 1, 1])]

    assert.deepStrictEqual(result, [undefined, 1])
  })

  it('treats NaN as a duplicate of itself, like unique', () => {
    const result = [...distinct([Number.NaN, Number.NaN, 1])]

    assert.deepStrictEqual(result, [Number.NaN, 1])
  })
})
