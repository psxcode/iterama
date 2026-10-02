import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'
import { mapEx } from '../src/index.ts'
import { callsOf } from './utils.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult1 = multBy(1)
const mult2 = multBy(2)

describe('[ mapEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(mult2)
    const result = [...mapEx(spy)(data)]

    assert.deepStrictEqual(result, [2, 4, 6, 8, 10])
    assert.deepStrictEqual(callsOf(spy), [
      [1, 0, data],
      [2, 1, data],
      [3, 2, data],
      [4, 3, data],
      [5, 4, data],
    ])
  })

  it('works with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const spy = mock.fn(mult1)

    for (const value of mapEx(spy)(data)) {
      assert.ok(data.has(value))
    }

    assert.deepStrictEqual(callsOf(spy), [
      [1, 0, data],
      [2, 1, data],
      [3, 2, data],
      [4, 3, data],
      [5, 4, data],
    ])
  })

  it('works with Generators', () => {
    const iterator = gen(5)
    const spy = mock.fn(mult2)
    const result = [...mapEx(spy)(iterator)]

    assert.deepStrictEqual(result, [0, 2, 4, 6, 8])
    assert.deepStrictEqual(callsOf(spy), [
      [0, 0, iterator],
      [1, 1, iterator],
      [2, 2, iterator],
      [3, 3, iterator],
      [4, 4, iterator],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...mapEx(mult2)(mapEx(mult2)(data))]

    assert.deepStrictEqual(result, [4, 8, 12, 16, 20])
  })
})
