import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'
import { filter, map } from '../src/index.ts'
import { callsOf } from './utils.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const isEven = (x: number) => x % 2 === 0
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ filter ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(isEven)
    const result = [...filter(spy)(data)]

    assert.deepStrictEqual(result, [2, 4])
    assert.deepStrictEqual(callsOf(spy), [[1], [2], [3], [4], [5]])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(isEven)
    const result = [...map(mult2)(filter(spy)(data))]

    assert.deepStrictEqual(result, [4, 8])
    assert.deepStrictEqual(callsOf(spy), [[1], [2], [3], [4], [5]])
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = mock.fn(isEven)
    const result = [...filter(spy)(iterator)]

    assert.deepStrictEqual(result, [0, 2, 4])
    assert.deepStrictEqual(callsOf(spy), [[0], [1], [2], [3], [4]])
  })
})
