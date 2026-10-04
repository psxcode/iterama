# Iterama

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node: >=22.18](https://img.shields.io/badge/node-%3E%3D22.18-brightgreen.svg)](#requirements)

Composable functional `Iterable<T>` helpers with no runtime dependencies. They work with
arrays, sets, generators and any other iterable; transforms stay lazy wherever possible.

## Requirements

- Node.js `>= 22.18`
- ESM (`import`, not `require`)

The version floor comes from Node's built-in TypeScript type stripping, enabled by
default since Node 22.18, which lets the test runner execute `.ts` sources directly
(see [Development](#development)).

## Install

```bash
npm install iterama
```

Plain ESM with TypeScript declarations included.

## Usage

```ts
import { concat, map, take } from 'iterama'

const result = [...take(3)(map((x: number) => x * 2)(concat([1, 2, 3], [4, 5, 6])))]

// [2, 4, 6]
```

Because every step is lazy, pipelines work on infinite sources too — `take(3)`
stops the source long before it could finish:

```ts
import { map, take } from 'iterama'

function* naturals(): Generator<number> {
  for (let i = 0; ; i++) yield i
}

const result = [...take(3)(map((x: number) => x * 2)(naturals()))]

// [0, 2, 4]
```

## How it differs

Modern engines ship native Iterator Helpers (`Iterator.prototype.map`, `.filter`,
`.take`, `.drop`, `.reduce`, …), and libraries like IxJS cover similar ground.
Iterama differs in a few concrete ways:

- **Any `Iterable` in, any `Iterable` out** — arrays, sets, maps, generators, or your
  own objects with `Symbol.iterator`. Native helpers only accept `Iterator` objects,
  so you call `.values()` first.
- **Curried transformers** — every operator has the shape
  `(options) => (iterable) => iterable`, so a partially applied operator is a plain
  reusable value: `const first3 = take(3)` works on any source you pass it.
- **Small, dependency-free surface** — no runtime dependencies, pure ESM with
  bundled type declarations, and `sideEffects: false` for tree shaking.

## Laziness and memory

Most operators are lazy: nothing runs until the result iterable is pulled, and
pulling only advances as far as you ask. That is what makes the infinite example
above terminate. A few operations necessarily give that up:

- **Buffered** — `take(-n)`, `skip(-n)` and any negative `slice` bound keep the
  last `n` values in a ring buffer and must walk the source to its end.
  `take(-n)` buffers before it can emit anything.
- **Stateful** — `unique` holds a `Set` of every value it has seen, so memory
  grows with the number of distinct values; `scan` and `scanEx` hold a single
  accumulator while emitting lazily.
- **Eager** — `reduce` and `reduceEx` consume the whole source before yielding
  their single result; `length` consumes up to `maxLength` values and returns a
  number; `resolve` drives the iterator to completion.

Everything else — `map`, `mapEx`, `filter`, `filterEx`, `concat`, `startWith`,
`range`, `iterate`, `distinct`, `zip` and non-negative `take`/`skip`/`slice` —
runs in constant memory, one value at a time.

## API

| Group       | Functions                                                                                                                                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create      | [`concat`](#concat), [`range`](#range), [`startWith`](#startwith)                                                                                                                       |
| Transform   | [`map`](#map), [`mapEx`](#mapex), [`filter`](#filter), [`filterEx`](#filterex)                                                                                                          |
| Limit       | [`take`](#take), [`skip`](#skip), [`slice`](#slice)                                                                                                                                     |
| Aggregate   | [`reduce`](#reduce), [`reduceEx`](#reduceex), [`scan`](#scan), [`scanEx`](#scanex)                                                                                                      |
| Deduplicate | [`distinct`](#distinct), [`unique`](#unique)                                                                                                                                           |
| Combine     | [`zip`](#zip)                                                                                                                                                                          |
| Utility     | [`iterate`](#iterate), [`length`](#length), [`resolve`](#resolve)                                                                                                                      |

### `concat`

`<T> (...iterables: Iterable<T>[]) => Iterable<T>`

Lazily concatenates the given iterables.

```ts
import { concat } from 'iterama'

const data0 = [1, 2, 3]
const data1 = [4, 5, 6]

const result = [...concat(data0, data1)]

// [1, 2, 3, 4, 5, 6]
```

### `distinct`

`<T> (iterable: Iterable<T>) => Iterable<T>`

Drops consecutive duplicates. Values are compared with SameValueZero, so `NaN`
counts as a duplicate of itself.

```ts
import { distinct } from 'iterama'

const result = [...distinct([1, 1, 3, 3, 4, 3])]

// [1, 3, 4, 3]
```

### `filter`

`<T> (predicate: (value: T) => boolean) => (iterable: Iterable<T>) => Iterable<T>`

Keeps the values that satisfy the predicate.

```ts
import { filter } from 'iterama'

const isEven = (x: number) => x % 2 === 0

const result = [...filter(isEven)([1, 2, 3, 4])]

// [2, 4]
```

### `filterEx`

`<T> (predicate: (value: T, index: number, iterable: Iterable<T>) => boolean) => (iterable: Iterable<T>) => Iterable<T>`

Like `filter`, but the predicate also receives the index and the source iterable.

```ts
import { filterEx } from 'iterama'

const isEvenIndex = (_value: string, i: number) => i % 2 === 0

const result = [...filterEx(isEvenIndex)(['a', 'b', 'c', 'd'])]

// ['a', 'c']
```

### `iterate`

`<T> (iterable: Iterable<T>) => Generator<T>`

Wraps any iterable into a plain generator.

```ts
import { iterate } from 'iterama'

const result = [...iterate([1, 2, 3, 4, 5])]

// [1, 2, 3, 4, 5]
```

### `length`

`(maxLength: number) => <T> (iterable: Iterable<T>) => number`

Counts the values of an iterable, stopping after `maxLength` — safe to use on
infinite sources. A negative `maxLength` returns `0`.

```ts
import { length } from 'iterama'

// stops after 3 values
const result = length(3)([1, 2, 3, 4, 5])

// 3
```

### `map`

`<T, R> (transform: (value: T) => R) => (iterable: Iterable<T>) => Iterable<R>`

Applies `transform` to every value, lazily.

```ts
import { map } from 'iterama'

const mult2 = (x: number) => x * 2

const result = [...map(mult2)([1, 2, 3, 4])]

// [2, 4, 6, 8]
```

### `mapEx`

`<T, R> (transform: (value: T, index: number, iterable: Iterable<T>) => R) => (iterable: Iterable<T>) => Iterable<R>`

Like `map`, but the transform also receives the index and the source iterable.

```ts
import { mapEx } from 'iterama'

const addIndex = (x: number, i: number) => x + i

const result = [...mapEx(addIndex)([1, 2, 3, 4])]

// [1, 3, 5, 7]
```

### `range`

`(length: number) => Iterable<number>`

Yields `0` through `length - 1`.

```ts
import { range } from 'iterama'

const result = [...range(4)]

// [0, 1, 2, 3]
```

### `reduce`

`<T, R> (reducer: (accumulator?: R, value?: T) => R) => (iterable: Iterable<T>) => Iterable<R>`

Folds an iterable into a single value and yields it once. The reducer is called
without arguments to create the initial state, then once per value.

```ts
import { reduce } from 'iterama'

// redux-like reducer
const reducer = (state = 0, value = 0) => state + value

const result = [...reduce(reducer)([1, 2, 3, 4])]

// [10]
```

### `reduceEx`

`<T, R> (reducer: (accumulator: R, value: T, index: number, iterable: Iterable<T>) => R, initial: R) => (iterable: Iterable<T>) => Iterable<R>`

Like `reduce`, but the initial state is passed explicitly and the reducer also
receives the index and the source iterable.

```ts
import { reduceEx } from 'iterama'

// Array.prototype.reduce-like reducer
const reducer = (acc: number, value: number) => acc + value

const result = [...reduceEx(reducer, 0)([1, 2, 3, 4])]

// [10]
```

### `resolve`

`<T> (iterator: Iterator<T | Promise<T>>) => Promise<void>`

Drives a synchronous generator whose yields are promises, awaiting every
yielded value and passing it back into the iterator. The generator's return
value is discarded — `resolve` resolves to `void` — so surface results with
side effects inside the generator.

```ts
import { resolve } from 'iterama'

const seen: number[] = []

function* source(): Generator<Promise<number>, void, number> {
  const a = yield Promise.resolve(1)
  const b = yield Promise.resolve(a + 1)
  seen.push(a, b)
}

await resolve(source())

// seen: [1, 2]
```

### `scan`

`<T, R> (reducer: (accumulator?: R, value?: T) => R) => (iterable: Iterable<T>) => Iterable<R>`

Emits the accumulator after every value. The reducer is called without
arguments to create the seed state.

```ts
import { scan } from 'iterama'

// redux-like reducer
const reducer = (state = 0, value = 0) => state + value

const result = [...scan(reducer)([1, 2, 3, 4])]

// [1, 3, 6, 10]
```

### `scanEx`

`<T, R> (reducer: (accumulator: R, value: T, index: number, iterable: Iterable<T>) => R, initial: R) => (iterable: Iterable<T>) => Iterable<R>`

Like `scan`, but the initial state is passed explicitly and the reducer also
receives the index and the source iterable.

```ts
import { scanEx } from 'iterama'

const reducer = (acc: number, value: number) => acc + value

const result = [...scanEx(reducer, 0)([1, 2, 3, 4])]

// [1, 3, 6, 10]
```

### `skip`

`(count: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

A negative `count` skips the last `|count|` values. A fractional `count` is truncated, like
`Array.prototype.slice`; `NaN` behaves like `0` and `-Infinity` skips everything.

```ts
import { skip } from 'iterama'

// skip the first 2 values
const result0 = [...skip(2)([1, 2, 3, 4, 5, 6])]
// [3, 4, 5, 6]

// skip the last 2 values
const result1 = [...skip(-2)([1, 2, 3, 4, 5, 6])]
// [1, 2, 3, 4]
```

### `slice`

`(from?: number, to?: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

Negative bounds are counted from the end of the iterable.

```ts
import { slice } from 'iterama'

// skip 1, take 2
const result0 = [...slice(1, 2)([1, 2, 3, 4, 5])]
// [2, 3]

// skip until 2 from the end, take 1
const result1 = [...slice(-2, 1)([1, 2, 3, 4, 5])]
// [4]

// don't skip, drop the last 2
const result2 = [...slice(0, -2)([1, 2, 3, 4, 5])]
// [1, 2, 3]

// skip 2, take the rest
const result3 = [...slice(2)([1, 2, 3, 4, 5])]
// [3, 4, 5]

// skip until 2 from the end, take the rest
const result4 = [...slice(-2)([1, 2, 3, 4, 5])]
// [4, 5]

// don't skip, take all
const result5 = [...slice()([1, 2, 3, 4, 5])]
// [1, 2, 3, 4, 5]
```

### `startWith`

`<T> (value: T) => (iterable: Iterable<T>) => Iterable<T>`

Prepends `value` to an iterable.

```ts
import { startWith } from 'iterama'

const result = [...startWith(0)([1, 2, 3])]
// [0, 1, 2, 3]
```

### `take`

`(count: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

A negative `count` takes the last `|count|` values. A fractional `count` is truncated, like
`Array.prototype.slice`; `NaN` behaves like `0` and `-Infinity` takes the whole iterable.

```ts
import { take } from 'iterama'

// take the first 2 values
const result0 = [...take(2)([1, 2, 3, 4, 5])]
// [1, 2]

// take the last 2 values
const result1 = [...take(-2)([1, 2, 3, 4, 5])]
// [4, 5]
```

### `unique`

`<T> (iterable: Iterable<T>) => Iterable<T>`

Drops all duplicates, keeping the first occurrence of every value. Membership is
checked with SameValueZero (via `Set`), so `NaN` counts as a duplicate of itself.

```ts
import { unique } from 'iterama'

const result = [...unique([1, 1, 3, 4, 3])]
// [1, 3, 4]
```

### `zip`

```ts
<A, B> (it0: Iterable<A>, it1: Iterable<B>): Iterable<[A, B]>
<A, B, C> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>): Iterable<[A, B, C]>
<A, B, C, D> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>, it3: Iterable<D>): Iterable<[A, B, C, D]>
```

Zips iterables together, stopping at the shortest one. With no arguments the
result is empty.

```ts
import { zip } from 'iterama'

const result = [...zip([1, 2, 3, 4, 5, 6], ['a', 'b', 'c', 'd'])]
// [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]
```

## Exported types

| Type                | Signature                                                                       |
| ------------------- | ------------------------------------------------------------------------------- |
| `IterableTransformer` | `<T> (iterable: Iterable<T>) => Iterable<T>`                                   |
| `PredicateFn<T>`    | `<T> (value: T) => boolean`                                                     |
| `PredicateExFn<T>`  | `<T> (value: T, index: number, iterable: Iterable<T>) => boolean`               |
| `TransformFn<T, R>` | `<T, R> (value: T) => R`                                                        |
| `TransformExFn<T, R>` | `<T, R> (value: T, index: number, iterable: Iterable<T>) => R`                |
| `ReducerFn<T, R>`   | `<T, R> (accumulator?: R, value?: T) => R`                                      |
| `ReducerExFn<T, R>` | `<T, R> (accumulator: R, value: T, index: number, iterable: Iterable<T>) => R`  |

## Development

| Script              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `npm test`          | Runs the test suite with the built-in Node.js test runner |
| `npm run typecheck` | Type-checks sources and tests with TypeScript             |
| `npm run lint`      | Lints with oxlint                                         |
| `npm run lint:fix`  | Lints and auto-fixes what can be fixed automatically      |
| `npm run format`    | Formats with oxfmt                                        |
| `npm run format:check` | Checks formatting without writing                      |
| `npm run build`     | Emits ESM and type declarations to `dist`                 |

Run a single test file directly:

```bash
node --test test/take.spec.ts
```

Source files are executed directly by Node.js through its built-in TypeScript
type stripping, so there is no build step or transform in the test loop.

## License

MIT
