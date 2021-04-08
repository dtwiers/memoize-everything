export const memoizeMap = <Params extends any[], Output>(fn: (...params: Params) => Output) => {
  const previousResults: Map<Params, Output> = new Map();
  return (...params: Params) => {
    if (!previousResults.has(params)) {
      previousResults.set(params, fn(...params));
    }
    return previousResults.get(params);
  };
};
