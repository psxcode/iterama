import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { map, take } from '../src/index.ts'

const gen = function* (n: number) {
  for (let i = 0; i < n; i++) yield i
}
const multBy = (x: number) => (value: number) => value * x
const mult2 = multBy(2)

const countingSource = () => {
  const pulled: number[] = []

  function* source() {
    let i = 0

    while (true) {
      pulled.push(i)
      yield i++
    }
  }

  return { pulled, source: source() }
}

describe('[ take ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(3)(data)]

    assert.deepStrictEqual(result, [1, 2, 3])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(2)(map(mult2)(data))]

    assert.deepStrictEqual(result, [2, 4])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(2)(data)]

    assert.deepStrictEqual(result, [0, 1])
  })
})

describe('[ takeLast ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-2)(data)]

    assert.deepStrictEqual(result, [4, 5])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...take(-2)(map(mult2)(data))]

    assert.deepStrictEqual(result, [8, 10])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...take(-2)(data)]

    assert.deepStrictEqual(result, [3, 4])
  })
})

describe('[ take overflow ]', () => {
  it('takes everything when the count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...take(42)(data)], [1, 2, 3, 4, 5])
  })

  it('takes everything when the negative count exceeds the length', () => {
    const data = [1, 2, 3, 4, 5]

    assert.deepStrictEqual([...take(-42)(data)], [1, 2, 3, 4, 5])
  })
})

describe('[ take laziness ]', () => {
  it('pulls exactly count values', () => {
    const { pulled, source } = countingSource()

    assert.deepStrictEqual([...take(2)(source)], [0, 1])
    assert.deepStrictEqual(pulled, [0, 1])
  })

  it('pulls nothing for a zero count', () => {
    const { pulled, source } = countingSource()

    assert.deepStrictEqual([...take(0)(source)], [])
    assert.deepStrictEqual(pulled, [])
  })
})

describe('[ take non-integer count ]', () => {
  const data = [1, 2, 3, 4, 5]

  it('truncates a positive count', () => {
    assert.deepStrictEqual([...take(2.5)(data)], [1, 2])
  })

  it('truncates a negative count', () => {
    assert.deepStrictEqual([...take(-2.5)(data)], [4, 5])
  })

  it('treats NaN like zero', () => {
    assert.deepStrictEqual([...take(Number.NaN)(data)], [])
  })

  it('treats -Infinity as the whole iterable', () => {
    assert.deepStrictEqual([...take(Number.NEGATIVE_INFINITY)(data)], data)
  })
})
