import cn from "classnames";

import { TabProps } from "./types";

import styles from "./styles.module.scss";

const Tab = <Value extends unknown>({
  className,
  style,
  children,
  active,
  onClick,
}: TabProps<Value>) => {
  const cls = cn(styles.tab, className);

  return (
    <div style={style} onClick={() => onClick?.()} className={cn(cls, active && styles.active)}>
      {children}
    </div>
  );
};

export default Tab;
