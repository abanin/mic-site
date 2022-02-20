import { ReactNode } from "react";

export type Change<Value> = ({
  selectedOptions,
  valid,
}: {
  selectedOptions: Value[];
  valid: boolean | null;
}) => void;

export type ControlProps<Value> = {
  value?: Value;
  opened?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  formatter: (option: Value) => ReactNode;
  onClick?: () => void;
};
