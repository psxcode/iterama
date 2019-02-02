import { describe, it } from 'mocha'
import { expect } from 'chai'
import { pipe } from '@psxcode/compose'
import map from '../src/map'
import slice from '../src/slice'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}
const multBy = (x: number) => (val: number) => val * x
const mult2 = multBy(2)

describe('[ slice defaults ]', () => {
  it('skip \'to\' param', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(1)(data)]

    expect(result).deep.eq([2, 3, 4, 5])
  })

  it('skip both params', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice()(data)]

    expect(result).deep.eq([1, 2, 3, 4, 5])
  })
})

describe('[ slice + + ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(1, 3)(data)]

    expect(result).deep.eq([2, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(2, 2))(data)]

    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...slice(2, 1)(data)]

    expect(result).deep.eq([2])
  })
})

describe('[ slice + - ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(1, -1)(data)]

    expect(result).deep.eq([2, 3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(2, -1))(data)]

    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...slice(2, -1)(data)]

    expect(result).deep.eq([2, 3])
  })
})

describe('[ slice - + ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-3, 2)(data)]

    expect(result).deep.eq([3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(-3, 2))(data)]

    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...slice(-3, 2)(data)]

    expect(result).deep.eq([2, 3])
  })
})

describe('[ slice - - ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-3, -1)(data)]

    expect(result).deep.eq([3, 4])
  })

  it('works chained', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...pipe(map(mult2), slice(-3, -1))(data)]

    expect(result).deep.eq([6, 8])
  })

  it('works with Generators', () => {
    const data = gen(5)
    const result = [...slice(-3, -1)(data)]

    expect(result).deep.eq([2, 3])
  })
})

describe('[ slice overflow ]', () => {
  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(2, 42)(data)]

    expect(result).deep.eq([3, 4, 5])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(42, -2)(data)]

    expect(result).deep.eq([])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-42, 2)(data)]

    expect(result).deep.eq([1, 2])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-42, -2)(data)]

    expect(result).deep.eq([1, 2, 3])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-42, 42)(data)]

    expect(result).deep.eq([1, 2, 3, 4, 5])
  })

  it('works with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = [...slice(-42, -42)(data)]

    expect(result).deep.eq([])
  })
})
