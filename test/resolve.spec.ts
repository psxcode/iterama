import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { resolve } from '../src/index.ts'

describe('[ resolve ]', () => {
  it('awaits yielded values and passes them back into the iterator', async () => {
    const seen: number[] = []

    function* source(): Generator<Promise<number>, void, number> {
      const a = yield Promise.resolve(1)
      seen.push(a)
      const b = yield Promise.resolve(a + 1)
      seen.push(b)
    }

    await resolve(source())

    assert.deepStrictEqual(seen, [1, 2])
  })
})
