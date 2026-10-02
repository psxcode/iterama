import type { Mock } from 'node:test'

/** Argument list of every recorded call, in call order. */
export const callsOf = <F extends (...args: never[]) => unknown>(spy: Mock<F>): unknown[][] =>
  spy.mock.calls.map((call) => [...call.arguments])
