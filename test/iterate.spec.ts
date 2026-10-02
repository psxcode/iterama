import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { iterate } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}

describe('[ iterate ]', () => {
  it('should work with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...iterate(data)]

    assert.deepStrictEqual(result, [1, 2, 3, 4, 5])
  })

  it('should work with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const result = [...iterate(data)]

    assert.deepStrictEqual(result, [1, 2, 3, 4, 5])
  })

  it('should work with Generators', () => {
    const data = gen(5)
    const result = [...iterate(data)]

    assert.deepStrictEqual(result, [0, 1, 2, 3, 4])
  })
})
