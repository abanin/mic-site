import { useState } from "react";
import cn from "classnames";

import Tab from "./Tab";
import { TabsProps } from "./types";

import styles from "./styles.module.scss";

const Tabs = <Value extends unknown>({
  children,
  keyAccessor,
  valueFormatter,
  activeTab: activeTabProp,
  tabs,
  onClick,
  className,
  defaultActiveTab,
}: TabsProps<Value>) => {
  const [activeTabState, setActiveTabState] = useState<Value | null>(
    defaultActiveTab ?? null
  );
  const activeTab = activeTabProp ?? activeTabState;

  return (
    <div className={cn(styles.tabs, className)}>
      {children}
      {tabs?.map((tab) => {
        const key = keyAccessor?.(tab);
        const value = valueFormatter ? valueFormatter(tab) : null;
        return (
          <Tab
            active={
              activeTab && keyAccessor
                ? keyAccessor?.(activeTab) === key
                : false
            }
            key={key}
            onClick={() => {
              setActiveTabState(tab);
              onClick?.(tab);
            }}
          >
            {value}
          </Tab>
        );
      })}
    </div>
  );
};

export default Tabs;
