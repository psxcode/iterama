const resolve = <T> (iterator: Iterator<T>) => {
  const handle = async (ir: IteratorResult<T>): Promise<void> => {
    return ir.done ? void 0 : handle(iterator.next(await ir.value))
  }
  return handle(iterator.next())
}

export default resolve
