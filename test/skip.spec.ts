import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, skip } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ skip ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(2)(data)]

    assert.deepStrictEqual(result, [3, 4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...map(mult2)(skip(2)(data))]

    assert.deepStrictEqual(result, [6, 8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...skip(2)(data)]

    assert.deepStrictEqual(result, [2, 3, 4])
  })
})

describe('[ skipLast ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...skip(-2)(data)]

    assert.deepStrictEqual(result, [1, 2, 3])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...map(mult2)(skip(-2)(data))]

    assert.deepStrictEqual(result, [2, 4, 6])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...skip(-2)(data)]

    assert.deepStrictEqual(result, [0, 1, 2])
  })
})

describe('[ skip overflow ]', () => {
  it('skips everything when the count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...skip(42)(data)], [])
  })

  it('skips everything when the negative count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...skip(-42)(data)], [])
  })
})
