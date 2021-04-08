export const memoizeCache = <Params extends any[], Output>(fn: (...params: Params) => Output) => {
  const previousResults: WeakMap<Params, Output> = new WeakMap();
  return (...params: Params) => {
    if (!previousResults.has(params)) {
      previousResults.set(params, fn(...params));
    }
    return previousResults.get(params);
  };
};
