import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { length } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}

describe('[ length ]', () => {
  it('should work with arrays', () => {
    const data = [1, 2, 3, 4, 5]

    assert.strictEqual(length(Number.MAX_SAFE_INTEGER)(data), data.length)
  })

  it('should work with maxLength', () => {
    const data = [1, 2, 3, 4, 5]

    assert.strictEqual(length(2)(data), 2)
  })

  it('should work negative maxLength', () => {
    const data = [1, 2, 3, 4, 5]

    assert.strictEqual(length(-2)(data), 0)
  })

  it('should work maxLength === 0', () => {
    const data = [1, 2, 3, 4, 5]

    assert.strictEqual(length(0)(data), 0)
  })

  it('should work with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])

    assert.strictEqual(length(Number.MAX_SAFE_INTEGER)(data), 5)
  })

  it('should work with Generators', () => {
    const data = gen(5)

    assert.strictEqual(length(Number.MAX_SAFE_INTEGER)(data), 5)
  })
})
