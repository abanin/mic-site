import { useReducer } from "react";

type Action<T> = Partial<T> | ((state: T) => Partial<T> | null);

type Reducer<T> = (state: T, partialState: Partial<T>) => T;

type EqualityFn = <T>(a: T, b: T) => boolean;

type Options = {
  equalityFn?: EqualityFn;
  reducer?: typeof defaultReducer;
};

const defaultEqualityFn: EqualityFn = (a, b) => a === b;

const defaultReducer = <T>(
  state: T,
  update: Action<T>,
  equalityFn?: EqualityFn | null
) => {
  const changes = typeof update === "function" ? update(state) : update;
  const newState = {
    ...state,
    ...changes,
  };

  if (changes === null || equalityFn?.(state, changes)) return state;

  return newState;
};

const useReducerAsState = <S extends Record<string, unknown>>(
  initial: (() => S) | S,
  options: Options = {}
) => {
  const { equalityFn = defaultEqualityFn, reducer = defaultReducer } = options;

  return useReducer<Reducer<S>>(
    (state, partialState) => reducer(state, partialState, equalityFn),
    typeof initial === "function" ? initial() : initial
  );
};

export default useReducerAsState;
