import { ReactNode } from "react";

import {
  RenderMultiSelectControl,
  RenderMultiSelectDropdown,
  RenderSelectControl,
  RenderSelectDropdown,
} from "./renderFunctions";

// Select and MultiSelect
export type CommonSelectProps<Value> = {
  disabled?: boolean;
  className?: string;
  label?: ReactNode;
  options: Value[];
  portal?: boolean;
  shouldCloseOnOutsideClick?: boolean;
  keyAccessor: (option: Value) => string | number;
  onClose?: () => void;
};

export type SelectProps<Value> = {
  selectedOption?: Value;
  defaultOption?: Value;

  onChange: (option: Value) => void;

  renderDropdown?: RenderSelectDropdown<Value>;
  renderControl?: RenderSelectControl<Value>;
  valueFormatter: (option: Value) => ReactNode;
  optionFormatter?: (option: Value) => ReactNode;
} & CommonSelectProps<Value>;

export type MultiSelectProps<Value> = {
  selectedOptions?: Value[];
  defaultOptions?: Value[];

  onChange: (options: Value[]) => void;

  renderDropdown?: RenderMultiSelectDropdown<Value>;
  renderControl?: RenderMultiSelectControl<Value>;
  onReset?: () => void;

  valueFormatter: (option: Value[]) => ReactNode;
  optionFormatter: (option: Value) => ReactNode;
} & CommonSelectProps<Value>;
