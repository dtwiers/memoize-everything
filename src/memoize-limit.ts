export type MemoizeLimitConfig = {
  limit?: number;
};

export const memoizeLimit = <Params extends any[], Output>(
  config: MemoizeLimitConfig
) => (fn: (...params: Params) => Output) => {
  const previousResults: Map<Params, Output> = new Map();
  const addNew = (key: Params, value: Output) => {
    previousResults.set(key, value);
    if (
      config &&
      config.limit !== undefined &&
      previousResults.keys.length >= config.limit
    ) {
      previousResults.delete(previousResults.keys()[0]);
    }
  };
  return (...params: Params) => {
    if (!previousResults.has(params)) {
      addNew(params, fn(...params));
    }
    return previousResults.get(params);
  };
};
