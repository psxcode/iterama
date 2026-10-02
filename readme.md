# Iterama

Composable functional `Iterable<T>` helpers. Every helper is lazy, works with arrays, sets,
generators and any other iterable, and has no runtime dependencies.

## Requirements

- Node.js `>= 22.18`
- ESM (`import`, not `require`)

## Install

```
npm install iterama
```

## Usage

```ts
import { concat, map, take } from 'iterama'

const result = [...take(3)(map((x: number) => x * 2)(concat([1, 2, 3], [4, 5, 6])))]

// [2, 4, 6]
```

## API

### `concat`

`<T> (...iterables: Iterable<T>[]) => Iterable<T>`

```ts
import { concat } from 'iterama'

const data0 = [1, 2, 3]
const data1 = [4, 5, 6]

const result = [...concat(data0, data1)]

// [1, 2, 3, 4, 5, 6]
```

### `distinct`

`<T> (iterable: Iterable<T>) => Iterable<T>`

Drops consecutive duplicates.

```ts
import { distinct } from 'iterama'

const result = [...distinct([1, 1, 3, 3, 4, 3])]

// [1, 3, 4, 3]
```

### `filter`

`<T> (predicate: (value: T) => boolean) => (iterable: Iterable<T>) => Iterable<T>`

```ts
import { filter } from 'iterama'

const isEven = (x: number) => x % 2 === 0

const result = [...filter(isEven)([1, 2, 3, 4])]

// [2, 4]
```

### `filterEx`

`<T> (predicate: (value: T, index: number, iterable: Iterable<T>) => boolean) => (iterable: Iterable<T>) => Iterable<T>`

```ts
import { filterEx } from 'iterama'

const skipEverySecond = (x: string, i: number) => i % 2 !== 0

const result = [...filterEx(skipEverySecond)(['a', 'b', 'c', 'd'])]

// ['a', 'c']
```

### `iterate`

`<T> (iterable: Iterable<T>) => Generator<T>`

```ts
import { iterate } from 'iterama'

const result = [...iterate([1, 2, 3, 4, 5])]

// [1, 2, 3, 4, 5]
```

### `length`

`(maxLength: number) => <T> (iterable: Iterable<T>) => number`

Counts the values of an iterable, stopping after `maxLength`.

```ts
import { length } from 'iterama'

const result = length(Number.MAX_SAFE_INTEGER)([1, 2, 3, 4, 5])

// 5
```

### `map`

`<T, R> (transform: (value: T) => R) => (iterable: Iterable<T>) => Iterable<R>`

```ts
import { map } from 'iterama'

const mult2 = (x: number) => x * 2

const result = [...map(mult2)([1, 2, 3, 4])]

// [2, 4, 6, 8]
```

### `mapEx`

`<T, R> (transform: (value: T, index: number, iterable: Iterable<T>) => R) => (iterable: Iterable<T>) => Iterable<R>`

```ts
import { mapEx } from 'iterama'

const addIndex = (x: number, i: number) => x + i

const result = [...mapEx(addIndex)([1, 2, 3, 4])]

// [1, 3, 5, 7]
```

### `range`

`(length: number) => Iterable<number>`

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
yielded value and passing it back into the iterator.

```ts
import { resolve } from 'iterama'

function* source() {
  const a = yield Promise.resolve(1)
  const b = yield Promise.resolve(a + 1)
  return b
}

await resolve(source())
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

```ts
import { scanEx } from 'iterama'

const reducer = (acc: number, value: number) => acc + value

const result = [...scanEx(reducer, 0)([1, 2, 3, 4])]

// [1, 3, 6, 10]
```

### `skip`

`(count: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

A negative `count` skips the last `|count|` values.

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

`(from: number, to: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

Negative bounds are counted from the end of the iterable.

```ts
import { slice } from 'iterama'

// skip 1, take 2
const r0 = [...slice(1, 2)([1, 2, 3, 4, 5])]
// [2, 3]

// skip until 2 from the end, take 1
const r1 = [...slice(-2, 1)([1, 2, 3, 4, 5])]
// [4]

// don't skip, drop the last 2
const r2 = [...slice(0, -2)([1, 2, 3, 4, 5])]
// [1, 2, 3]

// skip 2, take the rest
const r3 = [...slice(2)([1, 2, 3, 4, 5])]
// [3, 4, 5]

// skip until 2 from the end, take the rest
const r4 = [...slice(-2)([1, 2, 3, 4, 5])]
// [4, 5]

// don't skip, take all
const r5 = [...slice()([1, 2, 3, 4, 5])]
// [1, 2, 3, 4, 5]
```

### `startWith`

`<T> (value: T) => (iterable: Iterable<T>) => Iterable<T>`

```ts
import { startWith } from 'iterama'

const r = [...startWith(0)([1, 2, 3])]
// [0, 1, 2, 3]
```

### `take`

`(count: number) => <T> (iterable: Iterable<T>) => Iterable<T>`

A negative `count` takes the last `|count|` values.

```ts
import { take } from 'iterama'

// take the first 2 values
const r0 = [...take(2)([1, 2, 3, 4, 5])]
// [1, 2]

// take the last 2 values
const r1 = [...take(-2)([1, 2, 3, 4, 5])]
// [4, 5]
```

### `unique`

`<T> (iterable: Iterable<T>) => Iterable<T>`

Drops all duplicates, keeping the first occurrence of every value.

```ts
import { unique } from 'iterama'

const r = [...unique([1, 1, 3, 4, 3])]
// [1, 3, 4]
```

### `zip`

```ts
<A, B> (it0: Iterable<A>, it1: Iterable<B>): Iterable<[A, B]>
<A, B, C> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>): Iterable<[A, B, C]>
<A, B, C, D> (it0: Iterable<A>, it1: Iterable<B>, it2: Iterable<C>, it3: Iterable<D>): Iterable<[A, B, C, D]>
```

Zips iterables together, stopping at the shortest one.

```ts
import { zip } from 'iterama'

const r = [...zip([1, 2, 3, 4, 5, 6], ['a', 'b', 'c', 'd'])]
// [[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]
```

## Development

| Script              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `npm test`          | Runs the test suite with the built-in Node.js test runner |
| `npm run typecheck` | Type-checks sources and tests with TypeScript             |
| `npm run lint`      | Lints with oxlint                                         |
| `npm run format`    | Formats with oxfmt                                        |
| `npm run build`     | Emits ESM and type declarations to `dist`                 |

Source files are executed directly by Node.js through its built-in TypeScript
type stripping, so there is no build step or transform in the test loop.

## License

MIT
