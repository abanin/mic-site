import React, { CSSProperties, FC, ReactNode } from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
  src: string;
  label?: ReactNode;
  ticker?: ReactNode;
};

const Asset: FC<Props> = ({ children, className, src, label, ticker }) => {
  return (
    <div className={cn(styles.asset, className)}>
      <div className={styles.image}>
        <img src={src} alt="asset" />
      </div>
      {children ? (
        children
      ) : label || ticker ? (
        <div className={styles.content}>
          {typeof label === "string" ? <div className={styles.label}>{label}</div> : label}
          {typeof ticker === "string" ? <div className={styles.ticker}>{ticker}</div> : ticker}
        </div>
      ) : null}
    </div>
  );
};

export default Asset;
