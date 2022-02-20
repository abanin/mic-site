import { useReducer } from "react";

import removeAllUndefinedValues from "../../helpers/removeAllUndefinedValues";
import * as T from "./types";

type State<Value extends unknown = string | number> = {
  stateSelectedOptions: Value[];
  valid: boolean | null;
};

type Params<Value extends unknown = string | number> = {
  multi?: boolean;

  selectedOptions?: Value[];
  defaultSelectedOptions?: Value[];

  options: Value[];

  keyAccessor: (option: Value) => string | number;

  disabled?: boolean;
  rules?: ((options: Value[]) => boolean)[];

  onChange: T.Change<Value>;
  onReset?: () => void;
};

const useSelect = <Value>(params: Params<Value>) => {
  const isControlled =
    removeAllUndefinedValues(params).selectedOptions !== undefined;
  const {
    multi,
    defaultSelectedOptions = [],
    disabled = false,
    rules,
    onChange,
    onReset,
    keyAccessor,
  } = params;

  const [state, setState] = useReducer(
    (state: State<Value>, changes: Partial<State<Value>>) => {
      return { ...state, ...changes };
    },
    {
      stateSelectedOptions: defaultSelectedOptions,
      valid: null,
    }
  );

  const selectedOptions = getSelectedOptions<Value>({
    isControlled,
    multi: Boolean(multi),
    selectedOptions: params.selectedOptions,
    stateSelectedOptions: state.stateSelectedOptions,
    options: params.options,
  });

  const validate = (options: Value[]) => {
    if (!rules) return null;

    const valid =
      rules.length < 1 ? null : rules.every((rule) => rule(options));
    return valid;
  };

  const setOptions = (options: Value[]) => {
    const valid = validate(options);

    !isControlled &&
      setState({
        stateSelectedOptions: options,
        valid: valid,
      });

    onChange({ selectedOptions: options, valid });
  };

  const change = (option: Value) => {
    if (disabled) return;

    if (!multi) {
      setOptions([option]);
      return;
    }

    const isSelected = selectedOptions.find(
      (opt) => keyAccessor(opt) === keyAccessor(option)
    );

    const newSelectedOptions = isSelected
      ? selectedOptions.filter(
          (opt) => keyAccessor(opt) !== keyAccessor(option)
        )
      : [...selectedOptions, option];

    setOptions(newSelectedOptions);
  };

  const selectAll = (options: Value[]) => {
    if (!multi) return;
    setOptions(options);
  };

  const reset = () => {
    !isControlled &&
      setState({
        stateSelectedOptions: [],
        valid: null,
      });

    onReset && onReset();
  };

  return {
    selectAll,
    onChange: change,
    onReset: onReset ? reset : undefined,
    selectedOptions,
    valid: state.valid,
  };
};

export default useSelect;

type GetSelectedOptionsParams<Value> = {
  isControlled: boolean;
  multi: boolean;
  selectedOptions: Value[] | undefined;
  stateSelectedOptions: Value[];
  options: Value[];
};
function getSelectedOptions<Value>({
  isControlled,
  multi,
  selectedOptions,
  stateSelectedOptions,
  options,
}: GetSelectedOptionsParams<Value>) {
  if (isControlled) {
    if (multi) return selectedOptions ?? [];
    return selectedOptions ?? [options[0]];
  }

  if (multi) return stateSelectedOptions;

  return stateSelectedOptions.length > 0 ? stateSelectedOptions : [options[0]];
}
