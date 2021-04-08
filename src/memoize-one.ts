import { shallowEquality } from "./helpers";
import { ParameterEqualityFunction } from "./types";

export type MemoizeOneConfig<Params extends any[]> = {
  eqFn: ParameterEqualityFunction<Params>;
};

export const memoizeOne = <Params extends any[], Output>(
  config?: MemoizeOneConfig<Params>
) => (fn: (...params: Params) => Output) => {
  let firstCall = true;
  let previousParams: Params;
  let previousResult: Output;
  const eqFn = config?.eqFn || shallowEquality;
  return (...params: Params) => {
    if (firstCall || !eqFn(previousParams, params)) {
      firstCall = false;
      previousParams = params;
      previousResult = fn(...params);
    }
    return previousResult;
  };
};
