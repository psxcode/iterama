import assert from 'node:assert/strict'
import { describe, it, mock } from 'node:test'
import { map, reduceEx } from '../src/index.ts'
import { callsOf } from './utils.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const add = (a = 0, b = 0) => a + b
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ reduceEx ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(add)
    const result = [...reduceEx(spy, 0)(data)]

    assert.deepStrictEqual(result, [15])
    assert.deepStrictEqual(callsOf(spy), [
      [0, 1, 0, data],
      [1, 2, 1, data],
      [3, 3, 2, data],
      [6, 4, 3, data],
      [10, 5, 4, data],
    ])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const spy = mock.fn(add)
    const result = [...map(mult2)(reduceEx(spy, 0)(data))]

    assert.deepStrictEqual(result, [30])
    assert.deepStrictEqual(callsOf(spy), [
      [0, 1, 0, data],
      [1, 2, 1, data],
      [3, 3, 2, data],
      [6, 4, 3, data],
      [10, 5, 4, data],
    ])
  })

  it('works with Generators', () => {
    const data = gen(6)
    const spy = mock.fn(add)
    const result = [...reduceEx(spy, 0)(data)]

    assert.deepStrictEqual(result, [15])
    assert.deepStrictEqual(callsOf(spy), [
      [0, 0, 0, data],
      [0, 1, 1, data],
      [1, 2, 2, data],
      [3, 3, 3, data],
      [6, 4, 4, data],
      [10, 5, 5, data],
    ])
  })
})
