import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { zip } from '../src/index.ts'

describe('[ zip ]', () => {
  it('works with arrays', () => {
    const data0 = [1, 2, 3]
    const data1 = ['1', '2', '3']
    const result = [...zip(data0, data1)]

    assert.deepStrictEqual(result, [
      [1, '1'],
      [2, '2'],
      [3, '3'],
    ])
  })

  it('stops at the shortest iterable', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = ['1', '2']
    const result = [...zip(data0, data1)]

    assert.deepStrictEqual(result, [
      [1, '1'],
      [2, '2'],
    ])
  })

  it('works with three iterables', () => {
    const data0 = [1, 2, 3, 4, 5]
    const data1 = ['1', '2']
    const data2 = [true]
    const result = [...zip(data0, data1, data2)]

    assert.deepStrictEqual(result, [[1, '1', true]])
  })
})

describe('[ zip without iterables ]', () => {
  it('yields nothing instead of looping forever', () => {
    const zipNone = zip as unknown as () => Iterable<never[]>

    assert.deepStrictEqual([...zipNone()], [])
  })
})
