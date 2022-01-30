import { CSSProperties, ReactNode } from "react";

export type TabProps<Value> = {
  className?: string;
  style?: CSSProperties;
  value?: Value;
  onClick?: () => void;
  active?: boolean;
  children: ReactNode;
};

type TabsAddProps<Value> =
  | {
      children?: never;
      tabs: Value[];
      keyAccessor: (option: Value) => string | number;
      valueFormatter: (option: Value) => ReactNode;
      activeTab?: Value;
    }
  | {
      children: ReactNode;
      tabs?: never;
      keyAccessor?: never;
      valueFormatter?: never;
      activeTab?: never;
    };

export type TabsProps<Value> = TabsAddProps<Value> & {
  className?: string;
  onClick?: (value: Value) => void;
};
