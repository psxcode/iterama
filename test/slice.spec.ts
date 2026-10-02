import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, slice } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

describe('[ slice defaults ]', () => {
  it("skip 'to' param", () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(1)(data)], [2, 3, 4, 5])
  })

  it('skip both params', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice()(data)], [1, 2, 3, 4, 5])
  })
})

describe('[ slice + + ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(1, 3)(data)], [2, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(2, 2)(map(mult2)(data))], [6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)

    assert.deepStrictEqual([...slice(2, 1)(data)], [2])
  })
})

describe('[ slice + - ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(1, -1)(data)], [2, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(2, -1)(map(mult2)(data))], [6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)

    assert.deepStrictEqual([...slice(2, -1)(data)], [2, 3])
  })
})

describe('[ slice - + ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(-3, 2)(data)], [3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(-3, 2)(map(mult2)(data))], [6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)

    assert.deepStrictEqual([...slice(-3, 2)(data)], [2, 3])
  })
})

describe('[ slice - - ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(-3, -1)(data)], [3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...slice(-3, -1)(map(mult2)(data))], [6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)

    assert.deepStrictEqual([...slice(-3, -1)(data)], [2, 3])
  })
})

describe('[ slice overflow ]', () => {
  const data = [1, 2, 3, 4, 5]

  it('takes the rest when to exceeds the length', () => {
    assert.deepStrictEqual([...slice(2, 42)(data)], [3, 4, 5])
  })

  it('yields nothing when from exceeds the length', () => {
    assert.deepStrictEqual([...slice(42, -2)(data)], [])
  })

  it('clamps a negative from beyond the start', () => {
    assert.deepStrictEqual([...slice(-42, 2)(data)], [1, 2])
  })

  it('clamps a negative from beyond the start and keeps a negative to', () => {
    assert.deepStrictEqual([...slice(-42, -2)(data)], [1, 2, 3])
  })

  it('yields everything when both bounds exceed the length', () => {
    assert.deepStrictEqual([...slice(-42, 42)(data)], [1, 2, 3, 4, 5])
  })

  it('yields nothing when both negative bounds exceed the length', () => {
    assert.deepStrictEqual([...slice(-42, -42)(data)], [])
  })
})
