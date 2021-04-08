export type MemoizeExpireConfig = {
  expirationInSeconds: number;
};

export const memoizeExpire = <Params extends any[], Output>(
  config: MemoizeExpireConfig
) => (fn: (...params: Params) => Output) => {
  const previousResults: Map<Params, [Date, Output]> = new Map();
  const addNew = (key: Params, value: Output) => {
    const currentDate = new Date();
    const toExpire = new Date(
      currentDate.getTime() + 1000 * config.expirationInSeconds
    );
    previousResults.set(key, [toExpire, value]);
    previousResults.forEach(([date], key) => {
      if (date < currentDate) {
        previousResults.delete(key);
      }
    });
    return (...params: Params) => {
      if (!previousResults.has(params)) {
        addNew(params, fn(...params));
      }
      return previousResults.get(params)[1];
    };
  };
};
