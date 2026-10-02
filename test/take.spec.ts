import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, take } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ take ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(3)(data)]

    assert.deepStrictEqual(result, [1, 2, 3])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(2)(map(mult2)(data))]

    assert.deepStrictEqual(result, [2, 4])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(2)(data)]

    assert.deepStrictEqual(result, [0, 1])
  })
})

describe('[ takeLast ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-2)(data)]

    assert.deepStrictEqual(result, [4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-2)(map(mult2)(data))]

    assert.deepStrictEqual(result, [8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(-2)(data)]

    assert.deepStrictEqual(result, [3, 4])
  })
})

describe('[ take overflow ]', () => {
  it('takes everything when the count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...take(42)(data)], [1, 2, 3, 4, 5])
  })

  it('takes everything when the negative count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...take(-42)(data)], [1, 2, 3, 4, 5])
  })
})
