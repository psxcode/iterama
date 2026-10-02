import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { startWith } from '../src/index.ts'

describe('[ startWith ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3]
    const result = [...startWith(0)(data)]

    assert.deepStrictEqual(result, [0, 1, 2, 3])
  })
})
