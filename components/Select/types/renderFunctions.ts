import { ReactNode } from "react";

//BEGIN renderDropdown
type CommonRenderDropdownParams<Value> = {
  disabled?: boolean;
  options: Value[];
  valid: boolean | null;
  portal?: boolean;
  className?: string;
  opened?: boolean;
  keyAccessor: (option: Value) => string | number;
  optionFormatter: (option: Value) => ReactNode;
};

export type RenderSelectDropdownParams<Value> = {
  selectedOption: Value;
  onChange: (option: Value) => void;
} & CommonRenderDropdownParams<Value>;

export type RenderMultiSelectDropdownParams<Value> = {
  selectedOptions: Value[];
  onChange: (options: Value) => void;
  onReset?: () => void;
  selectAll: (options: Value[]) => void;
} & CommonRenderDropdownParams<Value>;

export type RenderSelectDropdown<Value> = (
  params: RenderSelectDropdownParams<Value>
) => ReactNode;

export type RenderMultiSelectDropdown<Value> = (
  params: RenderMultiSelectDropdownParams<Value>
) => ReactNode;
//END renderDropdown

//BEGIN renderControl
type RenderCommonControlParams = {
  opened?: boolean;
  disabled?: boolean;
  valid: boolean | null;
  label: ReactNode;
  onClick: () => void;
};

export type RenderSelectControlParams<Value> = {
  selectedOption: Value;
  valueFormatter: (option: Value) => ReactNode;
} & RenderCommonControlParams;

export type RenderMultiSelectControlParams<Value> = {
  selectedOptions: Value[];
  valueFormatter: (option: Value[]) => ReactNode;
} & RenderCommonControlParams;

export type RenderSelectControl<Value> = (
  params: RenderSelectControlParams<Value>
) => React.ReactNode;
export type RenderMultiSelectControl<Value> = (
  params: RenderMultiSelectControlParams<Value>
) => React.ReactNode;
// END renderControl
