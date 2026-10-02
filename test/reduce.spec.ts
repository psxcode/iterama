import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'
import { map, reduce } from '../src/index.ts'
import { callsOf } from './utils.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ reduce ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(add)
    const result = [...reduce(spy)(data)]

    assert.deepStrictEqual(result, [15])
    assert.deepStrictEqual(callsOf(spy), [[], [0, 1], [1, 2], [3, 3], [6, 4], [10, 5]])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(add)
    const result = [...map(mult2)(reduce(spy)(data))]

    assert.deepStrictEqual(result, [30])
    assert.deepStrictEqual(callsOf(spy), [[], [0, 1], [1, 2], [3, 3], [6, 4], [10, 5]])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = mock.fn(add)
    const result = [...reduce(spy)(data)]

    assert.deepStrictEqual(result, [15])
    assert.deepStrictEqual(callsOf(spy), [[], [0, 0], [0, 1], [1, 2], [3, 3], [6, 4], [10, 5]])
  })
})
