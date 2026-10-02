import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'
import { map } from '../src/index.ts'
import { callsOf } from './utils.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult1 = multBy(1)
const mult2 = multBy(2)

describe('[ map ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(mult2)
    const result = [...map(spy)(data)]

    assert.deepStrictEqual(result, [2, 4, 6, 8, 10])
    assert.deepStrictEqual(callsOf(spy), [[1], [2], [3], [4], [5]])
  })

  it('works with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = mock.fn(mult1)

    for (const value of map(spy)(data)) {
      assert.ok(data.has(value))
    }

    assert.deepStrictEqual(callsOf(spy), [[1], [2], [3], [4], [5]])
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = mock.fn(mult2)
    const result = [...map(spy)(iterator)]

    assert.deepStrictEqual(result, [0, 2, 4, 6, 8])
    assert.deepStrictEqual(callsOf(spy), [[0], [1], [2], [3], [4]])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(mult2)
    const result = [...map(spy)(map(mult2)(data))]

    assert.deepStrictEqual(result, [4, 8, 12, 16, 20])
    assert.deepStrictEqual(callsOf(spy), [[2], [4], [6], [8], [10]])
  })
})
