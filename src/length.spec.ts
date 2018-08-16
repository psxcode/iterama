import { expect } from 'chai'
import length from './length'

const gen = function* (n: number) {
  for (let i = 0; i < n; ++i) yield i
}

describe('[ length ]', () => {
  it('should work with arrays', () => {
    const data = [1, 2, 3, 4, 5]
    const result = length(Number.MAX_SAFE_INTEGER)(data)
    expect(result).eq(data.length)
  })

  it('should work with maxLength', () => {
    const data = [1, 2, 3, 4, 5]
    const result = length(2)(data)
    expect(result).eq(2)
  })

  it('should work negative maxLength', () => {
    const data = [1, 2, 3, 4, 5]
    const result = length(-2)(data)
    expect(result).eq(0)
  })

  it('should work maxLength === 0', () => {
    const data = [1, 2, 3, 4, 5]
    const result = length(0)(data)
    expect(result).eq(0)
  })

  it('should work with Sets', () => {
    const data = new Set([1, 2, 3, 4, 5])
    const result = length(Number.MAX_SAFE_INTEGER)(data)
    expect(result).eq(5)
  })

  it('should work with Generators', () => {
    const data = gen(5)
    const result = length(Number.MAX_SAFE_INTEGER)(data)
    expect(result).eq(5)
  })
})
