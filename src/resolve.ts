const resolve = <T> (iterator: Iterator<T>): Promise<void> => {
  const handle = async (ir: IteratorResult<T>): Promise<void> => {
    ir.done ? void 0 : handle(iterator.next(await ir.value))
  }

  return handle(iterator.next())
}

export default resolve
